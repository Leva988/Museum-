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
    [ApiController]
    [Route("api/[controller]")]
    /*[Authorize] */
    public class BossesController : ControllerBase
    {
        private readonly IRepository _repository;
        public BossesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

         //Get api/all bosses
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() =>
            Ok(await _repository.GetBossesAsync());

        //Get api/boss
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var emp = await _repository.GetBossAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            return Ok(emp);
        }

        // POST api/boss
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BossNew bossnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var boss = MapBoss(bossnew);
            await _repository.InsertBossAsync(boss);

            return CreatedAtAction(nameof(GetById), new { id = boss.Id }, new { id = boss.Id });
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(string id, [FromBody]BossNew bossNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var boss = MapBoss(bossNew);
            boss.Id = id;
            await _repository.CreateOrUpdateBossAsync(boss);
            return Ok();
        }

        // DELETE api/employee
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteBossAsync(id))
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
            var item = await _repository.GetBossPhotoAsync(id);
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
            var Oid = await _repository.AddBossPhotoAsync(input, id, image.ContentType);
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
            await _repository.DeleteBossPhotoAsync(id);         
            return Ok();
        }

        private Boss MapBoss(BossNew bossNew) =>
            new Boss
            {
                Name = bossNew.Name,
                Description = bossNew.Description,
                DateStart = bossNew.DateStart,
                DateEnd = bossNew.DateEnd
            };
    }

}