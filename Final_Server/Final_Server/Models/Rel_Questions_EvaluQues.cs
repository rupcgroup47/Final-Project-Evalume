using System.Diagnostics;

namespace Final_Server.Models
{
    public class Rel_Questions_EvaluQues
    {
        int questionnaireNum;
        int quesInsertDate;
        bool quesType;
        DateTime quesLimitDate = new DateTime();
        int roleGroup_Type;

        int questionNum;
        string quesContent;
        //DateTime insert_date = new DateTime();
        int quesGroup_ID;
        string quesGroup_Desc;
        bool groupType;

        string userEmail;
        int userNum;
        string userFName;
        string userLName;
        bool is_Admin;
        bool userType;
        int userRoleGroup;
        string userDepartment;
        int userManagerNum;
        string managerFname;
        string managerLName;
        string managerEmail;
        string userRoleGroupDesc;

        public int QuestionnaireNum { get => questionnaireNum; set => questionnaireNum = value; }

        public bool QuesType { get => quesType; set => quesType = value; }

        public int RoleGroup_Type { get => roleGroup_Type; set => roleGroup_Type = value; }
        public int QuestionNum { get => questionNum; set => questionNum = value; }
        public string QuesContent { get => quesContent; set => quesContent = value; }
        public string QuesGroup_Desc { get => quesGroup_Desc; set => quesGroup_Desc = value; }
        public bool GroupType { get => groupType; set => groupType = value; }
        public string UserEmail { get => userEmail; set => userEmail = value; }
        public int UserNum { get => userNum; set => userNum = value; }
        public string UserFName { get => userFName; set => userFName = value; }
        public string UserLName { get => userLName; set => userLName = value; }
        public bool Is_Admin { get => is_Admin; set => is_Admin = value; }
        public bool UserType { get => userType; set => userType = value; }
        public int UserRoleGroup { get => userRoleGroup; set => userRoleGroup = value; }
        public string UserDepartment { get => userDepartment; set => userDepartment = value; }
        public int UserManagerNum { get => userManagerNum; set => userManagerNum = value; }
        public string ManagerFname { get => managerFname; set => managerFname = value; }
        public string ManagerLName { get => managerLName; set => managerLName = value; }
        public string ManagerEmail { get => managerEmail; set => managerEmail = value; }
        public string UserRoleGroupDesc { get => userRoleGroupDesc; set => userRoleGroupDesc = value; }
        public int QuesGroup_ID { get => quesGroup_ID; set => quesGroup_ID = value; }

        public DateTime QuesLimitDate { get => quesLimitDate; set => quesLimitDate = value; }
        public int QuesInsertDate { get => quesInsertDate; set => quesInsertDate = value; }

        public static List<Object> ReadEvaluQuesByType(bool quesType, int roleGroup_Type) //gets the all the EvaluQues that fit the QuesType and RoleType
        {
            try
            {
                DBservices dbs = new DBservices();
                List<Rel_Questions_EvaluQues> tempList = dbs.GetQuesByType(quesType, roleGroup_Type);

                List<Object> EvaleQuesList = new List<Object>();

                foreach (Rel_Questions_EvaluQues item in tempList)
                {
                    EvaleQuesList.Add(new
                    {
                        QuestionnaireNum = item.QuestionnaireNum,
                        QuesInsertDate = item.QuesInsertDate,

                    });
                }
                return EvaleQuesList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<Object> ReadQuesByEvaluId(int questionnaireNum) //gets the questions that part of this corrent evaluQues
        {
            DBservices dbs = new DBservices();
            List<Rel_Questions_EvaluQues> tempQustionList = dbs.GetQuesByEvaluId(questionnaireNum);
            var maxGroup = tempQustionList.Max(X => X.QuesGroup_ID);
            List<Object> QuestionsList = new List<Object>();
            for (int i = 1; i <= maxGroup; i++)
            {
                List<Rel_Questions_EvaluQues> tmpList = new List<Rel_Questions_EvaluQues>();
                foreach (Rel_Questions_EvaluQues item in tempQustionList)
                {
                    if (item.QuesGroup_ID == i)
                    {
                        tmpList.Add(item);
                    }
                }

                List<Object> Questions = new List<Object>();

                foreach (Rel_Questions_EvaluQues item in tmpList)
                {
                    Questions.Add(new
                    {
                        QuestionNum = item.QuestionNum,
                        QuesContent = item.QuesContent,

                    });
                }

                QuestionsList.Add(new
                {
                    QuestionnaireNum = tmpList[0].QuestionnaireNum,
                    QuesGroup_ID = tmpList[0].QuesGroup_ID,
                    QuesGroup_Desc = tmpList[0].QuesGroup_Desc,
                    Questions = Questions,
                });
            }

            return QuestionsList;
        }

        static public int insertNewForm(dynamic newForm)
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.InserEvaluationQues(newForm);
                //return dbs.insertNewForm(newForm);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

