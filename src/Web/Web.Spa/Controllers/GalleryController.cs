﻿using System;
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
    public class GalleryController : ControllerBase
    {
        private readonly IRepository _repository;
        public GalleryController(IRepository repository, ILogger<GalleryController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all Galleries
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            var item = await _repository.GetGalleriesAsync();
            return Ok(item);
        }

        //Get api/Gallery
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetGalleryAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpGet("SocialCategory/{catId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByCategory(string catId)
        {
            var item = await _repository.GetGalleriesByCategoryAsync(catId);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/Gallery
        [HttpPost]
        public async Task<IActionResult> CreateorUpdate([FromBody] GalleryNew galleryNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var gallery = MapGallery(galleryNew);
            gallery.Items =  new List<string>();
            await _repository.InsertGalleryAsync(gallery);
            return CreatedAtAction(nameof(GetById), new { id = gallery.Id }, new { id = gallery.Id });
        }

        // Put api/Gallery
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] GalleryNew galleryNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var gallery = MapGallery(galleryNew);
            gallery.Id = id;
            await _repository.CreateOrUpdateGalleryAsync(gallery);
            return Ok();
        }

        private Gallery MapGallery(GalleryNew galleryNew) =>
            new Gallery
            {
                Date = galleryNew.Date,
                Name = galleryNew.Name,
                CategoryId = galleryNew.CategoryId
            };

        // DELETE api/Gallery
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteGalleryAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET item
        [HttpGet("{galleryId}/item/{itemId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetItem(string galleryId, string itemId)
        {
            var item = await _repository.GetGalleryItemAsync(galleryId, itemId);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post item
        [HttpPost("{galleryId}/item")]
        public async Task<ActionResult> Post(string galleryId, IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var itemId = await _repository.AddGalleryItemAsync(input, galleryId, image.ContentType);
           return CreatedAtAction(nameof(GetItem), new { id = itemId, }, new { id = itemId, });
        }

        //Delete item
        [HttpDelete("{galleryId}/item/{itemId}")]
        public async Task<ActionResult> DeleteItem(string galleryId, string itemId)
        {
            await _repository.DeleteGalleryItemAsync(galleryId, itemId);
            return Ok();
        }
    }
}