using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationQuesController : ControllerBase
    {
        // GET: api/<EvaluationQuesController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        [HttpGet]
        public Object Get(bool quesType) //get all questions that fit the quesType
        {
            EvaluationQues e = new EvaluationQues();
            return e.getFitQues(quesType);
        }



        // GET api/<EvaluationQuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EvaluationQuesController>
        //[HttpPost]
        //public int Post(JsonElement data)
        //{
        //    bool QuesType = Convert.ToBoolean(data.GetProperty("QuesType").GetInt32());
        //    int RoleGroup_Type = Convert.ToInt32(data.GetProperty("RoleGroup_Type").GetInt32());
        //    JsonElement group = data.GetProperty("Ques_Group");
        //    string quesNum = group.GetProperty("QuesNum").ToString();


        //}



        // PUT api/<EvaluationQuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        //// DELETE api/<EvaluationQuesController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
