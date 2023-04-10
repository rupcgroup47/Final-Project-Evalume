using Final_Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Final_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        // GET: api/<QuestionController>
        [HttpGet]
        public IEnumerable<Object> Get() //get all questions
        {
            return Question.ReadQuestions();
        }


        // POST api/<QuestionController>
        [HttpPost]
        public IActionResult Post([FromBody] JsonElement data) //insert new question
        {
            Question question = new Question();
            question.QuesContent = data.GetProperty("quesContent").ToString();
            question.QuesGroup_Desc = data.GetProperty("quesGroup_Desc").ToString();
            int questionNum = question.InsertQuestion();
            if (questionNum != 0)
            {
                return Ok(questionNum);
            }
            else
            {
                return NotFound("Error in insert this question");
            }
        }


        // PUT api/<QuestionController>/5
        [HttpPut("/QuestionNum/Is_Active")]
        public IActionResult PutIsActive(int QuestionNum, bool Is_Active) //Update question feild "is_active"
        {
            Question question = new Question();
            int numEffected = question.UpdateActive(QuestionNum, Is_Active);
            if (numEffected != 0)
            {
                return Ok("question succesfully updated");
            }
            else
            {
                return NotFound("We couldnt update your question");
            }
        }



        [HttpPut("/QuestionNum/QuesContent")]
        public IActionResult PutQuesDesc(int QuestionNum, string QuesContent) //Update question descreption
        {
            Question question = new Question();
            int numEffected = question.UpdateQuestion(QuestionNum, QuesContent);
            if (numEffected != 0)
            {
                return Ok("Question succesfully updated");
            }
            else
            {
                return NotFound("We couldnt update your Question");
            }
        }



        // DELETE api/<QuestionController>/5
        [HttpDelete("/QuestionNum")]
        public IActionResult Delete(int QuestionNum) //Delete question
        {
            Question question = new Question();
            int numEffected = question.DeleteQuestion(QuestionNum);
            if (numEffected != 0)
            {
                return Ok("Question succesfully deleted");
            }
            else
            {
                return NotFound("We couldnt delete your Question");
            }

        }
    }
}
