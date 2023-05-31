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
        //[HttpGet("/Num_Of_Employees")]
        //public IEnumerable<Object> GetNumOfEmployeesInDep() //gets the num of employees in each dep
        //{
        //    try
        //    {
        //        return BI.ReadNumOfEmployees();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //[HttpGet("/Num_Of_Managers")]
        //public Object GetNumOfManagers() //gets the num of managers
        //{
        //    try
        //    {
        //        return BI.ReadNumOfManagers();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //[HttpGet("/Num_Of_Deps")]
        //public Object GetNumOfDeps() //gets the num of managers
        //{
        //    try
        //    {
        //        return BI.ReadNumOfDeps();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        //[HttpGet("/Num_Goals_Statuses")]
        //public IEnumerable<Object> GetNumOfGoalsStatuses() //gets the num of goals per status
        //{
        //    try
        //    {
        //        return BI.ReadNumOfGoalsStatuses();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        [HttpGet("/Goal_Status")]
        public IEnumerable<Object> GetGoalsStatus(int goalYear) //gets the status of specific goal
        {
            try
            {
                return BI.ReadGoalsStatus(goalYear);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/AvgAnswersByYear")]
        public IEnumerable<Object> GetAvgAnsByYears() //get the questions avg answer according to the question group type soeted by department and changes by the year the client chose
        {
            try
            {
                return BI.ReadEmployeesAvgAnswersByYear();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/Avg_Answers")]
        public IEnumerable<Object> GetAvgAnsPerQuesGroup(int answerYear) //get the questions avg answer according to the question group type soeted by department and changes by the year the client chose
        {
            try
            {
                return BI.ReadAvgAnsPerQuesGroup(answerYear);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("/Evaluation_Process_Status")]
        public IEnumerable<Object> GetEvaluProcessStatus() //gets how many employees are in each part of the evaluation process for the current year soted by departments
        {
            try
            {
                return BI.ReadEvaluProcessStatus();
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

        //[HttpGet("/Employees_Goals_By_Year")]
        //public IEnumerable<Object> GetGoalsStatusByManagerNumNyear(int userNum, int goalYear) //get all goals statuses of the employees under this manager num, by the selected year
        //{
        //    try
        //    {
        //        return BI.ReadGoalsStatusByManagerNumNyear(userNum, goalYear);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        //[HttpGet("/Num_Of_User's_Goals")]
        //public Object GetNumOfUserGoals(int userNum) //gets the goals per user
        //{
        //    try
        //    {
        //        return BI.ReadNumOfUserGoals(userNum);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //[HttpGet("/Num_Of_User's_EvlauQues")]
        //public Object GetNumOfUserEvlauQues(int userNum) //get the num of evaluQues for this userNum
        //{
        //    try
        //    {
        //        return BI.ReadNumOfUserEvlauQues(userNum);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

    }
}
