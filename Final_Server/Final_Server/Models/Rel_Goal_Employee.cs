namespace Final_Server.Models
{
    public class Rel_Goal_Employee
    {
        int goalNum;
        string goalName;
        int goalType;
        bool goal_Is_Active;
        string goalStatus;
        string goalGroup_Desc;
        DateTime goalCreateDate = new DateTime();

        int userNum;
        string userEmail;
        int userId;
        string userFName;
        string userLName;
        string userGender;
        string depName;
        int userPhoneNum;
        DateTime userInsertDate = new DateTime();
        bool is_Active;
        bool is_Admin;
        bool userType;
        string userRole;
        int userRoleGroup;
        string userDepartment;
        int userPhone;
        int userManager;

        public int GoalNum { get => goalNum; set => goalNum = value; }
        public string GoalName { get => goalName; set => goalName = value; }
        public int GoalType { get => goalType; set => goalType = value; }
        public bool Goal_Is_Active { get => goal_Is_Active; set => goal_Is_Active = value; }
        public int UserNum { get => userNum; set => userNum = value; }
        public string UserEmail { get => userEmail; set => userEmail = value; }
        public int UserId { get => userId; set => userId = value; }
        public string UserFName { get => userFName; set => userFName = value; }
        public string UserLName { get => userLName; set => userLName = value; }
        public string UserGender { get => userGender; set => userGender = value; }
        public int UserPhoneNum { get => userPhoneNum; set => userPhoneNum = value; }
        public DateTime UserInsertDate { get => userInsertDate; set => userInsertDate = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }
        public bool Is_Admin { get => is_Admin; set => is_Admin = value; }
        public bool UserType { get => userType; set => userType = value; }
        public string UserRole { get => userRole; set => userRole = value; }
        public int UserRoleGroup { get => userRoleGroup; set => userRoleGroup = value; }
        public string UserDepartment { get => userDepartment; set => userDepartment = value; }
        public int UserPhone { get => userPhone; set => userPhone = value; }
        public string GoalStatus { get => goalStatus; set => goalStatus = value; }
        public DateTime GoalCreateDate { get => goalCreateDate; set => goalCreateDate = value; }
        public string GoalGroup_Desc { get => goalGroup_Desc; set => goalGroup_Desc = value; }
        public string DepName { get => depName; set => depName = value; }
        public int UserManager { get => userManager; set => userManager = value; }

        public int InsertEmployeeGoal(int userNum, int goalNum, string goalStatus) //insert new goal to current employee
        {
            DBservices tmp = new DBservices();
            return tmp.InsertGoalToUser(userNum, goalNum, goalStatus);
        }

        public int UpdateGoalStatus(int userNum, int goalNum, string goalStatus) //Update goal status to specific user
        {
            DBservices tmp = new DBservices();
            return tmp.UpdateGoalStatus(userNum, goalNum, goalStatus);
        }

        public static List<Rel_Goal_Employee> ReadAllUserGoals() //Read all user (active + not active)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllUserGoals();

        }

        public int DeleteGoal(int goalNum) ////delete goal that connected to users
        {
            DBservices tmp = new DBservices();
            return tmp.DeleteGoal(goalNum);
        }


        public static List<Rel_Goal_Employee> ReadManagerGoals(int userManager)//get all users goals that under this corent manager
        {
            DBservices dbs = new DBservices();

            List<Rel_Goal_Employee> ManagerGoalsList = dbs.GetManagerGoals(userManager);
            return ManagerGoalsList;
        }
    }
}




