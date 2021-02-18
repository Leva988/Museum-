using System;
using System.IO;
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
    public class ProjectsController : ControllerBase
    {
             
        private readonly IRepository _repository;

        public ProjectsController(IRepository repository, ILogger<ProjectsController> logger)
        {           
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        
        //Get api/all projects
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() =>
           Ok(await _repository.GetProjectsAsync());
        
        //Get api/project
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetProjectAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }
        
        //Get api/by department
        [HttpGet("Department/{depId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByDepartement(string depId)
        {

            var item = await _repository.GetProjectsByDepartment(depId);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/project
        [HttpPost]
        public async Task<IActionResult> CreateorUpdate([FromBody]ProjectNew projNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var proj = MapProject(projNew);
            await _repository.InsertProjectAsync(proj);

            return CreatedAtAction(nameof(GetById), new { id = proj.Id }, new { id = proj.Id });
        }

        // Put api/Project
        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> Put(string id, [FromBody]ProjectNew projnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var proj = MapProject(projnew);
            proj.Id = id;
            await _repository.CreateOrUpdateProjectAsync(proj);

            return Ok();
        }

        // DELETE api/project
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteProjectAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        //GET project image
        [HttpGet("{id}/Image")]
        [AllowAnonymous]
        public async Task<ActionResult> GetImage(string id)
        {
            var item = await _repository.GetProjectImageAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
        
        //Post photo
        [HttpPost("{id}/Image")]
        public async Task<ActionResult> PostPhoto(string id, [FromForm(Name = "avatar")] IFormFile image)
        {
            var stream = image.OpenReadStream();
            var input = new StreamReader(stream).BaseStream;
            var Oid = await _repository.AddProjectImageAsync(input, id, image.ContentType);
            if (Oid == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetImage), new { id = Oid, }, new { id = Oid, });
        }

        //Delete photo
        [HttpDelete("{id}/Image")]
        public async Task<ActionResult> DeletePhoto(string id)
        {
            await _repository.DeleteProjectImageAsync(id);        
            return Ok();
        }

        private Project MapProject(ProjectNew projectNew) =>
              new Project
              {
                  Name = projectNew.Name,
                  Description = projectNew.Description,
                  Color = projectNew.Color,               
                  DepartmentId = projectNew.DepartmentId,
                  ServiceId = projectNew.ServiceId
              };
    }
}