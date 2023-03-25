namespace Final_Server.Models
{
    public class Rel_EmployeeGoal
    {
        string userEmail;
        int goalNum;
        DateTime goalCreateDate = new DateTime();
        string goalStatus;

        public string UserEmail { get => userEmail; set => userEmail = value; }
        public int GoalNum { get => goalNum; set => goalNum = value; }
        public DateTime GoalCreateDate { get => goalCreateDate; set => goalCreateDate = value; }
        public string GoalStatus { get => goalStatus; set => goalStatus = value; }

        public int InsertEmployeeGoal() //insert new employee goal 
        {
            DBservices tmp = new DBservices();
            return tmp.InsertEmployeeGoal(this);
        }
    }
}
