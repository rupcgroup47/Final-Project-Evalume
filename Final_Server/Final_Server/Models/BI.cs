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

        public static List<Object> ReadNumOfEmployees() //gets the num of employees in each dep
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetNumOfEmployees();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Object ReadNumOfManagers() //gets the num of employees in each dep
        {
            try
            {
                DBservices dbs = new DBservices();
                Object bi = new Object();

                bi = dbs.GetNumOfManagers();

                return bi;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public static Object ReadNumOfDeps() //gets the num of employees in each dep
        {
            try
            {
                DBservices dbs = new DBservices();
                Object bi = new Object();

                bi = dbs.GetNumOfDeps();

                return bi;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static List<Object> ReadNumOfGoalsStatuses() //gets the num of goals per status
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetGoalsStatuses();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public static List<Object> ReadGoalsStatus()  //gets the status of specific goal
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetGoalStatus();
            }
            catch (Exception)
            {
                throw;
            }
        }

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

        //KPI
        public static Object ReadNumOfUserGoals(int userNum) //gets the goals per user
        {
            try
            {
                DBservices dbs = new DBservices();
                Object bi = new Object();

                bi = dbs.GetNumOfUserGoals(userNum);

                return bi;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //KPI
        public static Object ReadNumOfUserEvlauQues(int userNum) //get the num of evaluQues for this userNum
        {
            try
            {
                DBservices dbs = new DBservices();
                Object bi = new Object();

                bi = dbs.GetNumOfUserEvlauQues(userNum);

                return bi;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

