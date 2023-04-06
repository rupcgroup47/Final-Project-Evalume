namespace Final_Server.Models
{
    public class Question
    {
        int questionNum;
        string quesContent;
        DateTime insert_date = new DateTime();
        bool is_Active;
        int quesGroup_Type;

        public int QuestionNum { get => questionNum; set => questionNum = value; }
        public string QuesContent { get => quesContent; set => quesContent = value; }
        public DateTime Insert_date { get => insert_date; set => insert_date = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }
        public int QuesGroup_Type { get => quesGroup_Type; set => quesGroup_Type = value; }

        public static List<Question> ReadQuestions() //Get all Questions
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllQuestions();
        }

        public int InsertQuestion() //Insert new goal
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

        public int DeleteQuestion(int QuestionNum) //Delete qustion
        {
            DBservices tmp = new DBservices();

            return tmp.DeleteQues(QuestionNum);
        }
    }
}
