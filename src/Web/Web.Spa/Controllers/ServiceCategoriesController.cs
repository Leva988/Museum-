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
    public class ServiceCategoriesController : ControllerBase
    {
        private readonly IRepository _repository;
        public ServiceCategoriesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        //Get api/all categories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllCategories()
        {
            var item = await _repository.GetServiceCategoriesAsync();
            var categories = item.ToArray();
            foreach (ServiceCategory cat in categories)
            {
                var services = await _repository.GetServicesAsync(cat.Id);
                cat.Services = services;
            }
            return Ok(categories);
        }

        //Get api/category id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetServiceCategoryAsync(id);
            var services = await _repository.GetServicesAsync(item.Id);
            item.Services = services;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/project
        [HttpPost]
        public async Task<IActionResult> CreateorUpdateCategory([FromBody] ServiceCategoryNew categoryNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var category = MapCategory(categoryNew);
            await _repository.InsertServiceCategoryAsync(category);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, new { id = category.Id });
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(string id, [FromBody] ServiceCategoryNew catNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var cat = MapCategory(catNew);
            cat.Id = id;
            await _repository.UpdateServiceCategoryAsync(cat);

            return Ok();
        }

        //Delete api/category
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(string id)
        {
            if (await _repository.DeleteServiceCategoryAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private ServiceCategory MapCategory(ServiceCategoryNew catNew) =>
        new ServiceCategory
        {
            Name = catNew.Name,
            Description = catNew.Description
        };
    }
}
