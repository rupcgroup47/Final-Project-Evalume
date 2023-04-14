using System;

namespace Final_Server.Models
{
    public class EvaluationQues
    {
        int questionnaireNum;
        DateTime quesInsertDate = new DateTime();
        int roleType;
        DateTime quesLimitDate = new DateTime();
        int groupType;

        public int QuestionnaireNum { get => questionnaireNum; set => questionnaireNum = value; }
        public DateTime QuesInsertDate { get => quesInsertDate; set => quesInsertDate = value; }
        public int RoleType { get => roleType; set => roleType = value; }
        public int GroupType { get => groupType; set => groupType = value; }
        public DateTime QuesLimitDate { get => quesLimitDate; set => quesLimitDate = value; }

        //public Object getFitQues(bool quesType) //get all questions that fill the quesType
        //{
        //    DBservices dbs = new DBservices();
        //    return dbs.GetFitQues(quesType);
        //}

        //static public int insertNewForm(dynamic newForm)
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        return dbs.InserEvaluationQues(newForm);
        //        //return dbs.insertNewForm(newForm);
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}
    }
}


