using Belorusneft.Museum.Web.Spa.Infrastructure.Repositories;
using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Belorusneft.Museum.Web.Spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HistoryRefController : ControllerBase
    {
        private readonly IRepository _repository;
        public HistoryRefController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all HistoryRef
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() =>
          Ok(await _repository.GetAllHistoryRefsAsync());

        //Get api/HistoryRef
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetHistoryRefAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/HistoryRef
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] HistoryRefNew histnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var hist = MapHistoryRef(histnew);
            await _repository.InsertHistoryRefAsync(hist);

            return CreatedAtAction(nameof(GetById), new { id = hist.Id }, new { id = hist.Id });
        }

        // Put api/HistoryRef
        [HttpPut("{id}")]
        public async Task<ActionResult<HistoryRef>> Put(string id, [FromBody] HistoryRefNew histnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var hist = MapHistoryRef(histnew);
            hist.Id = id;
            await _repository.CreateOrUpdateHistoryRefAsync(hist);

            return Ok();
        }

        // DELETE api/HistoryRef
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteHistoryRef(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET project image
        [HttpGet("{historyRefId}/Photo/{itemId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPhoto(string historyRefId, string itemId)
        {
            var item = await _repository.GetHistoryPhotosAsync(historyRefId, itemId);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post photo
        [HttpPost("{historyRefId}/Photo")]
        public async Task<ActionResult> PostPhoto(string historyRefId, IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var Oid = await _repository.AddHistoryPhotoAsync(input, historyRefId, image.ContentType);
            if (Oid == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetPhoto), new { historyRefId = historyRefId, itemId = Oid, }, new { itemId = Oid, });
        }

        //Delete photo
        [HttpDelete("{historyRefId}/Photo/{itemId}")]
        public async Task<ActionResult> DeletePhoto(string historyRefId, string itemId)
        {
            await _repository.DeleteHistoryPhoto(historyRefId, itemId);
            return Ok();
        }

        private HistoryRef MapHistoryRef(HistoryRefNew histNew) =>
            new HistoryRef
            {
                Name = histNew.Name,
                Description = histNew.Description,
                Items = new List<string>()
            };
    }
}
