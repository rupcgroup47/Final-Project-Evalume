namespace Final_Server.Models
{
    public class Goal
    {
        int goalNum;
        string goalName;
        bool is_Active;
        //int goalGroup_Type;
        //string goalGroup_Desc;
        //DateTime goalCreateDate = new DateTime();
        //string goalStatus;


        public int GoalNum { get => goalNum; set => goalNum = value; }
        public string GoalName { get => goalName; set => goalName = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }
        //public int GoalGroup_Type { get => goalGroup_Type; set => goalGroup_Type = value; }
        //public string GoalGroup_Desc { get => goalGroup_Desc; set => goalGroup_Desc = value; }
        //public DateTime GoalCreateDate { get => goalCreateDate; set => goalCreateDate = value; }
        //public string GoalStatus { get => goalStatus; set => goalStatus = value; }

        public static List<Goal> ReadGoals() //Get all goals
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetAllGoals();
            }
            catch (Exception)
            {

                throw;
            }

        }

        public static int InsertGoal(string goalName, int goalActive) //Insert new goal
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.InsertGoal(goalName, goalActive);
            }
            catch (Exception)
            {

                throw;
            }

        }

        public static int UpdateGoalName(int goalNum, string goalName, int goalActive) //Update Goal Name
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.UpdateGoalName(goalNum, goalName, goalActive);
            }
            catch (Exception)
            {

                throw;
            }

        }

        //public static int UpdateGoalActive(int goalNum, int goalActive) //Update Goal Active
        //{
        //    try
        //    {
        //        DBservices dbs = new DBservices();
        //        return dbs.UpdateGoalActive(goalNum, goalActive);
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //}


    }
}
