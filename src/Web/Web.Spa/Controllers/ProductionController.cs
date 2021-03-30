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
    [Authorize]
    public class ProductionController : ControllerBase
    {
        private readonly IRepository _repository;
        public ProductionController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all Production
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            var item = await _repository.GetProductions();
            return Ok(item);
        }

        //Get api/Production
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetProductionAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/Production
        [HttpPost]
        public async Task<IActionResult> CreateorUpdate([FromBody] ProductionNew prodNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var prod = MapProduction(prodNew);
            prod.Items = new List<string>();
            await _repository.InsertProductionAsync(prod);
            return CreatedAtAction(nameof(GetById), new { id = prod.Id }, new { id = prod.Id });
        }

        // Put api/Production
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] ProductionNew prodNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var prod = MapProduction(prodNew);
            prod.Id = id;
            await _repository.CreateOrUpdateProductionAsync(prod);
            return CreatedAtAction(nameof(GetById), new { id = prod.Id }, new { id = prod.Id });
        }

        private Production MapProduction(ProductionNew prodNew) =>
            new Production
            {
                Name = prodNew.Name
            };

        // DELETE api/Production
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteProductionAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET item
        [HttpGet("{id}/icon/{iconId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetItem(string id, string iconId)
        {
            var item = await _repository.GetProductionIconAsync(id, iconId);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
        
        //GET item desc
        [HttpGet("{id}/iconDescription/{iconId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetItemDescription(string id, string iconId)
        {
            var item = await _repository.GetProductionIconDescriptionAsync(id, iconId);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        //Post item
        [HttpPost("{id}/icon")]
        public async Task<ActionResult> Post(string id, IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var iconId = await _repository.AddProductionIconAsync(input, id, image.ContentType, image.FileName);
           return CreatedAtAction(nameof(GetItem), new { id = iconId, }, new { id = iconId, });
        }

        //Delete item
        [HttpDelete("{id}/icon/{iconId}")]
        public async Task<ActionResult> DeleteItem(string id, string iconId)
        {
            await _repository.DeleteProductionIconAsync(id, iconId);
            return Ok();
        }
    }
}