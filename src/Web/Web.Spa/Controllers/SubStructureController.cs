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
    /* [Authorize] */
    public class SubStructureController : ControllerBase
    {
        private readonly IRepository _repository;
        public SubStructureController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all subStructures
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllStructures()
        {
            var item = await _repository.GetSubStructuresAsync();
            var subStructures = item.ToArray();
            foreach (SubStructure sub in subStructures)
            {
                var departments = await _repository.GetDepartmentsByStructureAsync(sub.Id);
                sub.Departments = departments;
            }
            return Ok(subStructures);
        }

        //Get api/subStructure id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetSubStructureAsync(id);
            var departments = await _repository.GetDepartmentsByStructureAsync(item.Id);
            item.Departments = departments;
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/subStructure
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SubStructureNew subNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var subStructure = MapSubStructure(subNew);
            await _repository.InsertSubStructureAsync(subStructure);
            return CreatedAtAction(nameof(GetById), new { id = subStructure.Id }, new { id = subStructure.Id });
        }

        // Put api/subStructure
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] SubStructureNew structNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var sub = MapSubStructure(structNew);
            sub.Id = id;
            await _repository.UpdateSubStructureAsync(sub);

            return Ok();
        }

        //Delete api/subStructure
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            if (await _repository.DeleteSubStructureAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private SubStructure MapSubStructure(SubStructureNew subStructNew) =>
        new SubStructure
        {
            Number = subStructNew.Number,
            BossPosition = subStructNew.BossPosition,
            StructureId = subStructNew.StructureId
        };
    }
}
