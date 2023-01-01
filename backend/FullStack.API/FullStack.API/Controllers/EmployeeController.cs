using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {

        private readonly FullStackDbContext _fullStackDbContext;

        public EmployeeController(FullStackDbContext fullStackDbContext)
        {

            _fullStackDbContext = fullStackDbContext;

        }

        public FullStackDbContext FullStackDbContext { get; }

        [HttpGet]
        public async Task<IActionResult> GellAllEmployees()
        {
            var employees = await _fullStackDbContext.Employees.ToListAsync();
            return Ok(employees);

        }


        [HttpPost]

        public async Task<IActionResult> CreateEmployees([FromBody] Employee employeeReq)
        {
            employeeReq.id = Guid.NewGuid();
            _fullStackDbContext.Employees.AddAsync(employeeReq);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(employeeReq);


        }



        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetEmpById([FromRoute] Guid id)
        {
            var employee = await _fullStackDbContext.Employees.FirstOrDefaultAsync(x => x.id == id);
            if (employee == null)
            {
                return NotFound();
            }


            return Ok(employee);
        }


        [HttpPut]
        [Route("{id:Guid}")]

        public async Task<IActionResult> updateEmployee([FromRoute] Guid id, Employee updateEmployeeRequest)
        {

            var employee = await _fullStackDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Department = updateEmployeeRequest.Department;

            await _fullStackDbContext
           .SaveChangesAsync();
            return Ok(employee);



        }


        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> deleteEmp([FromRoute] Guid id)
        {
            var employee = await _fullStackDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _fullStackDbContext.Employees.Remove(employee);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(employee);
        }

    }
}
