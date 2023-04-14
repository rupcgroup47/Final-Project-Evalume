using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        // GET: api/<GoalController>
        [HttpGet]
        public IEnumerable<Goal> Get() //get all goals
        {
            return Goal.ReadGoals();
        }
        

        // GET api/<GoalController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<GoalController>
        [HttpPost]
        public IActionResult Post([FromBody] Goal goal) //insert new goal
        {
            int numEffected = goal.InsertGoal();
            if (numEffected != 0)
            {
                return Ok("goal succesfully inserted");
            }
            else
            {
                return NotFound("Error in insert this goal");
            }
        }

        // PUT api/<GoalController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GoalController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
