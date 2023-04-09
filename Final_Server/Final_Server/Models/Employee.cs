using System;

namespace Final_Server.Models
{
    public class Employee
    {
        string userEmail;
        string userpassword;
        int userNum;
        int userId;
        string userFName;
        string userLName;
        string userGender;
        DateTime userInsertDate = new DateTime();
        bool is_Active;
        bool is_Admin;
        bool userType;
        string userRole;
        int userRoleGroup;
        string userDepartment;
        int userPhoneNum;
        int userManagerNum;
        string managerFname;
        string managerLName;
        string managerEmail;
        string userRoleGroupDesc;


        static List<Employee> EmployeesList = new List<Employee>();

        public string UserEmail { get => userEmail; set => userEmail = value; }
        public string Userpassword { get => userpassword; set => userpassword = value; }
        public int UserNum { get => userNum; set => userNum = value; }
        public int UserId { get => userId; set => userId = value; }
        public string UserFName { get => userFName; set => userFName = value; }
        public string UserLName { get => userLName; set => userLName = value; }
        public string UserGender { get => userGender; set => userGender = value; }
        public DateTime UserInsertDate { get => userInsertDate; set => userInsertDate = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }
        public bool Is_Admin { get => is_Admin; set => is_Admin = value; }
        public bool UserType { get => userType; set => userType = value; }
        public string UserRole { get => userRole; set => userRole = value; }
        public int UserRoleGroup { get => userRoleGroup; set => userRoleGroup = value; }
        public string UserDepartment { get => userDepartment; set => userDepartment = value; }
        public int UserPhoneNum { get => userPhoneNum; set => userPhoneNum = value; }
        public int UserManagerNum { get => userManagerNum; set => userManagerNum = value; }
        public string ManagerFname { get => managerFname; set => managerFname = value; }
        public string ManagerLName { get => managerLName; set => managerLName = value; }
        public string ManagerEmail { get => managerEmail; set => managerEmail = value; }
        public string UserRoleGroupDesc { get => userRoleGroupDesc; set => userRoleGroupDesc = value; }

        public Employee Read(string userEmail, string userpassword) //get all user details that fit to the userEmail & userPassword
        {
            DBservices dbs = new DBservices();
            Employee employee = new Employee();
            employee = dbs.GetUserLoginDetails(userEmail, userpassword);
            return employee;
        }

        public static List<Employee> ReadEmployees() //Read all user (active + not active)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllUsers();
        }

        public int InsertEmployee() //Insert new user (Employee)
        {
            DBservices tmp = new DBservices();
            return tmp.InsertEmployee(this);
        }


        public int UpdateUserDetails(int userNum) //Update user datails
        {
            DBservices tmp = new DBservices();
            return tmp.UpdateUserDetails(this, userNum);
        }

        public int UpdateUserPassword(string userEmail, string userpassword) //Update user password
        {
            DBservices tmp = new DBservices();
            return tmp.UpdateUserPassword(userEmail, userpassword);
        }

        public int UpdateActive(int userNum, bool is_Active) //Update user feild "is_active"
        {
            DBservices tmp = new DBservices();

            return tmp.UpdateUserActive(userNum, is_Active);
        }
    }
}
