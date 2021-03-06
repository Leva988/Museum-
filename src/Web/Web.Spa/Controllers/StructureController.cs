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
                var subs = await _repository.GetSubStructuresByStructureId(structure.Id);
                if (subs.Count()!= 0) {
                    foreach (SubStructure sub in subs)
                    {
                         var deps = await _repository.GetDepartmentsByStructureAsync(sub.Id);
                         sub.Departments = deps;
                    }
                }
                structure.SubStructures = subs;           
            }
            return Ok(structures);
        }

        //Get api/subStructures id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetStructureAsync(id);
            var departments = await _repository.GetDepartmentsByStructureAsync(item.Id);
            var subs = await _repository.GetSubStructuresByStructureId(item.Id);
            if (subs.Count()!= 0) {
                foreach (SubStructure sub in subs)
                {
                    var deps = await _repository.GetDepartmentsByStructureAsync(sub.Id);
                    sub.Departments = deps;
                }
            }
            item.SubStructures = subs;

            return Ok(item);
        }

        // POST api/subStructures
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StructureNew structNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var structure = MapStructure(structNew);
            await _repository.InsertStructureAsync(structure);
            return CreatedAtAction(nameof(GetById), new { id = structure.Id }, new { id = structure.Id });
        }

        // Put api/subStructures
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] StructureNew structNew)
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

        //Delete api/subStructures
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
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
            BossPosition = structNew.BossPosition
        };
    }
}