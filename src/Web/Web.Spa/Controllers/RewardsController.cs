using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Belorusneft.Museum.Web.Spa.Infrastructure.Repositories;
using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Belorusneft.Museum.Web.Spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     /*[Authorize] */
    public class RewardsController : ControllerBase
    {
        private readonly IRepository _repository;
        public RewardsController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        //Get api/all rewards
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllRewards()
        {
            var item = await _repository.GetAllRewardsAsync();
            var awards = item.ToArray();
            foreach (Reward award in awards)
            {
                var emps = await _repository.GetRewardedEmployeesByRewardAsync(award.Id);
                if(emps.Count() != 0) {
                    award.RewardedEmployees = emps;
                }
                
            }
            return Ok(awards);
        }

        //Get api/reward id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var award = await _repository.GetRewardAsync(id);
            var emps = await _repository.GetRewardedEmployeesByRewardAsync(award.Id);
                if(emps.Count() != 0) {
                    award.RewardedEmployees = emps;
                }
            return Ok(award);
        }

        // POST api/reward
        [HttpPost]
        public async Task<IActionResult> CreateorUpdateReward([FromBody] RewardNew awardNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var award = MapReward(awardNew);
            await _repository.AddRewardAsync(award);
            return CreatedAtAction(nameof(GetById), new { id = award.Id }, new { id = award.Id });
        }

        // Put api/reward
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(string id, [FromBody] RewardNew awardNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var award = MapReward(awardNew);
            award.Id = id;
            await _repository.UpdateRewardAsync(award);

            return Ok();
        }

        //Delete api/reward
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReward(string id)
        {
            if (await _repository.DeleteRewardAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        
        //GET photo
        [HttpGet("{id}/Photo")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPhoto(string id)
        {
            var item = await _repository.GetRewardPhotoAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post photo
        [HttpPost("{id}/Photo")]
        public async Task<ActionResult> PostPhoto(string id,[FromForm(Name = "avatar")] IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var Oid = await _repository.AddRewardPhotoAsync(input, id, image.ContentType);
            if (Oid == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetPhoto), new { id = Oid, }, new { id = Oid, });
        }

        //Delete photo
        [HttpDelete("{id}/Photo")]
        public async Task<ActionResult> DeletePhoto(string id)
        {
            await _repository.DeleteRewardPhotoAsync(id);         
            return Ok();
        }

        private Reward MapReward(RewardNew awardNew) =>
        new Reward
        {
            Name = awardNew.Name
        };
    }
}
