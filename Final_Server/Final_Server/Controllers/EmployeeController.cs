using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Net.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        // GET: api/<EmployeeController>
        [HttpGet]
        public IEnumerable<Employee> Get() //get all users
        {
            try
            {
                return Employee.ReadEmployees();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // GET api/<EmployeeController>/5
        [HttpGet("/userEmail/userpassword")]
        public IActionResult GetUserLoginDetails(string userEmail, string userpassword) //catch all details of the logged in user 
        {

            Employee employee = new Employee();
            try
            {
                employee = employee.Read(userEmail, userpassword);
                if (employee.UserEmail != null)
                {
                    return Ok(employee);
                }
                else return NotFound("Email or password was not found");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        [HttpPut("/userEmail/is_Active/{userNum}")]
        public IActionResult PutActive(int userNum, [FromBody] bool is_Active) //Change by check box Is_Active feild in the logged in user - because we are not deleting an employee record we make him not active
        {
            Employee employee = new Employee();
            try
            {
                int numEffected = employee.UpdateActive(userNum, is_Active);
                if (numEffected != 0)
                {
                    return Ok("user succesfully updated");
                }
                else
                {
                    return NotFound("We couldnt update your user");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        // POST api/<EmployeeController>
        [HttpPost]
        public IActionResult Post([FromBody] JsonElement data) //Insert new user using a json object implentet into empolyee
        {
            Employee employee = new Employee();
            try
            {
                employee.UserEmail = data.GetProperty("userEmail").ToString();
                employee.UserId = Convert.ToInt32(data.GetProperty("userId").GetInt32());
                employee.UserFName = data.GetProperty("userFName").ToString();
                employee.UserLName = data.GetProperty("userLName").ToString();
                employee.UserGender = data.GetProperty("userGender").ToString();
                employee.Is_Active = Convert.ToBoolean(data.GetProperty("is_Active").GetBoolean());
                employee.Is_Admin = Convert.ToBoolean(data.GetProperty("is_Admin").GetBoolean());
                employee.UserType = Convert.ToBoolean(data.GetProperty("userType").GetBoolean());
                employee.UserDepartment = data.GetProperty("userDepartment").ToString();
                employee.UserPhoneNum = Convert.ToInt32(data.GetProperty("userPhoneNum").GetInt32());
                employee.UserRole = data.GetProperty("userRole").ToString();
                employee.UserRoleGroupDesc = data.GetProperty("userRoleGroupDesc").ToString();
                employee.ManagerFname = data.GetProperty("managerFname").ToString();
                employee.ManagerLName = data.GetProperty("managerLName").ToString();
                employee.ManagerEmail = data.GetProperty("managerEmail").ToString();
                MailAddress addr = new MailAddress(employee.UserEmail);
                employee.Userpassword = addr.User + "555"; // creating a default password for a new user
            }
            catch (Exception)
            {

                throw;
            }
            try
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
            catch (Exception ex)
            {
                throw ex;
            }
        }



        // PUT api/<EmployeeController>/5
        [HttpPut("{userNum}")]
        public IActionResult PutUserDetails(int userNum, [FromBody] JsonElement data) //Update user details using a json object implentet into empolyee
        {
            Employee employee = new Employee();
            employee.UserEmail = data.GetProperty("userEmail").ToString();
            employee.UserId = Convert.ToInt32(data.GetProperty("userId").GetInt32());
            employee.UserFName = data.GetProperty("userFName").ToString();
            employee.UserLName = data.GetProperty("userLName").ToString();
            employee.UserGender = data.GetProperty("userGender").ToString();
            employee.Is_Active = Convert.ToBoolean(data.GetProperty("is_Active").GetBoolean());
            employee.Is_Admin = Convert.ToBoolean(data.GetProperty("is_Admin").GetBoolean());
            employee.UserType = Convert.ToBoolean(data.GetProperty("userType").GetBoolean());
            employee.UserDepartment = data.GetProperty("userDepartment").ToString();
            employee.UserPhoneNum = Convert.ToInt32(data.GetProperty("userPhoneNum").GetInt32());
            employee.UserRole = data.GetProperty("userRole").ToString();
            employee.UserRoleGroupDesc = data.GetProperty("userRoleGroupDesc").ToString();
            employee.ManagerFname = data.GetProperty("managerFname").ToString();
            employee.ManagerLName = data.GetProperty("managerLName").ToString();
            employee.ManagerEmail = data.GetProperty("managerEmail").ToString();
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
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{

        //}



    }
}
