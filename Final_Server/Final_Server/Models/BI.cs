using System;

namespace Final_Server.Models
{
    public class BI
    {
        int depNum;
        string depName;
        int num_of_people;
        int num_of_manager;
        int num_of_dep;
        int goalNum;
        string goalName;
        string goalStatus;
        int num_of_statuses;
        int num_of_statuses_byGoal;
        int userNum;
        int evalu_Part_Type;
        int rounded_avg;
        int num_of_goals;
        int user_num_of_evaluQues;
        int goalYear;
        int total_Part_Answers;
        int answerYear;
        int quesGroup_Type;
        int avg_Answers;
        int totalAnswer;
        int userId;
        string userName;
        string quesGroup_Desc;

        public int DepNum { get => depNum; set => depNum = value; }
        public int Num_of_people { get => num_of_people; set => num_of_people = value; }
        public int Num_of_manager { get => num_of_manager; set => num_of_manager = value; }
        public int Num_of_dep { get => num_of_dep; set => num_of_dep = value; }
        public int GoalNum { get => goalNum; set => goalNum = value; }
        public string GoalName { get => goalName; set => goalName = value; }
        public string GoalStatus { get => goalStatus; set => goalStatus = value; }
        public int Num_of_statuses { get => num_of_statuses; set => num_of_statuses = value; }
        public int Num_of_statuses_byGoal { get => num_of_statuses_byGoal; set => num_of_statuses_byGoal = value; }
        public int UserNum { get => userNum; set => userNum = value; }
        public int Evalu_Part_Type { get => evalu_Part_Type; set => evalu_Part_Type = value; }
        public int Rounded_avg { get => rounded_avg; set => rounded_avg = value; }
        public string DepName { get => depName; set => depName = value; }
        public int Num_of_goals { get => num_of_goals; set => num_of_goals = value; }
        public int User_num_of_evaluQues { get => user_num_of_evaluQues; set => user_num_of_evaluQues = value; }
        public int GoalYear { get => goalYear; set => goalYear = value; }
        public int AnswerYear { get => answerYear; set => answerYear = value; }
        public int QuesGroup_Type { get => quesGroup_Type; set => quesGroup_Type = value; }
        public int Avg_Answers { get => avg_Answers; set => avg_Answers = value; }
        public int TotalAnswer { get => totalAnswer; set => totalAnswer = value; }
        public int Total_Part_Answers { get => total_Part_Answers; set => total_Part_Answers = value; }
        public int UserId { get => userId; set => userId = value; }
        public string UserName { get => userName; set => userName = value; }
        public string QuesGroup_Desc { get => quesGroup_Desc; set => quesGroup_Desc = value; }

        //public static List<Object> ReadNumOfEmployees() //gets the num of employees in each dep
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        return dbs.GetNumOfEmployees();
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public static Object ReadNumOfManagers() //gets the num of employees in each dep
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        Object bi = new Object();

        //        bi = dbs.GetNumOfManagers();

        //        return bi;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        //public static Object ReadNumOfDeps() //gets the num of employees in each dep
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        Object bi = new Object();

        //        bi = dbs.GetNumOfDeps();

