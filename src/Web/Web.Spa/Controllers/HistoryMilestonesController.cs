using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Belorusneft.Museum.Web.Spa.Infrastructure.Repositories;
using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Belorusneft.Museum.Web.Spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     /*[Authorize] */
    public class HistoryMilestones : ControllerBase
    {
        private readonly IRepository _repository;
        public HistoryMilestones(IRepository repository, ILogger<HistoryMilestones> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all Milestones
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            var item = await _repository.GetHistoryMilestones();
            return Ok(item);
        }

        //Get api/Milestone
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetHistoryMilestoneAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/Gallery
        [HttpPost]
        public async Task<IActionResult> CreateorUpdate([FromBody] HistoryMilestoneNew mileNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var mile = MapMilestone(mileNew);
            mile.Items = new List<string>();
            await _repository.InsertHistoryMilestoneAsync(mile);
            return CreatedAtAction(nameof(GetById), new { id = mile.Id }, new { id = mile.Id });
        }

        // Put api/Gallery
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] HistoryMilestoneNew mileNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var mile = MapMilestone(mileNew);
            mile.Id = id;
            await _repository.CreateOrUpdateMilestoneAsync(mile);
            return Ok();
        }

        private HistoryMilestone MapMilestone(HistoryMilestoneNew mileNew) =>
            new HistoryMilestone
            {
                DateStart = mileNew.DateStart,
                DateEnd = mileNew.DateEnd,
                Description = mileNew.Description,
            };

        // DELETE api/Gallery
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteHistoryMilestoneAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET item
        [HttpGet("{id}/item/{itemId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetItem(string id, string itemId)
        {
            var item = await _repository.GetHistoryItemAsync(id, itemId);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        
        //GET item
        [HttpGet("{id}/itemDescription/{itemId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetItemDescription(string id, string itemId)
        {
            var item = await _repository.GetHistoryItemDescriptionAsync(id, itemId);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        //Post item
        [HttpPost("{id}/item")]
        public async Task<ActionResult> Post(string id, IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var itemId = await _repository.AddHistoryItemAsync(input, id, image.ContentType, image.FileName);
           return CreatedAtAction(nameof(GetItem), new { id = itemId, }, new { id = itemId, });
        }

        //Delete item
        [HttpDelete("{id}/item/{itemId}")]
        public async Task<ActionResult> DeleteItem(string id, string itemId)
        {
            await _repository.DeleteHistoryItemAsync(id, itemId);
            return Ok();
        }
    }
}