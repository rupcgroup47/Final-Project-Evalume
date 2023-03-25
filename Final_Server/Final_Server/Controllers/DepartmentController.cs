using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        // GET: api/<DepartmentController>
        [HttpGet]
        //public DataTable GetDepartments()
        //{
        //    DataTable dt = new DataTable();
        //    Department department = new Department();
        //    dt = department.ReadDepartments();
        //    return dt;
        //}

        public IEnumerable<Department> Get() //get all departments
        {
            //Department department = new Department();
            return Department.ReadDepartments();

        }


        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        // POST api/<DepartmentController>
        [HttpPost]
        public IActionResult Post([FromBody] Department department) //Insert new department
        {
            int numEffected = department.InsertDepartment();
            if (numEffected != 0)
            {
                return Ok("department succesfully inserted");
            }
            else
            {
                return NotFound("Error in insert this department");
            }
        }


        // PUT api/<DepartmentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
