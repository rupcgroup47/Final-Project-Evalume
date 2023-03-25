using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Rel_EmployeeGoalController : ControllerBase
    {
        // GET: api/<Rel_EmployeeGoalController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<Rel_EmployeeGoalController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Rel_EmployeeGoalController>
        [HttpPost]
        public IActionResult Post([FromBody] Rel_EmployeeGoal rel_EmployeeGoal)
        {
            int numEffected = rel_EmployeeGoal.InsertEmployeeGoal();
            if (numEffected != 0)
            {
                return Ok("goal succesfully inserted");
            }
            else
            {
                return NotFound("Error in insert this goal");
            }
        }

        // PUT api/<Rel_EmployeeGoalController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Rel_EmployeeGoalController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
