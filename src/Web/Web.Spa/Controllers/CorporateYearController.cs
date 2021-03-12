using System;
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
    public class CorporateYearsController : ControllerBase
    {
        private readonly IRepository _repository;

        public CorporateYearsController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all months
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            var item = await _repository.GetCorporateYearsAsync();
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        //Get api/month
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetCorporateYearAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/year
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CorporateYearNew corpNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var corp = MapCorporate(corpNew);
            await _repository.InsertCorporateYearAsync(corp);
            return CreatedAtAction(nameof(GetById), new { id = corp.Id }, new { id = corp.Id });
        }

        // Put api/year
        [HttpPut("{id}")]
        public async Task<ActionResult<CorporateMonth>> Put(string id, [FromBody] CorporateYearNew corpNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var corp = MapCorporate(corpNew);
            corp.Id = id;
            await _repository.CreateOrUpdateCorporateYearAsync(corp);
            return Ok(corp);
        }

        // DELETE api/year
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteCorporateYearAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private CorporateYear MapCorporate(CorporateYearNew corporate) =>
             new CorporateYear
             {
                 Year = corporate.Year
             };
    }
}