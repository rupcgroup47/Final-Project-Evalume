﻿using Final_Server.Models;
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
        public IActionResult Post([FromBody] JsonElement data) //Insert new user
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
            MailAddress addr = new MailAddress(employee.UserEmail);
            employee.Userpassword = addr.User+"555";
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
        [HttpPut("{userNum}")]
        public IActionResult PutUserDetails(int userNum,[FromBody] JsonElement data) //Update user details
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
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }



    }
}
