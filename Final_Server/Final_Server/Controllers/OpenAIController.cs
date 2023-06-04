using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAIController : ControllerBase
    {
        // GET: api/<OpenAIController>
        [HttpGet]
        public OpenAI GetDetails()
        {
            try
            {
                return OpenAI.ReadDetails();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET api/<OpenAIController>/5
        [HttpGet("{query}")]
        public List<Object> GetTableData(string query)
        {
            try
            {
                string output = query.Replace("\n", " ").Replace("\"", "").Replace("\\", "");
                return OpenAI.ReadsqlCommand(output);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //// POST api/<OpenAIController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<OpenAIController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<OpenAIController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
