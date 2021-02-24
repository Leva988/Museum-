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
    /*[Authorize] */
    public class SocialCategoriesController : ControllerBase
    {
        private readonly IRepository _repository;

        public SocialCategoriesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all SocialCategories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            var item = await _repository.GetSocialCategoriesAsync();
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        //Get api/Event
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetSocialCategoryAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/SocialCategory
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SocialCategoryNew socialNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var social = MapSocial(socialNew);
            social.Items = new List<string>();
            await _repository.InsertSocialCategoryAsync(social);
            return CreatedAtAction(nameof(GetById), new { id = social.Id }, new { id = social.Id });
        }

        // Put api/SocialCategory
        [HttpPut("{id}")]
        public async Task<ActionResult<SocialCategory>> Put(string id, [FromBody] SocialCategoryNew socialNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var social = MapSocial(socialNew);
            social.Id = id;
            await _repository.CreateOrUpdateSocialCategoryAsync(social);
            return Ok(social);
        }

        // DELETE api/SocialCategory
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteSocialCategoryAsync(id))
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
            var item = await _repository.GetSocialCategoryPhotoAsync(id, photoId);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post photo
        [HttpPost("{id}/Photo")]
        public async Task<ActionResult> PostPhoto(string id, IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var itemId = await _repository.AddSocialCategoryPhotoAsync(input, id, image.ContentType);
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
            await _repository.DeleteSocialCategoryPhotoAsync(id, photoId);
            return Ok();
        }

        private SocialCategory MapSocial(SocialCategoryNew socialNew) =>
             new SocialCategory
             {
                 Name = socialNew.Name,
                 Description = socialNew.Description
             };
    }
}