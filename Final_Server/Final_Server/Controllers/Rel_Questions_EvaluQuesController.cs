using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Rel_Questions_EvaluQuesController : ControllerBase
    {
        // GET: api/<Rel_Questions_EvaluQuesController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        [HttpGet("/quesType/roleGroup_Type")]
        public IEnumerable<Object> GetEvaluQuesByType(bool quesType, int roleGroup_Type) //gets the all the EvaluQues that fit the QuesType and RoleType
        {
            try
            {
                return Rel_Questions_EvaluQues.ReadEvaluQuesByType(quesType, roleGroup_Type);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/questionnaireNum")]
        public IEnumerable<Object> GetQuesByEvaluId(int questionnaireNum) //gets the questions that part of this corrent evaluQues
        {
            try
            {
                return Rel_Questions_EvaluQues.ReadQuesByEvaluId(questionnaireNum);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET api/<Rel_Questions_EvaluQuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Rel_Questions_EvaluQuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Rel_Questions_EvaluQuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Rel_Questions_EvaluQuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
