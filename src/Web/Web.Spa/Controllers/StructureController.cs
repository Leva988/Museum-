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
    public class StructureController : ControllerBase
    {
        private readonly IRepository _repository;
        public StructureController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all subStructures
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllStructures()
        {
            var item = await _repository.GetStructuresAsync();
            var structures = item.ToArray();
            foreach (Structure structure in structures)
            {
                var departments = await _repository.GetDepartmentsByStructureAsync(structure.Id);
                structure.Departments = departments;               
            }
            return Ok(structures);
        }

        //Get api/category id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetStructureAsync(id);
            var departments = await _repository.GetDepartmentsByStructureAsync(item.Id);
            item.Departments = departments;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/project
        [HttpPost]
        public async Task<IActionResult> CreateorUpdateStructure([FromBody] StructureNew structNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var structure = MapStructure(structNew);
            await _repository.InsertStructureAsync(structure);
            return CreatedAtAction(nameof(GetById), new { id = structure.Id }, new { id = structure.Id });
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult<Structure>> Put(string id, [FromBody] StructureNew structNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var structure = MapStructure(structNew);
            structure.Id = id;
            await _repository.UpdateStructureAsync(structure);

            return Ok();
        }

        //Delete api/category
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStructure(string id)
        {
            if (await _repository.DeleteStructureAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private Structure MapStructure(StructureNew structNew) =>
        new Structure
        {
            BossPosition = structNew.BossPosition,
            Heads = structNew.Heads
        };
    }
}