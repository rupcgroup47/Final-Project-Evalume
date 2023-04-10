using System.Text.Json.Nodes;
using System.Text.RegularExpressions;

namespace Final_Server.Models
{
    public class Question
    {
        int questionNum;
        string quesContent;
        //DateTime insert_date = new DateTime();
        bool is_Active;
        int quesGroup_ID;
        string quesGroup_Desc;
        bool groupType;

        public int QuestionNum { get => questionNum; set => questionNum = value; }
        public string QuesContent { get => quesContent; set => quesContent = value; }
        //public DateTime Insert_date { get => insert_date; set => insert_date = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }
        public int QuesGroup_ID { get => quesGroup_ID; set => quesGroup_ID = value; }
        public string QuesGroup_Desc { get => quesGroup_Desc; set => quesGroup_Desc = value; }
        public bool GroupType { get => groupType; set => groupType = value; }

        public static List<Object> ReadQuestions() //Get all Questions
        {
            DBservices dbs = new DBservices();
            List<Question> tempQustionList = dbs.GetAllQuestions();
            var maxGroup = tempQustionList.Max(X => X.QuesGroup_ID);
            List<Object> QuestionsList = new List<Object>();
            for (int i = 1; i <= maxGroup; i++)
            {
                List<Question> tmpList = new List<Question>();
                foreach (Question item in tempQustionList)
                {
                    if (item.QuesGroup_ID == i)
                    {
                        tmpList.Add(item);
                    }
                }

                List<Object> Questions = new List<Object>();

                foreach (Question item in tmpList)
                {
                    Questions.Add(new
                    {
                        QuestionNum = item.QuestionNum,
                        QuesContent = item.QuesContent,
                        is_Active = item.Is_Active,
                    });
                }

                QuestionsList.Add(new
                {
                    QuesGroup_ID = tmpList[0].QuesGroup_ID,
                    QuesGroup_Desc = tmpList[0].QuesGroup_Desc,
                    GroupType = tmpList[0].GroupType,
                    Questions = Questions,
                });
            }

            return QuestionsList;
        }

        public int InsertQuestion() //Insert new Question
        {
            DBservices dbs = new DBservices();
            return dbs.InsertQuestion(this);
        }

        public int UpdateActive(int QuestionNum, bool Is_Active) //Update question feild "is_active"
        {
            DBservices tmp = new DBservices();

            return tmp.UpdateQuestionActive(QuestionNum, Is_Active);
        }

        public int UpdateQuestion(int QuestionNum, string QuesContent) //Update question descreption
        {
            DBservices tmp = new DBservices();

            return tmp.UpdateQuestion(QuestionNum, QuesContent);

        }

        //public int DeleteQuestion(int QuestionNum) //Delete qustion
        //{
        //    DBservices tmp = new DBservices();

        //    return tmp.DeleteQues(QuestionNum);
        //}
    }
}
