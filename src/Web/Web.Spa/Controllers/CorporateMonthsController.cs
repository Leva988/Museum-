using System;
using System.IO;
using System.Collections.Generic;
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
    [Authorize]
    public class CorporateMonthsController : ControllerBase
    {
        private readonly IRepository _repository;

        public CorporateMonthsController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all months
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() {
            var months = await _repository.GetCorporateMonthsAsync();
            foreach(CorporateMonth month in months) {
                CorporateYear year = await _repository.GetCorporateYearAsync(month.YearId);
                month.Year = year.Year;
            }
            return Ok(months);
        }

        //Get api/month
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var month = await _repository.GetCorporateMonthAsync(id);
            if (month == null)
            {
                return NotFound();
            }
            CorporateYear year = await _repository.GetCorporateYearAsync(month.YearId);
            month.Year = year.Year;
            return Ok(month);
        }

        // POST api/month
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CorporateMonthNew corpNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var corp = MapCorporate(corpNew);
            corp.Items = new List<string>();
            await _repository.InsertCorporateMonthAsync(corp);
            return CreatedAtAction(nameof(GetById), new { id = corp.Id }, new { id = corp.Id });
        }

        // Put api/month
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] CorporateMonthNew corpNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var corp = MapCorporate(corpNew);
            corp.Id = id;
            await _repository.CreateOrUpdateCorporateMonthAsync(corp);
            return Ok(corp);
        }

        // DELETE api/month
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteCorporateMonthAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET photo
        [HttpGet("{id}/Photo/{photoId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPhoto(string id, string photoId)
        {
            var item = await _repository.GetCorporateMonthPhotoAsync(id, photoId);
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
            var itemId = await _repository.AddCorporateMonthPhotoAsync(input, id, image.ContentType);
            if (itemId == null)
            {
                return BadRequest();
            }
           return CreatedAtAction(nameof(GetPhoto), new { id = itemId, }, new { id = itemId, });
        }

        //Delete photo
        [HttpDelete("{id}/Photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(string id, string photoId)
        {
            await _repository.DeleteCorporateMonthPhotoAsync(id, photoId);
            return Ok();
        }

        // DELETE api/Months
        [HttpDelete("Year/{id}")]
        public async Task<IActionResult> DeleteMonths(string id)
        {
            var response = await _repository.DeleteCorporateMonthsByYear(id);
            if (response)
            {
                return Ok();
            }
            return NotFound();
        }

        private CorporateMonth MapCorporate(CorporateMonthNew corporate) =>
             new CorporateMonth
             {
                 Name = corporate.Name,
                 Description = corporate.Description,
                 YearId = corporate.YearId
             };
    }
}