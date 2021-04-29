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
    [Authorize]
    public class VideoCategoriesController : ControllerBase
    {
        private readonly IRepository _repository;
        public VideoCategoriesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        //Get api/all categories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllCategories()
        {
            var item = await _repository.GetVideoCategoriesAsync();
            var categories = item.ToArray();
            foreach (VideoCategory cat in categories)
            {
                var videos = await _repository.GetVideosByCategoryAsync(cat.Id);
                cat.Videos = videos;          
            }
            return Ok(categories);
        }

        //Get api/category id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var cat = await _repository.GetVideoCategoryAsync(id);
            var videos = await _repository.GetVideosByCategoryAsync(cat.Id);
            cat.Videos = videos;              
            return Ok(cat);
        }

        // POST api/category
        [HttpPost]    
        public async Task<IActionResult> Post([FromBody] VideoCategoryNew categoryNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var category = MapCategory(categoryNew);
            await _repository.InsertVideoCategoryAsync(category);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, new { id = category.Id });
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] VideoCategoryNew categoryNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var cat = MapCategory(categoryNew);
            cat.Id = id;
            await _repository.CreateOrUpdateVideoCategoryAsync(cat);

            return Ok();
        }

        //Delete api/category
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            if (await _repository.DeleteVideoCategoryAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private VideoCategory MapCategory(VideoCategoryNew catNew) =>
        new VideoCategory
        {
            Name = catNew.Name
        };
    }
}
