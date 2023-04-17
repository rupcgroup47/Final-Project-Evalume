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
        public IEnumerable<Rel_Goal_Employee> Get() //get all corent user goals
        {
            return Rel_Goal_Employee.ReadAllUserGoals();
        }


        // GET api/<Rel_Goal_EmployeeController>/5
        [HttpGet("/userManager")]
        public IEnumerable<Object> GetManagerGoals(int userManager) //get all users goals that under this corent manager
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
        public IActionResult Post([FromBody] int userNum, int goalNum, string goalStatus) //Insert new goal to user
        {
            Rel_Goal_Employee goal= new Rel_Goal_Employee();
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
        [HttpPut("/goalNum/goal_Is_Active")]
        public IActionResult PutIsActive(int userNum, int goalNum, string goalStatus) //Update goal feild "is_active" to specific user
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



        // DELETE api/<Rel_Goal_EmployeeController>/5
        [HttpDelete("/goalNum")]
        public IActionResult Delete(int goalNum) //delete goal that connected to users
        {
            Rel_Goal_Employee goal = new Rel_Goal_Employee();
            int numEffected = goal.DeleteGoal(goalNum);
            if (numEffected != 0)
            {
                return Ok("Goal succesfully deleted");
            }
            else
            {
                return NotFound("We couldnt delete your Goal");
            }
        }



    }
}
