using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Belorusneft.Museum.Web.Spa.Infrastructure.Repositories;
using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Belorusneft.Museum.Web.Spa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GalleryVideosController : ControllerBase
    {
        private readonly IRepository _repository;
        public GalleryVideosController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

         //Get api/all videos
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() {
           var videos = await _repository.GetGalleryVideosAsync();
            foreach (GalleryVideo vid in videos) {
                var category = await _repository.GetVideoCategoryAsync(vid.CategoryId);
                vid.Category = category.Name;
            }
            return Ok(videos);
        }
        

        //Get api/videos
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var video = await _repository.GetGalleryVideoAsync(id);
            if (video == null)
            {
                return NotFound();
            }
            var cat = await _repository.GetVideoCategoryAsync(video.CategoryId);
            video.Category = cat.Name;
          
            return Ok(video);
        }

        // POST api/videos
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]GalleryVideoNew videoNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var video = MapVideo(videoNew);
            await _repository.InsertGalleryVideoAsync(video);

            return CreatedAtAction(nameof(GetById), new { id = video.Id }, new { id = video.Id });
        }

        // Put api/videos
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody]GalleryVideoNew videoNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var video = MapVideo(videoNew);
            video.Id = id;
            await _repository.CreateOrUpdateGalleryVideoAsync(video);

            return Ok();
        }

        // DELETE api/videos
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteGalleryVideoAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET photo
        [HttpGet("{id}/Photo")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPhoto(string id)
        {
            var item = await _repository.GetGalleryVideoPreviewAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //Post photo
        [HttpPost("{id}/Photo")]
        public async Task<ActionResult> PostPhoto(string id,[FromForm(Name="avatar")] IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var Oid = await _repository.AddGalleryVideoPreviewAsync(input, id, image.ContentType);
            if (Oid == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetPhoto), new { id = Oid, }, new { id = Oid, });
        }

        //Delete photo
        [HttpDelete("{id}/Photo")]
        public async Task<ActionResult> DeletePhoto(string id)
        {
            var res =  await _repository.DeleteGalleryVideoPreviewAsync(id);
            if (res)
            {
                return Ok();
            }
            return NotFound();
        }

        // DELETE api/Videos
        [HttpDelete("Category/{id}")]
        public async Task<IActionResult> DeleteVideos(string id)
        {
            var response = await _repository.DeleteVideosByCategoryAsync(id);
            if (response)
            {
                return Ok();
            }
            return NotFound();
        }

        private GalleryVideo MapVideo(GalleryVideoNew videoNew) =>
            new GalleryVideo
            {
                Name = videoNew.Name,
                Url = videoNew.Url,
                Date = videoNew.Date,
                CategoryId = videoNew.CategoryId
            };


    }

}