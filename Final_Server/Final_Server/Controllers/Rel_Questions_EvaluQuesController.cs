﻿using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class Rel_Questions_EvaluQuesController : ControllerBase
    {

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


        //// POST api/<Rel_Questions_EvaluQuesController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        [HttpGet("/userNum")]
        public IEnumerable<Object> GetEvaluQuesByUserId(int userNum) //get the appropriate EvaluQues for the current employee
        {
            try
            {
                return Rel_Questions_EvaluQues.ReadEvaluQuesByUserId(userNum);
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

                int numEffected = Rel_Questions_EvaluQues.insertNewForm(newForm);

                if (numEffected != 0)
                {
                    return Ok("Evaluation succesfully inserted");
                }
                else
                {
                    return NotFound("Error in insert this Evaluation");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        //// PUT api/<Rel_Questions_EvaluQuesController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<Rel_Questions_EvaluQuesController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}