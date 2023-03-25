namespace Final_Server.Models
{
    public class Goal
    {
        int goalNum;
        string goalName;
        bool is_Active;

        public int GoalNum { get => goalNum; set => goalNum = value; }
        public string GoalName { get => goalName; set => goalName = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }


        public static List<Goal> ReadGoals() //Get all goals
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllGoals();
        }

        public int InsertGoal() //Insert new goal
        {
            DBservices dbs = new DBservices();
            return dbs.InsertGoal(this);
        }
    }
}