        //        return bi;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //public static List<Object> ReadNumOfGoalsStatuses() //gets the num of goals per status
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        return dbs.GetGoalsStatuses();
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        public static List<Object> ReadGoalsStatus(int goalYear)  //gets the status of specific goal
        {
            try
            {
                DBservices dbs = new DBservices();
                List<BI> tempNumList = dbs.GetGoalStatus(goalYear);
                List<Object> goalsList = new List<Object>();

                int counter = 0;
                int currentGoals = 0;
                List<int> goalsOptions = new List<int>();
                string[] statusNames = { "חדש", "בתהליך", "בוצע" };

                foreach (BI item in tempNumList)
                {
                    if (currentGoals != item.GoalNum)
                    {
                        currentGoals = item.GoalNum;
                        goalsOptions.Add(currentGoals);
                        counter++;
                    }
                }
                for (int j = 0; j < counter; j++)
                {
                    List<BI> tmpList = new List<BI>();
                    foreach (BI item1 in tempNumList)
                    {
                        if (item1.GoalNum == goalsOptions[j])
                        {
                            tmpList.Add(item1);
                        }
                    }

                    for (int i = 0; i < 3; i++)
                    {
                        int index = tmpList.FindIndex(x => x.GoalStatus == statusNames[i]);
                        goalsList.Add(new
                        {
                            GoalNum = tmpList[0].GoalNum,
                            GoalName = tmpList[0].GoalName,
                            GoalStatus = statusNames[i],
                            num_of_statuses_byGoal = (index != -1 ? tmpList[index].Num_of_statuses_byGoal : 0),
                        });
                    }

                }

                return goalsList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static List<Object> ReadAvgAnsPerQuesGroup(int answerYear)  //get the questions avg answer according to the department soeted by question group type and changes by the year the client choose
        {
            try
            {
                DBservices dbs = new DBservices();
                List<BI> tempNumList = dbs.GetAvgAnsPerQuesGroup(answerYear);
                List<Object> QuesGroupList = new List<Object>();

                int counter = 0;
                int currentQuesGroup = 0;
                List<int> QuesGroupOptions = new List<int>();

                foreach (BI item in tempNumList)
                {
                    if (currentQuesGroup != item.QuesGroup_Type)
                    {
                        currentQuesGroup = item.QuesGroup_Type;
                        QuesGroupOptions.Add(currentQuesGroup);
                        counter++;
                    }
                }
                for (int j = 0; j < counter; j++)
                {
                    List<BI> tmpList = new List<BI>();
                    foreach (BI item1 in tempNumList)
                    {
                        if (item1.QuesGroup_Type == QuesGroupOptions[j])
                        {
                            tmpList.Add(item1);
                        }
                    }


                    List<Object> groupsList = new List<Object>();

                    foreach (BI item2 in tmpList)
                    {
                        groupsList.Add(new
                        {
                            DepNum = item2.DepNum,
                            DepName = item2.DepName,
                            Avg_Answers = item2.Avg_Answers,
                        });
                    }

                    QuesGroupList.Add(new
                    {
                        QuesGroup = tmpList[0].QuesGroup_Type,
                        QuesGroup_Desc = tmpList[0].QuesGroup_Desc,
                        parts = groupsList
                    });
                }

                return QuesGroupList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static List<Object> ReadEvaluProcessStatus() //gets how many employees are in each part of the evaluation process for the current year
        {
            try
            {
                DBservices dbs = new DBservices();
                List<BI> tempNumList = dbs.GetEvaluProcessStatus();
                List<Object> depList = new List<Object>();

                int counter = 0;
                string currentDepartment = "";
                List<string> departmentOptions = new List<string>();

                foreach (BI item in tempNumList)
                {
                    if (currentDepartment != item.DepName)
                    {
                        currentDepartment = item.DepName;
                        departmentOptions.Add(currentDepartment);
                        counter++;
                    }
                }
                for (int j = 0; j < counter; j++)
                {
                    List<BI> tmpList = new List<BI>();
                    foreach (BI item1 in tempNumList)
                    {
                        if (item1.DepName == departmentOptions[j])
                        {
                            tmpList.Add(item1);
                        }
                    }

                    int counterEvaluPart = 0;
                    int currentNumber = 5;
                    List<int> evaluPartOptions = new List<int>();
                    List<Object> evaluPartsList = new List<Object>();

                    foreach (BI item2 in tmpList)
                    {
                        if (currentNumber != item2.Evalu_Part_Type)
                        {
                            currentNumber = item2.Evalu_Part_Type;
                            evaluPartOptions.Add(currentNumber);
                            counterEvaluPart++;
                        }
                    }
                    for (int i = 0; i < counterEvaluPart; i++)
                    {
                        List<BI> PartsList = new List<BI>();

                        foreach (BI item3 in tmpList)
                        {
                            if (item3.Evalu_Part_Type == evaluPartOptions[i])
                            {
                                PartsList.Add(item3);
                            }
                        }

                        List<Object> employees = new List<Object>();

                        foreach (BI item4 in PartsList)
                        {
                            employees.Add(new
                            {
                                userId = item4.UserId,
                                userName = item4.UserName,
                            });
                        }

                        evaluPartsList.Add(new
                        {
                            level = evaluPartOptions[i],
                            levelCount = PartsList.Count(),
                            employees = employees,

                        });
                    }

                    depList.Add(new
                    {
                        DepName = departmentOptions[j],
                        depCount = tmpList.Count(),
                        parts = evaluPartsList
                    });
                }

                return depList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static List<Object> ReadEmployeesAvgAnswersByYear() //get the total questions avg answer for the last 5 years from the current year
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetAvgAnsByYears();
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public static List<Object> ReadGoalsStatusByManagerNumNyear(int userNum, int goalYear) //get all goals statuses of the employees under this manager num, by the selected year
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        return dbs.GetGoalsManagerNumNyear(userNum, goalYear);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}



        //KPI
        public static List<Object> ReadEmployeeNManagerScore(int userNum) //get the avg score of the employee VS to the avg score of the manager by current year
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetEmployeeNManagerScore(userNum);
            }
            catch (Exception)
            {
                throw;
            }
        }

        ////KPI
        //public static Object ReadNumOfUserGoals(int userNum) //gets the goals per user
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        Object bi = new Object();

        //        bi = dbs.GetNumOfUserGoals(userNum);

        //        return bi;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        ////KPI
        //public static Object ReadNumOfUserEvlauQues(int userNum) //get the num of evaluQues for this userNum
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        Object bi = new Object();

        //        bi = dbs.GetNumOfUserEvlauQues(userNum);

        //        return bi;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
    }
}

