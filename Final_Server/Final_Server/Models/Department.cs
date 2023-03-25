using System.Data;

namespace Final_Server.Models
{
    public class Department
    {
        int depNum;
        string depName;
        bool is_Active;

        public int DepNum { get => depNum; set => depNum = value; }
        public string DepName { get => depName; set => depName = value; }
        public bool Is_Active { get => is_Active; set => is_Active = value; }



        //public DataTable ReadDepartments()
        //{
        //    DBservices dbs = new DBservices();
        //    DataTable dt = new DataTable();
        //    Department department = new Department();
        //    dt = dbs.GetDepartmentsDetails();
        //    return dt;
        //}

        public static List<Department> ReadDepartments() //get all departments
        {
            DBservices dbs = new DBservices();
            return dbs.GetDepartmentsDetails();

        }

        public int InsertDepartment() //Insert new department
        {
            DBservices dbs = new DBservices();
            return dbs.InsertDepartment(this);
        }
    }
}
