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
    /* [Authorize] */
    public class RewardedEmployeesController : ControllerBase
    {
        private readonly IRepository _repository;
        public RewardedEmployeesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all rewardedemployee
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() =>
            Ok(await _repository.GetRewardedEmployeesAsync());

        //Get api/rewardedemployee
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {

            var item = await _repository.GetRewardedEmployeeAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/rewardedemployee
        [HttpPost("RewardedEmployee")]
        public async Task<IActionResult> Post([FromBody] RewardedEmployeeNew rewNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var rew = MapEmployee(rewNew);
            await _repository.InsertRewardedEmployeeAsync(rew);

            return CreatedAtAction(nameof(GetById), new { id = rew.Id }, new { id = rew.Id });
        }

        // POST api/rewardedemployees
        [HttpPost]
        public async Task<IActionResult> PostMany([FromBody] IEnumerable<RewardedEmployeeNew> rewNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var rews = MapEmps(rewNew);
            await _repository.InsertManyRewardedEmployees(rews);

            return CreatedAtAction(nameof(Get), rews);
        }

        // Put api/rewardedemployee
        [HttpPut("{id}")]
        public async Task<ActionResult<Veteran>> Put(string id, [FromBody] RewardedEmployeeNew rewNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var rew = MapEmployee(rewNew);
            rew.Id = id;
            await _repository.CreateOrUpdateRewardedEmployeeAsync(rew);

            return Ok(rew);
        }

        // DELETE api/rewardedemployee
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteRewardedEmployeeAsync(id))
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
            var item = await _repository.GetRewardedEmployeePhotoAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post photo
        [HttpPost("{id}/Photo")]
        public async Task<ActionResult> PostPhoto(string id, IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var Oid = await _repository.AddRewardedEmployeePhotoAsync(input, id, image.ContentType);
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
            await _repository.DeleteRewardedEmployeePhotoAsync(id);
            return Ok();
        }

        private RewardedEmployee MapEmployee(RewardedEmployeeNew rewNew) =>
            new RewardedEmployee
            {
                Name = rewNew.Name,
                Position = rewNew.Position,
                DateBirth = rewNew.DateBirth,
                DateStart = rewNew.DateStart,
                DateEnd = rewNew.DateEnd,
                Rewards = rewNew.Rewards
            };

        private IEnumerable<RewardedEmployee> MapEmps(IEnumerable<RewardedEmployeeNew> rewNew)
        {
            Stack<RewardedEmployee> rewardeds = new Stack<RewardedEmployee>();
            for (var i = 0; i < rewNew.ToList().Count(); i++)
            {
                RewardedEmployee emp = new RewardedEmployee
                {
                     Name = rewNew.ElementAt(i).Name,
                     Position = rewNew.ElementAt(i).Position,
                     DateBirth = rewNew.ElementAt(i).DateBirth,
                     DateStart = rewNew.ElementAt(i).DateStart,
                     DateEnd = rewNew.ElementAt(i).DateEnd,
                     Rewards = rewNew.ElementAt(i).Rewards
                };
                rewardeds.Push(emp);
            }
            return rewardeds;
        }
    }
}
