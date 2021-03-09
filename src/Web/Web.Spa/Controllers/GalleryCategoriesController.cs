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
    public class GalleryCategoriesController : ControllerBase
    {
        private readonly IRepository _repository;
        public GalleryCategoriesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        //Get api/all categories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllCategories()
        {
            var item = await _repository.GetGalleryCategories();
            var categories = item.ToArray();
            foreach (GalleryCategory cat in categories)
            {
                var galleries = await _repository.GetGalleriesByCategoryAsync(cat.Id);
                cat.Galleries = galleries;          
            }
            return Ok(categories);
        }

        //Get api/category id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var cat = await _repository.GetGalleryCategoryAsync(id);
            var galleries = await _repository.GetGalleriesByCategoryAsync(cat.Id);
            cat.Galleries = galleries;              
            return Ok(cat);
        }

        // POST api/project
        [HttpPost]
        public async Task<IActionResult> CreateorUpdateCategory([FromBody] GalleryCategoryNew categoryNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var category = MapCategory(categoryNew);
            await _repository.InsertGalleryCategoryAsync(category);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, new { id = category.Id });
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(string id, [FromBody] GalleryCategoryNew catNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var cat = MapCategory(catNew);
            cat.Id = id;
            await _repository.CreateOrUpdateGalleryCategoryAsync(cat);

            return Ok();
        }

        //Delete api/category
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(string id)
        {
            if (await _repository.DeleteGalleryCategoryAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private GalleryCategory MapCategory(GalleryCategoryNew catNew) =>
        new GalleryCategory
        {
            Name = catNew.Name
        };
    }
}
