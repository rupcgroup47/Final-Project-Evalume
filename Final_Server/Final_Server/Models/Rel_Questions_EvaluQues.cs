using System.Diagnostics;

namespace Final_Server.Models
{
    public class Rel_Questions_EvaluQues
    {
        //EvaluationQues fields
        int questionnaireNum;
        int quesInsertDate;
        bool quesType;
        DateTime quesLimitDate = new DateTime();
        int roleGroup_Type;
        int evalu_Part_Type;

        //Questions fields
        int questionNum;
        string quesContent;
        //DateTime insert_date = new DateTime();
        int quesGroup_ID;
        string quesGroup_Desc;
        bool groupType; //define if the quesGroup belongs to employee or manager

        int numericAnswer;
        string verbalAnswer;

        //Employee Fildes
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

        //Goals fields
        int goalNum;
        DateTime goalCreateDate = new DateTime();
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
        public int Evalu_Part_Type { get => evalu_Part_Type; set => evalu_Part_Type = value; }
        public int NumericAnswer { get => numericAnswer; set => numericAnswer = value; }
        public string VerbalAnswer { get => verbalAnswer; set => verbalAnswer = value; }
        public int GoalNum { get => goalNum; set => goalNum = value; }
        public DateTime GoalCreateDate { get => goalCreateDate; set => goalCreateDate = value; }

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
                        id = item.QuestionnaireNum,
                        year = item.QuesInsertDate,

                    });
                }
                return EvaleQuesList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static List<Object> ReadEmployeeStatus(int userNum) //gets the employee status under a manager
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetEmployeeStatus(userNum);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static List<Object> ReadEvaluQuesByUserNum(int userNum) // get the right evaluations of a user by his user number
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetEvaluQuesByUserNum(userNum);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Object ReadQuesByEvaluId(int questionnaireNum) //gets the questions that part of this corrent evaluQues
        {
            try
            {
                DBservices dbs = new DBservices();
                List<Rel_Questions_EvaluQues> tempQustionList = dbs.GetQuesByEvaluId(questionnaireNum);
                int counter = 0;
                int currentNumber = 0;
                List<int> quesTypeOptions = new List<int>();
                foreach (Rel_Questions_EvaluQues item in tempQustionList)
                {
                    if (currentNumber != item.QuesGroup_ID)
                    {
                        currentNumber = item.QuesGroup_ID;
                        quesTypeOptions.Add(currentNumber);
                        counter++;
                    }
                }
                List<Object> QuestionsList = new List<Object>();
                for (int i = 0; i < counter; i++)
                {
                    List<Rel_Questions_EvaluQues> tmpList = new List<Rel_Questions_EvaluQues>();
                    foreach (Rel_Questions_EvaluQues item in tempQustionList)
                    {
                        if (item.QuesGroup_ID == quesTypeOptions[i])
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
                        QuesGroup_ID = tmpList[0].QuesGroup_ID,
                        QuesGroup_Desc = tmpList[0].QuesGroup_Desc,
                        Questions = Questions,
                    });
                }
                Object evaleQuesObject = (new
                {
                    QuestionnaireNum = tempQustionList[0].QuestionnaireNum,
                    QuestionsList = QuestionsList,
                });

                return evaleQuesObject;
            }
            catch (Exception)
            {
                throw;
            }

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

        public static Object ReadEvaluQuesByUserId(int userNum, int evalu_Part_Type) //get the appropriate EvaluQues for the current employee
        {
            try
            {
                DBservices dbs = new DBservices();
                List<Rel_Questions_EvaluQues> tempQustionList = dbs.GetEvaluQuesByUserId(userNum, evalu_Part_Type);
                if (tempQustionList.Count == 1)
                {
                    return (new
                    {
                        questionnaireNum = tempQustionList[0].QuestionnaireNum,
                    });
                }
                else
                {
                    int counter = 0;
                    int currentNumber = 0;
                    List<int> quesTypeOptions = new List<int>();
                    foreach (Rel_Questions_EvaluQues item in tempQustionList)
                    {
                        if (currentNumber != item.QuesGroup_ID)
                        {
                            currentNumber = item.QuesGroup_ID;
                            quesTypeOptions.Add(currentNumber);
                            counter++;
                        }
                    }
                    List<Object> QuestionsList = new List<Object>();
                    for (int i = 0; i < counter; i++)
                    {
                        List<Rel_Questions_EvaluQues> tmpList = new List<Rel_Questions_EvaluQues>();
                        foreach (Rel_Questions_EvaluQues item in tempQustionList)
                        {
                            if (item.QuesGroup_ID == quesTypeOptions[i])
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
                            QuesGroup_ID = tmpList[0].QuesGroup_ID,
                            QuesGroup_Desc = tmpList[0].QuesGroup_Desc,
                            Questions = Questions,
                        });

                    }

                    Object FinalObject = (new
                    {
                        UserNum = tempQustionList[0].UserNum,
                        UserManagerNum = tempQustionList[0].UserManagerNum,
                        QuestionnaireNum = tempQustionList[0].QuestionnaireNum,
                        QuestionsList = QuestionsList
                    });

                    return FinalObject;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        static public int insertNewAnswers(int userNum, int evalu_Part_Type, int questionnaireNum, List<(int questionNum, int numericAnswer, string verbalAnswer)> answersList) //Insert the EvaluQues details, filled by employee or manager (Evalu parts = 0 or 1)
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.InserEvaluationAnswers(userNum, evalu_Part_Type, questionnaireNum, answersList);
            }
            catch (Exception)
            {

                throw;
            }
        }


        static public int insertNewSummeryAnswers(int userNum, int evalu_Part_Type, int questionnaireNum, string managerOpinion, string employeeOpinion, List<int> goalsList) //Insert the EvaluQues details, filled by employee or manager (Evalu parts = 0 or 1)
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.InserEvaluationSummeryAnswers(userNum, evalu_Part_Type, questionnaireNum, managerOpinion, employeeOpinion, goalsList);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

