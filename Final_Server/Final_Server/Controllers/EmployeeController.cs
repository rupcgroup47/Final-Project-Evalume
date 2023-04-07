using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        // GET: api/<EmployeeController>
        [HttpGet]
        public IEnumerable<Employee> Get() //get all users
        {
            //Department department = new Department();
            return Employee.ReadEmployees();

        }


        // GET api/<EmployeeController>/5
        [HttpGet("/userEmail/userpassword")]
        public IActionResult GetUserLoginDetails(string userEmail, string userpassword) //catch all details of the logged in user 
        {

            Employee employee = new Employee();
            employee = employee.Read(userEmail, userpassword);

            if (employee.UserEmail != null)
            {
                return Ok(employee);
            }
            else
            {
                return NotFound("Email or password was not found");
            }
        }



        [HttpPut("/userEmail/is_Active")]
        public IActionResult PutActive(string userEmail, bool is_Active) //Change by check box Is_Active feild in the logged in user
        {
            Employee employee = new Employee();
            int numEffected = employee.UpdateActive(userEmail, is_Active);
            if (numEffected != 0)
            {
                return Ok("user succesfully updated");
            }
            else
            {
                return NotFound("We couldnt update your user");
            }
        }



        // POST api/<EmployeeController>
        [HttpPost]
        public IActionResult Post([FromBody] Employee employee) //Insert new user
        {
            int numEffected = employee.InsertEmployee();
            if (numEffected != 0)
            {
                return Ok("Employee succesfully inserted");
            }
            else
            {
                return NotFound("Error in insert this employee");
            }
        }



        // PUT api/<EmployeeController>/5
        [HttpPut]
        public IActionResult PutUserDetails(int userNum,[FromBody] Employee employee) //Update user details
        {
            int numEffected = employee.UpdateUserDetails(userNum);
            if (numEffected != 0)
            {
                return Ok("user succesfully updated");
            }
            else
            {
                return NotFound("We couldnt update your user");
            }
        }


        [HttpPut("/userEmail/userpassword")]
        public IActionResult PutUserPass(string userEmail, string userpassword) //Update user password
        {
            Employee employee = new Employee();
            int numEffected = employee.UpdateUserPassword(userEmail, userpassword);
            if (numEffected != 0)
            {
                return Ok("Password succesfully updated");
            }
            else
            {
                return NotFound("We couldnt update your password");
            }
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }



    }
}
