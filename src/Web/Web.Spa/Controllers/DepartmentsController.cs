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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] 
    public class DepartmentsController : ControllerBase
    {

        private readonly IRepository _repository;
        public DepartmentsController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/departments 
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            var items = await _repository.GetAllDepartmentsAsync();
            if (items == null)
            {
                return NotFound();
            }
            foreach (var i in items)
            {
                var employees = await _repository.GetEmployeeByDepartment(i.Id);
                i.EmployeesNumber = employees.Count();
            }
            return Ok(items);
        }

        //Get api/department id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetDepartmentAsync(id);
            var employees = await _repository.GetEmployeeByDepartment(id);
            item.EmployeesNumber = employees.Count();
            return Ok(item);
        }

        //Get api/departments(category)
        [HttpGet("structureId/{structureId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByStructure(string structureId)
        {
            var items = await _repository.GetDepartmentsByStructureAsync(structureId);
            if (items == null)
            {
                return NotFound();
            }
            foreach (var i in items)
            {
                var employees = await _repository.GetEmployeeByDepartment(i.Id);
                i.EmployeesNumber = employees.Count();
            }
            return Ok(items);
        }

        //Post api/department
        [HttpPost]
        
        public async Task<IActionResult> Post([FromBody] DepartmentNew depNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var department = MapDepartment(depNew);
            await _repository.AddDepartmentAsync(department);

            return CreatedAtAction(nameof(GetById), new { id = department.Id }, new { id = department.Id });
        }

        // Put api/department
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] DepartmentNew depnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var dep = MapDepartment(depnew);
            dep.Id = id;
            await _repository.UpdateDepartmentAsync(dep);

            return Ok();
        }

        // DELETE api/department
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteDepartmentAsync(id))
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
            var item = await _repository.GetDepartmentPhotoAsync(id);
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
            var Oid = await _repository.AddDepartmentPhotoAsync(input, id, image.ContentType);
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
            var res =  await _repository.DeleteDepartmentPhotoAsync(id);
            if(res)
            {
                return Ok();
            }
            return NotFound();            
        }

        private Department MapDepartment(DepartmentNew depNew) =>
            new Department
            {
                Name = depNew.Name,
                ShortName = depNew.ShortName,
                Sectors = depNew.Sectors,
                StructureId = depNew.StructureId,
                Description = depNew.Description,
            };
    }
}