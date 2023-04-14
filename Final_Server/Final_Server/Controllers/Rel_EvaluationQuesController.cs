using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class Rel_EvaluationQuesController : ControllerBase
    {
        //// GET: api/<Rel_EvaluationQuesController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //[HttpGet("EvaluationQues")]
        //public Object getEvaluationQues()
        //{
        //    Rel_Evaluation_Ques Q = new Rel_Evaluation_Ques();
        //    return Q.GetEvaluationQues();
        //}

        //// GET api/<Rel_EvaluationQuesController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<Rel_EvaluationQuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        //[HttpPost]
        //[Route("/Evaluation")]
        //public int postEvaluation(JsonElement data) //insert new evalu_ques with the right ques
        //{
        //    List<Rel_Evaluation_Ques> QuesList = new List<Rel_Evaluation_Ques>();
        //    //string QuesType = data.GetProperty("Questionnaire Type").GetString();
        //    //string RoleGroup_Type = data.GetProperty("Role Group Type").GetString();

        //    int QuesType = Convert.ToByte(data.GetProperty("Questionnaire Type"));

        //    for (int i = 0; i < data.length; i++)
        //    {
        //        Rel_Evaluation_Ques q = new Rel_Evaluation_Ques();
        //        string QuesGroup_Type = data.GetProperty("QuesGroup_Type").GetString();
        //        string QuestionNum = data.GetProperty("QuestionNum").GetString();


        //        QuesList.Add(q);
        //    }

        //    return QuesList;
        //}

        //[HttpPost]
        //public IActionResult postEvaluation([FromBody] JsonElement data)
        //{
        //    // Parse the JSON payload into a JsonDocument object
        //    JsonDocument doc = JsonDocument.Parse(data.GetRawText());

        //    // Create a new dictionary to store the dynamic properties
        //    Dictionary<string, object> myObj = new Dictionary<string, object>();

        //    // Loop through the properties in the JSON document and add them to the dictionary
        //    foreach (JsonProperty prop in doc.RootElement.EnumerateObject())
        //    {
        //        myObj[prop.Name] = prop.Value.ToString();
        //    }

        //    // Do something with the dynamic object, e.g. save it to a database

        //    return Ok();
        //}

        // PUT api/<Rel_EvaluationQuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Rel_EvaluationQuesController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
