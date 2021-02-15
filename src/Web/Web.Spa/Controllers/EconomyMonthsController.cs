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
    [Authorize]
    public class EconomyMonthsController : ControllerBase
    {
        private readonly IRepository _repository;
        public EconomyMonthsController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        //Get api/all categories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllEconomyMonths() =>
          Ok(await _repository.GetEconomyMonthsAsync());

        //Get api/category id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {
            var item = await _repository.GetEconomyMonthAsync(id);
            return Ok(item);
        }

        //Get api/ departmentId 
        [HttpGet("Department/{depId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByDepartement(string depId)
        {
            var item = await _repository.GetEconomyMonthsByDepartment(depId);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/project
        [HttpPost]
        public async Task<IActionResult> CreateorUpdateStructure([FromBody] EconomyMonthNew monthNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var month = MapMonth(monthNew);
            await _repository.InsertEconomyMonthAsync(month);
            return CreatedAtAction(nameof(GetById), new { id = month.Id }, new { id = month.Id });
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult<EconomyMonth>> Put(string id, [FromBody] EconomyMonthNew monthNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var month = MapMonth(monthNew);
            month.Id = id;
            await _repository.UpdateEconomyMonthAsync(month);

            return Ok();
        }

        //Delete api/category
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            if (await _repository.DeleteEconomyMonthAsync(id))
            {
                return Ok();
            }
            return NotFound();
        }

        private EconomyMonth MapMonth(EconomyMonthNew monthNew) =>
            new EconomyMonth
            {
                DepartmentId = monthNew.DepartmentId,
                Month = monthNew.Month,
                InnerVolume = monthNew.InnerVolume,
                OuterVolume = monthNew.OuterVolume,
                ServicePrice = monthNew.ServicePrice,
                Expenses = monthNew.Expenses,
                FinancialResults = monthNew.FinancialResults,
                Salary = monthNew.Salary,
                SalaryDollar = monthNew.SalaryDollar,
                Work = monthNew.Work,
                WorkDollar = monthNew.WorkDollar,
            };
    }
}