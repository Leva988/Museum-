using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Belorusneft.Museum.Web.Spa.Infrastructure.Repositories;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Belorusneft.Museum.Web.Spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /* [Authorize] */
    public class AchievementsController : ControllerBase
    {
        private readonly IRepository _repository;

        public AchievementsController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all Achievements
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Achievement>>> Get() {            
            var achs = await _repository.GetAchievementsAsync();
            foreach (Achievement ach in achs) {
                var category = await _repository.GetAchievementCategoryAsync(ach.CategoryId);
                ach.Category = category.Name;
            }
            return Ok(achs);
        }

        //Get api/Achievements
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Achievement>> GetById(string id)
        {
            var item = await _repository.GetAchievementAsync(id);
            var category = await _repository.GetAchievementCategoryAsync(item.CategoryId);
            item.Category = category.Name;
            return Ok(item);
        }

        // POST api/Achievement
        [HttpPost]
        public async Task<ActionResult<Achievement>> Post([FromBody] AchievementNew achievementNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var achievement = MapAchievement(achievementNew);
            await _repository.InsertAchievementAsync(achievement);

            return CreatedAtAction(nameof(GetById), new { id = achievement.Id }, new { id = achievement.Id });
        }

        // Put api/Achievement
        [HttpPut("{id}")]
        public async Task<ActionResult<Achievement>> Put(string id, [FromBody] AchievementNew achievementNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var achievement = MapAchievement(achievementNew);
            achievement.Id = id;
            await _repository.CreateOrUpdateAchievementAsync(achievement);

            return Ok();
        }

        // DELETE api/Achievement
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteAchievementAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET photo
        [HttpGet("{id}/Image")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPhoto(string id)
        {
            var item = await _repository.GetAchievementImageAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post photo
        [HttpPost("{id}/Image")]
        public async Task<ActionResult> PostPhoto(string id,[FromForm(Name = "avatar")] IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var Oid = await _repository.AddAchievementImageAsync(input, id, image.ContentType);
            if (Oid == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetPhoto), new { id = Oid, }, new { id = Oid, });
        }

        //Delete photo
        [HttpDelete("{id}/Image")]
        public async Task<ActionResult> DeletePhoto(string id)
        {

            await _repository.DeleteAchievementImageAsync(id);
            return Ok();
        }

        private Achievement MapAchievement(AchievementNew achievementNew) =>
            new Achievement
            {
                Name = achievementNew.Name,
                Year = achievementNew.Year,
                CategoryId = achievementNew.CategoryId
            };

    }
}
