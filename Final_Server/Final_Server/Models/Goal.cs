namespace Final_Server.Models
{
    public class Goal
    {
        int goalNum;
        string goalName;
        bool is_Active;
        int goalGroup_Type;
        string goalGroup_Desc;
        DateTime goalCreateDate = new DateTime();
        string goalStatus;



        public int GoalNum { get => goalNum; set => goalNum = value; }
        public string GoalName { get => goalName; set => goalName = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }
        public int GoalGroup_Type { get => goalGroup_Type; set => goalGroup_Type = value; }
        public string GoalGroup_Desc { get => goalGroup_Desc; set => goalGroup_Desc = value; }
        public DateTime GoalCreateDate { get => goalCreateDate; set => goalCreateDate = value; }
        public string GoalStatus { get => goalStatus; set => goalStatus = value; }

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

        public static List<Object> Read(int userNum) //Get all the questions that posed by the current manager
        {
            DBservices dbs = new DBservices();
            List<Object> list = dbs.GetGoals(userNum);

            List<Goal> GoalsList = new List<Goal>();
            int catchID = 1;

            for (int i = 0; i < list.Count; i++)
            {
                if(catchID == (list[i].GoalNum))
                {
                    GoalsList.Add(new {
                        GoalCreateDate = list[i].GoalCreateDate,
                        UserManagerNum = list[i].UserManagerNum,
                        UserNum = list[i].UserNum,
                        UserFName = list[i].UserFName,
                        UserLName = list[i].UserLName,
                        GoalStatus = list[i].GoalStatus


                    });


                }
            }
            
            return list;
        }
    }
}
