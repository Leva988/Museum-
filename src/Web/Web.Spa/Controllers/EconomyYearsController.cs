using System;
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
    public class EconomyYearsController : ControllerBase
    {
        private readonly IRepository _repository;
        public EconomyYearsController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        //Get api/all categories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllEconomyYears() =>
          Ok(await _repository.GetEconomyYearsAsync());


        //Get api/ id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetEconomyYearAsync(id);
            return Ok(item);
        }

        //Get api/ departmentId 
        [HttpGet("Department/{depId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByDepartement(string depId)
        {
            var item = await _repository.GetEconomyYearsByDepartment(depId);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/project
        [HttpPost]
        public async Task<IActionResult> CreateorUpdateStructure([FromBody] EconomyYearNew yearNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var year = MapYear(yearNew);
            await _repository.InsertEconomyYearAsync(year);
            return CreatedAtAction(nameof(GetById), new { id = year.Id }, new { id = year.Id });
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult<EconomyYear>> Put(string id, [FromBody] EconomyYearNew yearNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var year = MapYear(yearNew);
            year.Id = id;
            await _repository.UpdateEconomyYearAsync(year);

            return Ok();
        }

        //Delete api/category
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            if (await _repository.DeleteEconomyYearAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private EconomyYear MapYear(EconomyYearNew yearNew) =>
        new EconomyYear
        {
            DepartmentId = yearNew.DepartmentId,
            Year = yearNew.Year,
            InnerVolume = yearNew.InnerVolume,
            OuterVolume = yearNew.OuterVolume,
            ServicePrice = yearNew.ServicePrice,
            Expenses = yearNew.Expenses,
            FinancialResults = yearNew.FinancialResults,
            Salary = yearNew.Salary,
            SalaryDollar = yearNew.SalaryDollar,
            Work = yearNew.Work,
            WorkDollar = yearNew.WorkDollar
        };
    }
}