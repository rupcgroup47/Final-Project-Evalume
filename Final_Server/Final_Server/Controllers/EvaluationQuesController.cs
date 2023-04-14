using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text.Json;
using System.Text.Json.Nodes;

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

        //[HttpGet]
        //public Object Get(bool quesType) //get all questions that fit the quesType
        //{
        //    EvaluationQues e = new EvaluationQues();
        //    return e.getFitQues(quesType);
        //}



        // GET api/<EvaluationQuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EvaluationQuesController>
        [HttpPost]
        public IActionResult Post([FromBody] JsonElement data) // post a new evaluation form to the database
        {
            try
            {
                JsonDocument document = JsonDocument.Parse(data.ToString());
                JsonElement checkedArry = document.RootElement.GetProperty("myCheckedArray");
                List<int> questionList = new List<int>();
                foreach (JsonElement item in checkedArry.EnumerateArray())
                {
                    int[] numbers = item.GetProperty("questionNum").EnumerateArray().Select(x => x.GetInt32()).ToArray();
                    foreach (int number in numbers)
                    {
                        questionList.Add(number);
                    }
                }

                dynamic newForm = new ExpandoObject();
                newForm.roleType = Convert.ToInt32(data.GetProperty("myFormTypes").GetProperty("roleType").GetInt32());
                newForm.groupType = Convert.ToInt32(data.GetProperty("myFormTypes").GetProperty("groupType").GetInt32());
                newForm.questions = questionList.ToArray();

                int numEffected = EvaluationQues.insertNewForm(newForm);

                if (numEffected != 0)
                {
                    return Ok("Employee succesfully inserted");
                }
                else
                {
                    return NotFound("Error in insert this employee");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }



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
