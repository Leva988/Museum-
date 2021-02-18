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
    public class VeteransController : ControllerBase
    {
        private readonly IRepository _repository;
        public VeteransController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all veterans
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() =>
            Ok(await _repository.GetVeteransAsync());

        //Get api/veteran
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {

            var item = await _repository.GetVeteranAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/veteran
        [HttpPost("Veteran")]
        public async Task<IActionResult> Post([FromBody] VeteranNew vetNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var vet = MapVeteran(vetNew);
            await _repository.InsertVeteranAsync(vet);

            return CreatedAtAction(nameof(GetById), new { id = vet.Id }, new { id = vet.Id });
        }

        // POST api/veterans
        [HttpPost]
        public async Task<IActionResult> PostMany([FromBody] IEnumerable<VeteranNew> vetsnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var vets = MapVeterans(vetsnew);
            await _repository.InsertManyVeterans(vets);

            return CreatedAtAction(nameof(Get), vets);
        }

        // Put api/veteran
        [HttpPut("{id}")]
        public async Task<ActionResult<Veteran>> Put(string id, [FromBody] VeteranNew vetNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var vet = MapVeteran(vetNew);
            vet.Id = id;
            await _repository.CreateOrUpdateVeteranAsync(vet);

            return Ok(vet);
        }

        // DELETE api/veteran
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteVeteranAsync(id))
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
            var item = await _repository.GetVeteranPhotoAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post photo
        [HttpPost("{id}/Photo")]
        public async Task<ActionResult> PostPhoto(string id,[FromForm (Name = "avatar")] IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var Oid = await _repository.AddVeteranPhotoAsync(input, id, image.ContentType);
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
            await _repository.DeleteVeteranPhotoAsync(id);
            return Ok();
        }

        private Veteran MapVeteran(VeteranNew vetNew) =>
            new Veteran
            {
                Name = vetNew.Name,
                Position = vetNew.Position,
                BirthDay = vetNew.BirthDay,
                RecruitDate = vetNew.RecruitDate,
                FireDate = vetNew.FireDate
            };

        private IEnumerable<Veteran> MapVeterans(IEnumerable<VeteranNew> vetsnew)
        {
            Stack<Veteran> veterans = new Stack<Veteran>();
            for (var i = 0; i < vetsnew.ToList().Count(); i++)
            {
                Veteran emp = new Veteran
                {
                    Name = vetsnew.ElementAt(i).Name,
                    Position = vetsnew.ElementAt(i).Position,
                    BirthDay = vetsnew.ElementAt(i).BirthDay,
                    RecruitDate = vetsnew.ElementAt(i).RecruitDate,
                    FireDate = vetsnew.ElementAt(i).FireDate
                };
                veterans.Push(emp);
            }
            return veterans;
        }
    }
}