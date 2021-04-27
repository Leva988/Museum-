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
    /* [Authorize]*/
    public class AchievementCategoriesController : ControllerBase
    {
        private readonly IRepository _repository;

        public AchievementCategoriesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all AchievementCategory
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AchievementCategory>>> Get() {
            var categories =  await _repository.GetAchievementCategoriesAsync();
            foreach (AchievementCategory cat in categories) {
                var achs = await _repository.GetAchievementsByCategory(cat.Id);
                cat.Achievements = achs;
            }
            return Ok(categories);
        }           

        //Get api/AchievementCategory
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Achievement>> GetById(string id)
        {
            var cat = await _repository.GetAchievementCategoryAsync(id);
            var achs = await _repository.GetAchievementsByCategory(cat.Id);
            cat.Achievements = achs;
            return Ok(cat);
        }

        // POST api/AchievementCategory
        [HttpPost]
        public async Task<ActionResult<AchievementCategory>> Post([FromBody] AchievementCategoryNew catNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var cat = MapCategory(catNew);
            await _repository.InsertAchievementCategoryAsync(cat);

            return CreatedAtAction(nameof(GetById), new { id = cat.Id }, new { id = cat.Id });
        }

        // Put api/AchievementCategory
        [HttpPut("{id}")]
        public async Task<ActionResult<Achievement>> Put(string id, [FromBody] AchievementCategoryNew catNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var cat = MapCategory(catNew);
            cat.Id = id;
            await _repository.CreateOrUpdateAchievementCategoryAsync(cat);

            return Ok();
        }

        // DELETE api/AchievementCategory
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteAchievementCategoryAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private AchievementCategory MapCategory(AchievementCategoryNew catNew) =>
            new AchievementCategory
            {
                Name = catNew.Name,
                Index = catNew.Index
            };

    }
}
