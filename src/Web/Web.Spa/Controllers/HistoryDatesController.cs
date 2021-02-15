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
    [Authorize]
    public class HistoryDatesController : ControllerBase
    {

        private readonly IRepository _repository;

        public HistoryDatesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all Dates
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() =>
             Ok(await _repository.GetHistoryDatesAsync());

        //Get api/HistoryDate
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetHistoryDateAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // Put api/HistoryDate
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(string id, [FromBody] HistoryDatesNew histnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var hist = MapHistoryDates(histnew);
            hist.Id = id;
            await _repository.CreateOrUpdateHistoryDateAsync(hist);

            return Ok();
        }

        // POST api/HistoryDate
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] HistoryDatesNew datesNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var dates = MapHistoryDates(datesNew);
            await _repository.InsertHistoryDateAsync(dates);

            return CreatedAtAction(nameof(GetById), new { id = dates.Id }, new { id = dates.Id });
        }

        // DELETE api/HistoryDate
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteHistoryDateAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private HistoryDates MapHistoryDates(HistoryDatesNew dateNew) =>
         new HistoryDates
         {
             Name = dateNew.Name,
             Dates = dateNew.Dates
         };

    }
}