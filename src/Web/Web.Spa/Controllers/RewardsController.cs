using System;
using System.Linq;
using System.Threading.Tasks;
using Belorusneft.Museum.Web.Spa.Infrastructure.Repositories;
using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.AspNetCore.Authorization;
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


        //Get api/all categories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllRewards()
        {
            var item = await _repository.GetAllRewardsAsync();
            var awards = item.ToArray();
            foreach (Reward award in awards)
            {
                var emps = await _repository.GetRewardedEmployeesByRewardAsync(award.Id);
                if(emps! == null) {
                    award.RewardedEmployees = emps;
                }
                
            }
            return Ok(awards);
        }

        //Get api/category id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var award = await _repository.GetRewardAsync(id);
            var emps = await _repository.GetRewardedEmployeesByRewardAsync(award.Id);
                if(emps! == null) {
                    award.RewardedEmployees = emps;
                }
            return Ok(award);
        }

        // POST api/project
        [HttpPost]
        public async Task<IActionResult> CreateorUpdateCategory([FromBody] RewardNew awardNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var award = MapReward(awardNew);
            await _repository.AddRewardAsync(award);
            return CreatedAtAction(nameof(GetById), new { id = award.Id }, new { id = award.Id });
        }

        // Put api/Employee
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

        //Delete api/category
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReward(string id)
        {
            if (await _repository.DeleteRewardAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private Reward MapReward(RewardNew awardNew) =>
        new Reward
        {
            Name = awardNew.Name
        };
    }
}
