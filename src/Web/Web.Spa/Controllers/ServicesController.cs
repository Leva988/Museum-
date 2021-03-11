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
    public class ServicesController : ControllerBase
    {

        private readonly IRepository _repository;
        public ServicesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get all
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllServices()
        {
            var item = await _repository.GetAllServicesAsync();
            var services = item.ToArray();
            return Ok(services);
        }

        //Get api/service id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetServiceAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        //Get api/services(category)
        [HttpGet("Category/{categoryId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByCategory(string category)
        {
            var item = await _repository.GetServicesAsync(category);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> AddServices([FromBody] ServiceNew servicenew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var service = MapService(servicenew);
            await _repository.AddServiceAsync(service);

            return CreatedAtAction(nameof(GetById), new { id = service.Id }, new { id = service.Id });
        }

        // Put api/service
        [HttpPut("{id}")]
        public async Task<ActionResult<Service>> Put(string id, [FromBody] ServiceNew servicenew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var service = MapService(servicenew);
            service.Id = id;
            await _repository.UpdateServiceAsync(service);

            return Ok();
        }

        // DELETE api/service
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(string id)
        {
            if (await _repository.DeleteServiceAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private Service MapService(ServiceNew serviceNew) =>
            new Service
            {
                Name = serviceNew.Name,
                CategoryId = serviceNew.CategoryId
            };
    }
}