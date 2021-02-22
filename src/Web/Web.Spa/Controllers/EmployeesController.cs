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
    /*[Authorize] */
    public class EmployeesController : ControllerBase
    {
        private readonly IRepository _repository;
        public EmployeesController(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //Get api/all employees
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get() =>
            Ok(await _repository.GetEmployeesAsync());

        //Get api/employee
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(string id)
        {

            var item = await _repository.GetEmployeeAsync(id);

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

            var item = await _repository.GetEmployeeByDepartment(depId);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/employee
        [HttpPost("Employee")]
        public async Task<IActionResult> Post([FromBody]EmployeeNew empnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var emp = MapEmployee(empnew);
            await _repository.InsertEmployeeAsync(emp);

            return CreatedAtAction(nameof(GetById), new { id = emp.Id }, new { id = emp.Id });
        }

        // POST api/employees
        [HttpPost]
        public async Task<IActionResult> PostMany([FromBody]IEnumerable<EmployeeNew> empsnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }
            var emps = MapEmployees(empsnew);
            await _repository.InserManytEmployeesAsync(emps);

            return CreatedAtAction(nameof(Get), emps);
        }

        // Put api/Employee
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(string id, [FromBody]EmployeeNew empnew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values);
            }

            var emp = MapEmployee(empnew);
            emp.Id = id;
            await _repository.CreateOrUpdateEmployeeAsync(emp);

            return Ok();
        }

        // DELETE api/employee
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _repository.DeleteEmployeeAsync(id))
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
            var item = await _repository.GetEmployeePhotoAsync(id);
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
            var Oid = await _repository.AddEmployeePhotoAsync(input, id, image.ContentType);
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
            await _repository.DeleteEmployeePhotoAsync(id);         
            return Ok();
        }

        private Employee MapEmployee(EmployeeNew employeeNew) =>
            new Employee
            {
                Name = employeeNew.Name,
                Position = employeeNew.Position,
                Region = employeeNew.Region,
                Type = employeeNew.Type,
                DepartmentId = employeeNew.DepartmentId
            };

        private IEnumerable<Employee> MapEmployees(IEnumerable<EmployeeNew> employeesNew) {
            Stack<Employee> employees = new Stack<Employee>();
            for (var i = 0; i < employeesNew.ToList().Count(); i++)
            {
                Employee emp = new Employee
                {
                    Name = employeesNew.ElementAt(i).Name,
                    Position = employeesNew.ElementAt(i).Position,
                    Region = employeesNew.ElementAt(i).Region,
                    Type = employeesNew.ElementAt(i).Type,
                    DepartmentId = employeesNew.ElementAt(i).DepartmentId
                };
                employees.Push(emp);
            }

            return employees;
           }
    }

}