using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BIController : ControllerBase
    {
        // GET: api/<BIController>
        [HttpGet("/Num_Of_Employees")]
        public IEnumerable<Object> GetNumOfEmployeesInDep() //gets the num of employees in each dep
        {
            try
            {
                return BI.ReadNumOfEmployees();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        [HttpGet("/Num_Of_Managers")]
        public Object GetNumOfManagers() //gets the num of managers
        {
            try
            {
                return BI.ReadNumOfManagers();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/Num_Of_Deps")]
        public Object GetNumOfDeps() //gets the num of managers
        {
            try
            {
                return BI.ReadNumOfDeps();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet("/Num_Goals_Statuses")]
        public IEnumerable<Object> GetNumOfGoalsStatuses() //gets the num of goals per status
        {
            try
            {
                return BI.ReadNumOfGoalsStatuses();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/Goal_Statuse")]
        public IEnumerable<Object> GetGoalsStatus() //gets the status of specific goal
        {
            try
            {
                return BI.ReadGoalsStatus();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet("/Score")]
        public IEnumerable<Object> GetEmployeeNManagerScore(int userNum) //get the avg score of the employee VS to the avg score of the manager by current year
        {
            try
            {
                return BI.ReadEmployeeNManagerScore(userNum);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/Num_Of_User's_Goals")]
        public Object GetNumOfUserGoals(int userNum) //gets the goals per user
        {
            try
            {
                return BI.ReadNumOfUserGoals(userNum);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/Num_Of_User's_EvlauQues")]
        public Object GetNumOfUserEvlauQues(int userNum) //get the num of evaluQues for this userNum
        {
            try
            {
                return BI.ReadNumOfUserEvlauQues(userNum);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET api/<BIController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BIController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BIController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BIController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
