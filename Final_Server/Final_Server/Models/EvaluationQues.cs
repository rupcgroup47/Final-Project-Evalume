using System;

namespace Final_Server.Models
{
    public class EvaluationQues
    {
        int questionnaireNum;
        DateTime quesInsertDate = new DateTime();
        bool quesType;
        DateTime quesLimitDate = new DateTime();
        int roleGroup_Type;

        public int QuestionnaireNum { get => questionnaireNum; set => questionnaireNum = value; }
        public DateTime QuesInsertDate { get => quesInsertDate; set => quesInsertDate = value; }
        public bool QuesType { get => quesType; set => quesType = value; }
        public int RoleGroup_Type { get => roleGroup_Type; set => roleGroup_Type = value; }
        public DateTime QuesLimitDate { get => quesLimitDate; set => quesLimitDate = value; }

        public Object getFitQues(bool quesType) //get all questions that fill the quesType
        {
            DBservices dbs = new DBservices();
            return dbs.GetFitQues(quesType);
        }
    }
}


