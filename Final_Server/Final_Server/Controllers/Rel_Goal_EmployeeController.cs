using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class Rel_Goal_EmployeeController : ControllerBase
    {
        // GET: api/<Rel_Goal_EmployeeController>
        [HttpGet]
        public IEnumerable<Object> Get(int userNum) //get all current user goals
        {
            try
            {
                return Rel_Goal_Employee.ReadAllUserGoals(userNum);
            }
            catch (Exception)
            {

                throw;
            }
        }


        // GET api/<Rel_Goal_EmployeeController>/5
        [HttpGet("/userManager")]
        public IEnumerable<Object> GetManagerGoals(int userManager) //get all users goals that under this current manager
        {
            try
            {
                return Rel_Goal_Employee.ReadManagerGoals(userManager);
            }
            catch (Exception)
            {

                throw;
            }

        }


        // POST api/<Rel_Goal_EmployeeController>
        [HttpPost("/userNum/goalNum/goalStatus")]
        public IActionResult Post(int userNum, int goalNum, [FromBody] string goalStatus) //Insert new goal to user
        {
            Rel_Goal_Employee goal = new Rel_Goal_Employee();
            int numEffected = goal.InsertEmployeeGoal(userNum, goalNum, goalStatus);
            if (numEffected != 0)
            {
                return Ok("Goal succesfully inserted");
            }
            else
            {
                return NotFound("Error in insert this Goal");
            }
        }



        // PUT api/<Rel_Goal_EmployeeController>/5
        [HttpPut("/userNum/{userNum}/goalNum/{goalNum}")]
        public IActionResult PutIsActive(int userNum, int goalNum, [FromBody] string goalStatus) //Update goal feild goalStatus to specific user
        {
            Rel_Goal_Employee goal = new Rel_Goal_Employee();
            int numEffected = goal.UpdateGoalStatus(userNum, goalNum, goalStatus);
            if (numEffected != 0)
            {
                return Ok("Goal succesfully updated");
            }
            else
            {
                return NotFound("We couldnt update your Goal");
            }
        }

    }
}
