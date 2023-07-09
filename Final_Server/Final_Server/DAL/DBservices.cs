using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using Final_Server.Models;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Xml.Linq;
using System.Text.Json.Nodes;
using System.Reflection.Metadata;
using Microsoft.VisualBasic;
using System.Data.SqlTypes;
using System.Data.Common;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{
    //public SqlDataAdapter da;
    //public DataTable dt;

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();
        string cStr = configuration.GetConnectionString("myProjDB");
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //-------------- Employee ---------------

    //--------------------------------------------------------------------------------------------------
    // This method get the loged in user details
    //--------------------------------------------------------------------------------------------------
    public Employee GetUserLoginDetails(string userEmail, string userpassword)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUserDetails("spGetUserDetails", con, userEmail, userpassword);            // create the command

        Employee employee = new Employee();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                employee.UserEmail = dataReader["UserEmail"].ToString();
                employee.UserNum = Convert.ToInt32(dataReader["UserNum"]);
                employee.UserId = Convert.ToInt32(dataReader["UserId"]);
                employee.UserFName = dataReader["UserFName"].ToString();
                employee.UserLName = dataReader["UserLName"].ToString();
                employee.UserGender = dataReader["UserGender"].ToString();
                employee.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]);
                employee.Is_Admin = Convert.ToBoolean(dataReader["Is_Admin"]);
                employee.UserType = Convert.ToBoolean(dataReader["UserType"]);
                employee.UserDepartment = dataReader["DepName"].ToString();
                employee.UserManagerNum = Convert.ToInt32(dataReader["UserManager"]);
                employee.UserPhoneNum = Convert.ToInt32(dataReader["UserPhoneNum"]);
                employee.UserRole = dataReader["UserRole"].ToString();
                employee.UserRoleGroupDesc = dataReader["RoleGroup_Desc"].ToString();
                employee.ManagerFname = dataReader["managerFname"].ToString();
                employee.ManagerLName = dataReader["managerLName"].ToString();
                employee.ManagerEmail = dataReader["managerEmail"].ToString();
                employee.Self_Evalu = Convert.ToInt32(dataReader["Self_Evalu"]);
            }

            return employee;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    ////---------------------------------------------------------------------------------
    //// Create the SqlCommand for get user details
    ////---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUserDetails(string spName, SqlConnection con, string userEmail, string userpassword)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserEmail", userEmail); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Userpassword", userpassword);


        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method gets all Users
    ////--------------------------------------------------------------------------------------------------
    public List<Employee> GetAllUsers()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetAllUsers", con);            // create the command

        List<Employee> UsersList = new List<Employee>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Employee employee = new Employee();
                employee.UserEmail = dataReader["UserEmail"].ToString();
                employee.UserNum = Convert.ToInt32(dataReader["UserNum"]);
                employee.UserId = Convert.ToInt32(dataReader["UserId"]);
                employee.UserFName = dataReader["UserFName"].ToString();
                employee.UserLName = dataReader["UserLName"].ToString();
                employee.UserGender = dataReader["UserGender"].ToString();
                employee.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]);
                employee.Is_Admin = Convert.ToBoolean(dataReader["Is_Admin"]);
                employee.UserType = Convert.ToBoolean(dataReader["UserType"]);
                employee.UserDepartment = dataReader["DepName"].ToString();
                employee.UserManagerNum = Convert.ToInt32(dataReader["UserManager"]);
                employee.UserPhoneNum = Convert.ToInt32(dataReader["UserPhoneNum"]);
                employee.UserRole = dataReader["UserRole"].ToString();
                employee.UserRoleGroupDesc = dataReader["RoleGroup_Desc"].ToString();
                employee.ManagerFname = dataReader["ManagerFname"].ToString();
                employee.ManagerLName = dataReader["ManagerLName"].ToString();
                employee.ManagerEmail = dataReader["managerEmail"].ToString();

                UsersList.Add(employee);
            }

            return UsersList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for get with no conditions
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGet(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        return cmd;
    }


    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new employee
    ////--------------------------------------------------------------------------------------------------
    public int InsertEmployee(Employee employee)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUser("spInsertUser", con, employee);            // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUser(String spName, SqlConnection con, Employee employee)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserEmail", employee.UserEmail); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Userpassword", employee.Userpassword);
        cmd.Parameters.AddWithValue("@UserId", employee.UserId);
        cmd.Parameters.AddWithValue("@UserFName", employee.UserFName);
        cmd.Parameters.AddWithValue("@UserLName", employee.UserLName);
        cmd.Parameters.AddWithValue("@UserGender", employee.UserGender);
        cmd.Parameters.AddWithValue("@Is_Active", employee.Is_Active);
        cmd.Parameters.AddWithValue("@Is_Admin", employee.Is_Admin);
        cmd.Parameters.AddWithValue("@UserType", employee.UserType);
        cmd.Parameters.AddWithValue("@UserRole", employee.UserRole);
        cmd.Parameters.AddWithValue("@userRoleGroupDesc", employee.UserRoleGroupDesc);
        cmd.Parameters.AddWithValue("@DepName", employee.UserDepartment);
        cmd.Parameters.AddWithValue("@UserPhoneNum", employee.UserPhoneNum);
        cmd.Parameters.AddWithValue("@ManagerFname", employee.ManagerFname);
        cmd.Parameters.AddWithValue("@ManagerLName", employee.ManagerLName);
        cmd.Parameters.AddWithValue("@ManagerEmail", employee.ManagerEmail);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method change "is_active" field by user email
    ////--------------------------------------------------------------------------------------------------
    public int UpdateUserActive(int userNum, bool is_Active)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUserActive("spUpdateUserActive", con, userNum, is_Active);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUserActive(String spName, SqlConnection con, int userNum, bool is_Active)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserNum", userNum); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Is_Active", is_Active);

        return cmd;
    }


    ////--------------------------------------------------------------------------------------------------
    //// This method saves the changes in user details
    ////--------------------------------------------------------------------------------------------------
    public int UpdateUserDetails(Employee employee, int userNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUpdateDetails("spUpdateUser", con, employee, userNum);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUpdateDetails(String spName, SqlConnection con, Employee employee, int userNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserEmail", employee.UserEmail); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@UserId", employee.UserId);
        cmd.Parameters.AddWithValue("@UserFName", employee.UserFName);
        cmd.Parameters.AddWithValue("@UserLName", employee.UserLName);
        cmd.Parameters.AddWithValue("@UserGender", employee.UserGender);
        cmd.Parameters.AddWithValue("@Is_Active", employee.Is_Active);
        cmd.Parameters.AddWithValue("@Is_Admin", employee.Is_Admin);
        cmd.Parameters.AddWithValue("@UserType", employee.UserType);
        cmd.Parameters.AddWithValue("@UserRole", employee.UserRole);
        cmd.Parameters.AddWithValue("@userRoleGroupDesc", employee.UserRoleGroupDesc);
        cmd.Parameters.AddWithValue("@DepName", employee.UserDepartment);
        cmd.Parameters.AddWithValue("@UserPhoneNum", employee.UserPhoneNum);
        cmd.Parameters.AddWithValue("@ManagerFname", employee.ManagerFname);
        cmd.Parameters.AddWithValue("@ManagerLName", employee.ManagerLName);
        cmd.Parameters.AddWithValue("@ManagerEmail", employee.ManagerEmail);
        cmd.Parameters.AddWithValue("@UserNum", userNum);

        return cmd;
    }
    ////--------------------------------------------------------------------------------------------------
    //// This method saves the changes in user password
    ////--------------------------------------------------------------------------------------------------
    public int UpdateUserPassword(string userEmail, string userpassword)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUpdatUserPass("spUpdateUserPassword", con, userEmail, userpassword);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUpdatUserPass(String spName, SqlConnection con, string userEmail, string userpassword)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserEmail", userEmail); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Userpassword", userpassword);

        return cmd;
    }


    //-------------- Department ---------------

    ////--------------------------------------------------------------------------------------------------
    //// This method gets all departments details
    ////--------------------------------------------------------------------------------------------------
    public List<Department> GetDepartmentsDetails()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetDepartments", con);            // create the command
                                                                          //DataTable dt = new DataTable();
        List<Department> DepList = new List<Department>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Department department = new Department();
                department.DepNum = Convert.ToInt32(dataReader["DepNum"]);
                department.DepName = dataReader["DepName"].ToString();
                department.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]);

                DepList.Add(department);
            }

            return DepList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new department
    ////--------------------------------------------------------------------------------------------------
    public int InsertDepartment(Department department)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPnewDep("spInsertDepartment", con, department);            // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPnewDep(String spName, SqlConnection con, Department department)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@DepName", department.DepName); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Is_Active", department.Is_Active);

        return cmd;
    }

    //-------------- Goal ---------------

    ////--------------------------------------------------------------------------------------------------
    //// This method gets all Goals
    ////--------------------------------------------------------------------------------------------------
    public List<Goal> GetAllGoals()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetAllGoals", con);            // create the command

        List<Goal> GoalsList = new List<Goal>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Goal goal = new Goal();
                goal.GoalNum = Convert.ToInt32(dataReader["GoalNum"]);
                goal.GoalName = dataReader["GoalName"].ToString();
                goal.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]);

                GoalsList.Add(goal);
            }

            return GoalsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new Goal
    ////--------------------------------------------------------------------------------------------------
    public int InsertGoal(string goalName, int goalActive)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPnewGoal("spInsertGoal", con, goalName, goalActive);            // create the command

        int numEffected = 0;
        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                numEffected = Convert.ToInt32(dataReader["GOALNUM"]);
            }

            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPnewGoal(String spName, SqlConnection con, string goalName, int goalActive)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@GoalName", goalName); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Is_Active", goalActive);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method update a Goal 
    ////--------------------------------------------------------------------------------------------------
    public int UpdateGoalName(int goalNum, string goalName, int goalActive)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGoalName("spUpdateGoalName", con, goalNum, goalName, goalActive);            // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGoalName(String spName, SqlConnection con, int goalNum, string goalName, int goalActive)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@GoalName", goalName); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@GoalNum", goalNum);
        cmd.Parameters.AddWithValue("@Goal_Active", goalActive);

        return cmd;
    }

    //////--------------------------------------------------------------------------------------------------
    ////// This method update Goal is_active feild
    //////--------------------------------------------------------------------------------------------------
    //public int UpdateGoalActive(int goalNum, int goalActive)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("myProjDB"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    cmd = CreateCommandWithSPGoalActive("spUpdateGoalActive", con, goalNum, goalActive);            // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}

    ////---------------------------------------------------------------------------------
    //// Create the SqlCommand using a stored procedure
    ////---------------------------------------------------------------------------------
    //private SqlCommand CreateCommandWithSPGoalActive(String spName, SqlConnection con, int goalNum, int goalActive)
    //{

    //    SqlCommand cmd = new SqlCommand(); // create the command object

    //    cmd.Connection = con;              // assign the connection to the command object

    //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

    //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

    //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

    //    cmd.Parameters.AddWithValue("@GOALNUM", goalNum); //insert all the parameters we got from the user
    //    cmd.Parameters.AddWithValue("@GOAL_ACTIVE", goalActive);

    //    return cmd;
    //}

    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new goal for corent user
    ////--------------------------------------------------------------------------------------------------
    public int InsertGoalToUser(int userNum, int goalNum, string goalStatus)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPNewUserGoal("spAddGoalToEmployee", con, userNum, goalNum, goalStatus);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPNewUserGoal(String spName, SqlConnection con, int userNum, int goalNum, string goalStatus)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@USERNUM", userNum);
        cmd.Parameters.AddWithValue("@GOALNUM", goalNum);  //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@GOALSTATUS", goalStatus);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method change goalStatus field by GoalNum for specific user
    ////--------------------------------------------------------------------------------------------------
    public int UpdateGoalStatus(int userNum, int goalNum, string goalStatus)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGoalStatus("spUpdateGoalStatus", con, userNum, goalNum, goalStatus);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGoalStatus(String spName, SqlConnection con, int userNum, int goalNum, string goalStatus)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@USERNUM", userNum);
        cmd.Parameters.AddWithValue("@GOALNUM", goalNum);  //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@GOALSTATUS", goalStatus);

        return cmd;
    }



    ////--------------------------------------------------------------------------------------------------
    //// This method gets all User Goals
    ////--------------------------------------------------------------------------------------------------
    public List<Object> GetAllUserGoals(int userNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetByUserNum("spGetUserGoals", con, userNum);            // create the command

        List<Object> UserGoalsList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Object goal = (new
                {
                    id = Convert.ToInt32(dataReader["GoalNum"]),
                    name = dataReader["GoalName"].ToString(),
                    date = dataReader["GoalCreateDate"].ToString(),
                    isDone = dataReader["GoalStatus"].ToString(),
                });

                UserGoalsList.Add(goal);
            }

            return UserGoalsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method get all users goals that under this current manager
    //--------------------------------------------------------------------------------------------------
    public List<Rel_Goal_Employee> GetManagerGoals(int userManager)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPManagerGoals("spGetAllManagerGoals", con, userManager);            // create the command

        List<Rel_Goal_Employee> ManagerGoalsList = new List<Rel_Goal_Employee>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Rel_Goal_Employee Managergoal = new Rel_Goal_Employee();

                Managergoal.UserNum = Convert.ToInt32(dataReader["UserNum"]);
                Managergoal.UserFName = dataReader["UserFName"].ToString();
                Managergoal.UserLName = dataReader["UserLName"].ToString();
                Managergoal.GoalNum = Convert.ToInt32(dataReader["GoalNum"]);
                Managergoal.GoalName = dataReader["GoalName"].ToString();
                Managergoal.GoalStatus = dataReader["GoalStatus"].ToString();
                Managergoal.GoalCreateDate = (dataReader["GoalCreateDate"].ToString());


                ManagerGoalsList.Add(Managergoal);
            }

            return ManagerGoalsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    ////---------------------------------------------------------------------------------
    //// Create the SqlCommand for get user details
    ////---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPManagerGoals(string spName, SqlConnection con, int userManager)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@USERMANASER", userManager); //insert all the parameters we got from the user

        return cmd;
    }


    //-------------- Question ---------------

    ////--------------------------------------------------------------------------------------------------
    //// This method gets all Questions
    ////--------------------------------------------------------------------------------------------------
    public List<Question> GetAllQuestions()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetAllQuestions", con);            // create the command

        List<Question> QuestionsList = new List<Question>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);

            while (dataReader.Read())
            {
                Question Question = new Question();
                Question.QuesGroup_ID = Convert.ToInt32(dataReader["quesGroup_Type"]);
                Question.QuesGroup_Desc = dataReader["QuesGroup_Desc"].ToString();
                Question.GroupType = Convert.ToBoolean(dataReader["GroupType"]);
                Question.QuestionNum = Convert.ToInt32(dataReader["QuestionNum"]);
                Question.QuesContent = dataReader["QuesContent"].ToString();
                Question.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]);

                QuestionsList.Add(Question);
            }

            return QuestionsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new Question
    ////--------------------------------------------------------------------------------------------------
    public int InsertQuestion(Question question)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPnewQuestion("spInsertQuestion", con, question);            // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            int questionNum = 0;

            while (dataReader.Read())
            {
                questionNum = Convert.ToInt32(dataReader["questionNum"]); // execute the command
            }

            return questionNum;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for add new Question
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPnewQuestion(String spName, SqlConnection con, Question question)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@QuesContent", question.QuesContent); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@QuesGroup_Desc", question.QuesGroup_Desc);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method change "is_active" field by QuestionNum
    ////--------------------------------------------------------------------------------------------------
    public int UpdateQuestionActive(int QuestionNum, bool Is_Active)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPQuestionActive("spUpdateQuestionActive", con, QuestionNum, Is_Active);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPQuestionActive(String spName, SqlConnection con, int QuestionNum, bool Is_Active)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@QuestionNum", QuestionNum);
        cmd.Parameters.AddWithValue("@Is_Active", Is_Active);  //insert all the parameters we got from the user

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method update a Question in the Question table 
    //--------------------------------------------------------------------------------------------------
    public int UpdateQuestion(int QuestionNum, string QuesContent)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUpdateQuestion("spUpdateQuesContent", con, QuestionNum, QuesContent);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUpdateQuestion(String spName, SqlConnection con, int QuestionNum, string QuesContent)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@QuestionNum", QuestionNum);
        cmd.Parameters.AddWithValue("@QuesContent", QuesContent); //insert all the parameters we got from the user

        return cmd;
    }


    //-------------- EvaluationQues ---------------

    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new EvaluationQues
    ////--------------------------------------------------------------------------------------------------
    public int InserEvaluationQues(dynamic newForm)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        cmd = CreateCommandWithSPnewEvaluationQues("spInsertToPartOfTable", con, newForm);            // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for add new Question
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPnewEvaluationQues(String spName, SqlConnection con, dynamic newForm)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        var dt = new DataTable();
        dt.Columns.Add("Questions", typeof(int));
        int[] questions = newForm.questions;
        foreach (var question in questions)
        {
            dt.Rows.Add(question);
        }

        cmd.Parameters.AddWithValue("@QuesType", newForm.roleType); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@RoleGroup_Type", newForm.groupType);
        SqlParameter intListParam = new SqlParameter("@InputList", dt);
        intListParam.SqlDbType = SqlDbType.Structured;
        intListParam.TypeName = "IntList";
        cmd.Parameters.Add(intListParam);

        return cmd;
    }


    ////--------------------------------------------------------------------------------------------------
    //// This method gets the all the EvaluQues that fit the QuesType and RoleType
    ////--------------------------------------------------------------------------------------------------
    public List<Rel_Questions_EvaluQues> GetQuesByType(bool quesType, int roleGroup_Type)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetEvaluQuesByType("spGetEvaluQuesByType", con, quesType, roleGroup_Type);            // create the command

        List<Rel_Questions_EvaluQues> rel_Ques = new List<Rel_Questions_EvaluQues>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Rel_Questions_EvaluQues r = new Rel_Questions_EvaluQues();

                r.QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]);
                r.QuesInsertDate = Convert.ToInt32(dataReader["Ques_Insert_Year"]);

                rel_Ques.Add(r);
            }

            return rel_Ques;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for get with no conditions
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetEvaluQuesByType(String spName, SqlConnection con, bool quesType, int roleGroup_Type)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@QuesType", quesType); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@RoleGroup_Type", roleGroup_Type);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method gets the all the EvaluQues questions that fit the questionnaireNum
    ////--------------------------------------------------------------------------------------------------
    public List<Rel_Questions_EvaluQues> GetQuesByEvaluId(int questionnaireNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetQuesByEvaluId("spGetQuesByEvaluNum", con, questionnaireNum);            // create the command

        List<Rel_Questions_EvaluQues> rel_Ques = new List<Rel_Questions_EvaluQues>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Rel_Questions_EvaluQues r = new Rel_Questions_EvaluQues();

                r.QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]);
                r.QuestionNum = Convert.ToInt32(dataReader["QuestionNum"]);
                r.QuesContent = dataReader["QuesContent"].ToString();
                r.QuesGroup_ID = Convert.ToInt32(dataReader["QuesGroup_Type"]);
                r.QuesGroup_Desc = dataReader["QuesGroup_Desc"].ToString();

                rel_Ques.Add(r);
            }

            return rel_Ques;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw;
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for get with no conditions
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetQuesByEvaluId(String spName, SqlConnection con, int questionnaireNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@QuestionnaireNum", questionnaireNum); //insert all the parameters we got from the user


        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method gets the EvaluQues questions that fit the userNum in the evalu_Part_Type
    ////--------------------------------------------------------------------------------------------------
    public List<Rel_Questions_EvaluQues> GetEvaluQuesByUserId(int userNum, int evalu_Part_Type)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetUserEvaluQues("spCheckExistEvalu", con, userNum, evalu_Part_Type);            // create the command

        List<Rel_Questions_EvaluQues> rel_Ques = new List<Rel_Questions_EvaluQues>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                if (dataReader.FieldCount == 1)
                {
                    Rel_Questions_EvaluQues r = new Rel_Questions_EvaluQues();
                    r.QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]);

                    rel_Ques.Add(r);
                }
                if (dataReader.FieldCount > 1)
                {
                    Rel_Questions_EvaluQues r = new Rel_Questions_EvaluQues();

                    r.UserNum = Convert.ToInt32(dataReader["UserNum"]);
                    r.UserManagerNum = Convert.ToInt32(dataReader["UserManager"]);
                    r.QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]);
                    r.QuestionNum = Convert.ToInt32(dataReader["QuestionNum"]);
                    r.QuesContent = dataReader["QuesContent"].ToString();
                    r.QuesGroup_ID = Convert.ToInt32(dataReader["QuesGroup_Type"]);
                    r.QuesGroup_Desc = dataReader["QuesGroup_Desc"].ToString();

                    rel_Ques.Add(r);
                }
            }

            return rel_Ques;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw;
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for get with no conditions
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetUserEvaluQues(String spName, SqlConnection con, int userNum, int evalu_Part_Type)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserNum", userNum); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Evalu_Part_Type", evalu_Part_Type);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method gets the right evaluations of a user by his user number
    ////--------------------------------------------------------------------------------------------------
    public List<Object> GetEvaluQuesByUserNum(int userNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetByUserNum("spGetAllEvaluByUserNum", con, userNum);            // create the command

        List<Object> rel_Ques = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                if (dataReader.FieldCount == 1)
                {
                    Object obj = (new
                    {
                        Text = (dataReader["txt"]).ToString()
                    });

                    rel_Ques.Add(obj);
                    return rel_Ques;

                }
                if (dataReader.FieldCount > 1)
                {
                    Object obj = (new
                    {
                        id = Convert.ToInt32(dataReader["QuestionnaireNum"]),
                        year = dataReader["Ques_Insert_Year"].ToString()
                    });

                    rel_Ques.Add(obj);
                }
            }

            return rel_Ques;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw;
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new answers on the exists evaluQues
    ////--------------------------------------------------------------------------------------------------
    public int InserEvaluationAnswers(int userNum, int evalu_Part_Type, int questionnaireNum, List<(int questionNum, int numericAnswer, string verbalAnswer)> answersList)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        cmd = CreateCommandWithSPnewEvaluAnswers("spInsertEvaluQuesFilledDetails", con, userNum, evalu_Part_Type, questionnaireNum, answersList);            // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPnewEvaluAnswers(String spName, SqlConnection con, int userNum, int evalu_Part_Type, int questionnaireNum, List<(int questionNum, int numericAnswer, string verbalAnswer)> answersList)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        var dt = new DataTable();
        dt.Columns.Add("QuestionNum", typeof(int));
        dt.Columns.Add("NumericAnswer", typeof(int));
        dt.Columns.Add("VerbalAnswer", typeof(string));

        foreach (var answer in answersList)
        {
            dt.Rows.Add(answer.questionNum, answer.numericAnswer, answer.verbalAnswer);
        }

        cmd.Parameters.AddWithValue("@UserNum", userNum); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Evalu_Part_Type", evalu_Part_Type);
        cmd.Parameters.AddWithValue("@QuestionnaireNum", questionnaireNum);

        SqlParameter intListParam = new SqlParameter("@InputAnswers", dt);
        intListParam.SqlDbType = SqlDbType.Structured;
        intListParam.TypeName = "InputAnswers";
        cmd.Parameters.Add(intListParam);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new summery answers on the exists evaluQues
    ////--------------------------------------------------------------------------------------------------
    public int InserEvaluationSummeryAnswers(int userNum, int evalu_Part_Type, int questionnaireNum, string managerOpinion, string employeeOpinion, List<int> goalsList)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        cmd = CreateCommandWithSPnewSummeryAnswers("spInsertSummeryAnswersNGoals", con, userNum, evalu_Part_Type, questionnaireNum, managerOpinion, employeeOpinion, goalsList);            // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPnewSummeryAnswers(String spName, SqlConnection con, int userNum, int evalu_Part_Type, int questionnaireNum, string managerOpinion, string employeeOpinion, List<int> goalsList)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure



        var dt = new DataTable();
        dt.Columns.Add("GoalNum", typeof(int));


        foreach (int goal in goalsList)
        {
            dt.Rows.Add(goal);
        }

        cmd.Parameters.AddWithValue("@UserNum", userNum); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Evalu_Part_Type", evalu_Part_Type);
        cmd.Parameters.AddWithValue("@QuestionnaireNum", questionnaireNum);
        cmd.Parameters.AddWithValue("@ManagerOpinion", managerOpinion);
        cmd.Parameters.AddWithValue("@EmployeeOpinion", employeeOpinion);


        SqlParameter intListParam = new SqlParameter("@InputGoals", dt);
        intListParam.SqlDbType = SqlDbType.Structured;
        intListParam.TypeName = "InputGoals";
        cmd.Parameters.Add(intListParam);

        return cmd;

    }

    ////--------------------------------------------------------------------------------------------------
    //// This method post all the active evaluations selected by admin
    ////--------------------------------------------------------------------------------------------------
    public int InsertActive_Evaluation_Ques(List<(int questionNum, DateTime quesLimitDate)> evaluationsList)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        cmd = CreateCommandWithSPActive_Evaluation("spInsertActiveEvaluationsQeus", con, evaluationsList);            // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            Console.WriteLine(ex.Message);
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPActive_Evaluation(String spName, SqlConnection con, List<(int questionNum, DateTime quesLimitDate)> evaluationsList)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        var dt = new DataTable();
        dt.Columns.Add("QuestionnaireNum", typeof(int));
        dt.Columns.Add("QuesLimitDate", typeof(SqlDateTime));

        foreach (var evaluations in evaluationsList)
        {
            dt.Rows.Add(evaluations.questionNum, evaluations.quesLimitDate);
        }

        SqlParameter ListParam = new SqlParameter("@InputEvaluations", dt);
        ListParam.SqlDbType = SqlDbType.Structured;
        ListParam.TypeName = "InputEvaluations";
        cmd.Parameters.Add(ListParam);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method gets the employee status under a manager
    //--------------------------------------------------------------------------------------------------
    public List<Object> GetEmployeeStatus(int userNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetByUserNum("spCheckExistEvaluStep", con, userNum);            // create the command

        List<Object> EmployeeStatusList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Object users = (new
                {
                    UserNum = Convert.ToInt32(dataReader["UserNum"]),
                    UserFName = dataReader["UserFName"].ToString(),
                    UserLName = dataReader["UserLName"].ToString(),
                    AnswerInsertDate = dataReader["AnswerInsertDate"].ToString(),
                    QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]),
                    Evalu_Part_Type = Convert.ToInt32(dataReader["Evalu_Part_Type"])
                });

                EmployeeStatusList.Add(users);
            }

            return EmployeeStatusList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method gets the employee that needs to set a meeting
    //--------------------------------------------------------------------------------------------------
    public List<Object> GetEmployeeStatusMeeting(int userNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetByUserNum("spGetEmployeeMeetingToBeScheduled", con, userNum);            // create the command

        List<Object> EmployeeStatusList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Object users = (new
                {
                    UserNum = Convert.ToInt32(dataReader["UserNum"]),
                    UserFName = dataReader["UserFName"].ToString(),
                    UserLName = dataReader["UserLName"].ToString(),
                    UserEmail = dataReader["UserEmail"].ToString(),
                    Evalu_Part_Type = Convert.ToInt32(dataReader["Evalu_Part_Type"])
                });

                EmployeeStatusList.Add(users);
            }

            return EmployeeStatusList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    ////--------------------------------------------------------------------------------------------------
    //// This method gets all the Questionnaires
    ////--------------------------------------------------------------------------------------------------
    public List<Rel_Questions_EvaluQues> GetAllQuestionnaires()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetAllQuestionnaires", con);            // create the command
                                                                                //DataTable dt = new DataTable();
        List<Rel_Questions_EvaluQues> QuestionnairesList = new List<Rel_Questions_EvaluQues>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Rel_Questions_EvaluQues Questionnaire = new Rel_Questions_EvaluQues();
                Questionnaire.QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]);
                Questionnaire.QuesInsertDate = Convert.ToInt32(dataReader["yearInsert"]);
                Questionnaire.RoleGroup_Type = Convert.ToInt32(dataReader["RoleGroup_Type"]);
                Questionnaire.QuesType = Convert.ToBoolean(dataReader["QuesType"]);

                QuestionnairesList.Add(Questionnaire);
            }

            return QuestionnairesList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    ////---------------------------------------------------------------------------------
    //// Create the SqlCommand for get user details
    ////---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetByUserNum(string spName, SqlConnection con, int userNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@userNum", userNum); //insert all the parameters we got from the user

        return cmd;
    }


    //--------------------------------------------------------------------------------------------------
    // This method get the selected questionnaire PDF details
    //--------------------------------------------------------------------------------------------------
    public List<Rel_Questions_EvaluQues> GetPDFdetails(int userNum, int questionnaireNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetPDFdetails("spPDFdetails", con, userNum, questionnaireNum);            // create the command

        List<Rel_Questions_EvaluQues> answerslist = new List<Rel_Questions_EvaluQues>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Rel_Questions_EvaluQues r = new Rel_Questions_EvaluQues();

                r.Evalu_Part_Type = Convert.ToInt32(dataReader["Evalu_Part_Type"]);
                r.QuesGroup_Desc = dataReader["QuesGroup_Desc"].ToString();
                r.QuesGroup_ID = Convert.ToInt32(dataReader["QuesGroup_Type"]);
                r.QuestionNum = Convert.ToInt32(dataReader["QuestionNum"]);
                r.QuesContent = dataReader["QuesContent"].ToString();
                r.NumericAnswer = Convert.ToInt32(dataReader["NumericAnswer"]);
                r.VerbalAnswer = dataReader["VerbalAnswer"].ToString();
                r.ManagerOpinion = dataReader["ManagerOpinion"].ToString();
                r.EmployeeOpinion = dataReader["EmployeeOpinion"].ToString();
                r.OpinionInsertDate = (DateTime)dataReader["OpinionInsertDate"];

                answerslist.Add(r);
            }

            return answerslist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method get the selected header data of questionnaire PDF details
    //--------------------------------------------------------------------------------------------------
    public Rel_Questions_EvaluQues GetPDFdetailsHeader(int userNum, int questionnaireNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetPDFdetails("spPDFheader", con, userNum, questionnaireNum);            // create the command

        Rel_Questions_EvaluQues details = new Rel_Questions_EvaluQues();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                details.QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]);
                details.UserNum = Convert.ToInt32(dataReader["UserNum"]);
                details.UserFName = dataReader["UserFName"].ToString();
                details.UserLName = dataReader["UserLName"].ToString();
                details.UserRole = dataReader["UserRole"].ToString();
                details.UserDepartment = dataReader["UserDep"].ToString();
                details.UserManagerNum = Convert.ToInt32(dataReader["ManagerNum"]);
                details.ManagerFname = dataReader["ManagerFName"].ToString();
                details.ManagerLName = dataReader["ManagerLName"].ToString();
                details.ManagerRole = dataReader["ManagerRole"].ToString();
                details.ManagerDepartment = dataReader["ManagerDep"].ToString();
                //r.OpinionInsertDate = (DateTime)dataReader["OpinionInsertDate"];
            }

            return details;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for get with no conditions
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetPDFdetails(String spName, SqlConnection con, int userNum, int questionnaireNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserNum", userNum); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@QuestionnaireNum", questionnaireNum);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method Insert new final meeting by userNum
    ////--------------------------------------------------------------------------------------------------
    public int InsertMeeting(int userNum, string meetingDate)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPInserNewMeeting("spInsertNewFinalMeeting", con, userNum, meetingDate);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPInserNewMeeting(String spName, SqlConnection con, int userNum, string meetingDate)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserNum", userNum);
        cmd.Parameters.AddWithValue("@MeetingDate", meetingDate);  //insert all the parameters we got from the user

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method Get all meetings for employee
    ////--------------------------------------------------------------------------------------------------
    public List<Object> GetMeetings(int userNum, int userType)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetMeetings("spGetScheduledMeetingsByUserNum", con, userNum, userType);             // create the command
        List<Object> meetingsList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                meetingsList.Add(new
                {
                    id = Convert.ToInt32(dataReader["meetNum"]),
                    UserNum = Convert.ToInt32(dataReader["UserNum"]),
                    employeeName = (dataReader["employeeName"]).ToString(),
                    userManager = Convert.ToInt32(dataReader["userManager"]),
                    managerName = (dataReader["managerName"]).ToString(),
                    date = ((DateTime)dataReader["meetingDate"]).ToShortDateString(),
                    time = ((DateTime)dataReader["meetingDate"]).ToShortTimeString()
                });
            }

            return meetingsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetMeetings(String spName, SqlConnection con, int userNum, int userType)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserNum", userNum);
        cmd.Parameters.AddWithValue("@UserType", userType);  //insert all the parameters we got from the user

        return cmd;
    }

    //-------------- BI ---------------

    //--------------------------------------------------------------------------------------------------
    // This method get the questions avg answer according to the question group type soeted by department and changes by the year the client chose
    //--------------------------------------------------------------------------------------------------
    public List<Object> GetAvgAnsByYears()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("sp_GetEmployeesAvgAnswersByYear", con);            // create the command

        List<Object> biList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Object obj = (new
                {
                    Year = Convert.ToInt32(dataReader["Answers_Avg_Year"]),
                    AvgAnswer = Convert.ToInt32(dataReader["Year_Numeric_Avg"]),
                });

                biList.Add(obj);
            }

            return biList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method get the questions avg answer according to the department soeted by question group type and changes by the year the client choose
    //--------------------------------------------------------------------------------------------------
    public List<BI> GetAvgAnsPerQuesGroup(int answerYear)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetAvgAnsByYear("spGetAvgAnsPerQuesGroupType", con, answerYear);            // create the command

        List<BI> biList = new List<BI>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                BI bi = new BI();
                bi.DepNum = Convert.ToInt32(dataReader["DepNum"]);
                bi.DepName = dataReader["DepName"].ToString();
                bi.QuesGroup_Type = Convert.ToInt32(dataReader["QuesGroup_Type"]);
                bi.QuesGroup_Desc = dataReader["QuesGroup_Desc"].ToString();
                bi.Avg_Answers = Convert.ToInt32(dataReader["Avg_Answers"]);

                biList.Add(bi);
            }

            return biList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    ////---------------------------------------------------------------------------------
    //// Create the SqlCommand for get answers avg according to ques group type, by year
    ////---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetAvgAnsByYear(string spName, SqlConnection con, int answerYear)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@Year", answerYear);//insert all the parameters we got from the user

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method get the avg score of the employee VS to the avg score of the manager by current year
    //--------------------------------------------------------------------------------------------------
    public List<Object> GetEmployeeNManagerScore(int userNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetS("sp_GetEmployeeScoreVSManagerScore", con, userNum);            // create the command

        List<Object> scoreList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Object score = (new
                {
                    UserNum = Convert.ToInt32(dataReader["UserNum"]),
                    evalu_part_type = Convert.ToInt32(dataReader["evalu_part_type"]),
                    Rounded_avg = Convert.ToInt32(dataReader["Rounded_avg"])
                });

                scoreList.Add(score);
            }

            return scoreList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    ////---------------------------------------------------------------------------------
    //// Create the SqlCommand for get
    ////---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetS(string spName, SqlConnection con, int userNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserNum", userNum);//insert all the parameters we got from the user

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method gets how many employees are in each part of the evaluation process for the current year
    //--------------------------------------------------------------------------------------------------
    public List<BI> GetEvaluProcessStatus()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetNumOfEmployeesInEachPart", con);            // create the command

        List<BI> List = new List<BI>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                BI bi = new BI();
                bi.Evalu_Part_Type = Convert.ToInt32(dataReader["Evalu_Part_Type"]);
                bi.DepName = dataReader["DepName"].ToString();
                bi.UserId = Convert.ToInt32(dataReader["UserId"]);
                bi.UserName = dataReader["UserName"].ToString();

                List.Add(bi);
            }

            return List;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method gets the status of specific goal
    //--------------------------------------------------------------------------------------------------
    public List<BI> GetGoalStatus(int goalYear)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetAvgAnsByYear("sp_GetNumOfStatusesPerGoal", con, goalYear);            // create the command


        List<BI> GoalstatusList = new List<BI>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                BI goalStatus = new BI();
                goalStatus.GoalStatus = dataReader["GoalStatus"].ToString();
                goalStatus.GoalNum = Convert.ToInt32(dataReader["GoalNum"]);
                goalStatus.GoalName = dataReader["GoalName"].ToString();
                goalStatus.Num_of_statuses_byGoal = Convert.ToInt32(dataReader["Num_of_statuses_byGoal"]);

                GoalstatusList.Add(goalStatus);
            }

            return GoalstatusList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    //-------------- OpenAI ---------------

    //--------------------------------------------------------------------------------------------------
    // This method get the openAI details
    //--------------------------------------------------------------------------------------------------
    public OpenAI GetOpenAIDetails()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetOpenAIdetails", con);            // create the command

        OpenAI OpenAIdetails = new OpenAI();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                OpenAIdetails.OpenAI_api_key = dataReader["OPENAI_API_KEY"].ToString();
                OpenAIdetails.Organization_ID = dataReader["Organization_ID"].ToString();
                OpenAIdetails.Organization_name = dataReader["Organization_name"].ToString();
            }

            return OpenAIdetails;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method gets the details of the sql command created by chatGPT
    //--------------------------------------------------------------------------------------------------
    public List<Object> ReadsqlCommand(string sqlCommand)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommand(sqlCommand, con);             // create the command

        List<Object> dataList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                var rowData = new Dictionary<string, object>();

                for (int i = 0; i < dataReader.FieldCount; i++)
                {
                    string fieldName = dataReader.GetName(i);
                    object fieldValue = dataReader.GetValue(i);

                    rowData[fieldName] = fieldValue;
                }

                dataList.Add(rowData);
            }

            return dataList;
        }
        catch (SqlException ex)
        {
            // Handle specific SQL exceptions
            if (ex.Number == 208) // Invalid object name. This error occurs when a referenced database object does not exist in the database.
            {
                Console.WriteLine("Invalid object name.");
            }
            else if (ex.Number == 4060) // Cannot open database. This error occurs when the database specified in the connection string does not exist or the user does not have permission to access it.
            {
                Console.WriteLine("Cannot open database.");
            }
            else
            {
                Console.WriteLine("SQL exception occurred: " + ex.Message);
            }
            throw (ex);

        }
        catch (Exception ex)
        {
            // Handle other exceptions
            Console.WriteLine("An exception occurred: " + ex.Message);
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        return cmd;
    }

    //-------------- User Guide ---------------

    //--------------------------------------------------------------------------------------------------
    // This method get the openAI details
    //--------------------------------------------------------------------------------------------------
    public List<Object> GetUserGuideDetails()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGet("spGetUserGuide", con);            // create the command

        List<Object> UserGuideList = new List<Object>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                UserGuideList.Add(new
                {
                    id = Convert.ToInt32(dataReader["QuesNum"]),
                    question = (dataReader["QuesContent"]).ToString(),
                    answer = (dataReader["AnsContent"]).ToString().Replace("\"", "")
                });
            }

            return UserGuideList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    ////--------------------------------------------------------------------------------------------------
    //// This method get the final evalu process date
    ////--------------------------------------------------------------------------------------------------
    public Object GetFinalDate()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPGetFinalEvaluProcDate("sp_GetFinalEvaluProcDate", con);            // create the command

        Object FinalDate = new Object();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);

            while (dataReader.Read())
            {
                FinalDate = ((DateTime)dataReader["QuesLimitDate"]).ToShortDateString();

            }

            return FinalDate;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure for get with no conditions
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetFinalEvaluProcDate(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure



        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method Update quesLimitDate
    ////--------------------------------------------------------------------------------------------------
    public int UpdateEvaluFinalProcDate(DateTime quesLimitDate)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUpdateDate("sp_UpdateNewEvaluFinalProcDate", con, quesLimitDate);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUpdateDate(String spName, SqlConnection con, DateTime quesLimitDate)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@QuesLimitDate", quesLimitDate);
   
        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method delete values from Active_Evaluation_Ques table- end of process
    ////--------------------------------------------------------------------------------------------------
    public int UpdateEndOfEvalu()
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPUDeleteProcess("spUpdateEndOfProcess", con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPUDeleteProcess(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure


        return cmd;
    }



}
////--------------------------------------------------------------------------------------------------
//// This method get num of employees in each dep
////--------------------------------------------------------------------------------------------------
//public List<Object> GetNumOfEmployees()
//{

//    SqlConnection con;
//    SqlCommand cmd;

//    try
//    {
//        con = connect("myProjDB"); // create the connection
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    cmd = CreateCommandWithSPGet("sp_NumOfEmployeesInDep", con);            // create the command

//    List<Object> DepEmployeesList = new List<Object>();

//    try
//    {
//        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
//        //dt.Load(dataReader);


//        while (dataReader.Read())
//        {
//            Object dep = (new
//            {
//                DepNum = Convert.ToInt32(dataReader["DepNum"]),
//                DepName = dataReader["DepName"].ToString(),
//                Num_of_people = Convert.ToInt32(dataReader["Num_of_people"])
//            });

//            DepEmployeesList.Add(dep);
//        }

//        return DepEmployeesList;
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    finally
//    {
//        if (con != null)
//        {
//            // close the db connection
//            con.Close();
//        }
//    }

//}


////--------------------------------------------------------------------------------------------------
//// This method get num of managers
////--------------------------------------------------------------------------------------------------
//public Object GetNumOfManagers()
//{

//    SqlConnection con;
//    SqlCommand cmd;

//    try
//    {
//        con = connect("myProjDB"); // create the connection
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    cmd = CreateCommandWithSPGet("sp_GetNumOfManagers", con);            // create the command


//    BI bi = new BI();

//    try
//    {
//        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
//        //dt.Load(dataReader);

//        while (dataReader.Read())
//        {
//            bi.Num_of_manager = Convert.ToInt32(dataReader["Num_of_manager"]);

//        }

//        return bi;
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    finally
//    {
//        if (con != null)
//        {
//            // close the db connection
//            con.Close();
//        }
//    }

//}


////--------------------------------------------------------------------------------------------------
//// This method get num of deps
////--------------------------------------------------------------------------------------------------
//public Object GetNumOfDeps()
//{

//    SqlConnection con;
//    SqlCommand cmd;

//    try
//    {
//        con = connect("myProjDB"); // create the connection
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    cmd = CreateCommandWithSPGet("spGetNumOfEmployeesInEachPart", con);            // create the command


//    BI bi = new BI();

//    try
//    {
//        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
//        //dt.Load(dataReader);

//        while (dataReader.Read())
//        {
//            bi.Num_of_dep = Convert.ToInt32(dataReader["Num_of_dep"]);

//        }

//        return bi;
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    finally
//    {
//        if (con != null)
//        {
//            // close the db connection
//            con.Close();
//        }
//    }

//}

////--------------------------------------------------------------------------------------------------
//// This method gets the goals per user
////--------------------------------------------------------------------------------------------------
//public object GetNumOfUserGoals(int userNum)
//{

//    SqlConnection con;
//    SqlCommand cmd;

//    try
//    {
//        con = connect("myProjDB"); // create the connection
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    cmd = CreateCommandWithSPGetS("sp_GetNumOfGoalsByUser", con, userNum);            // create the command


//    BI bi = new BI();

//    try
//    {
//        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
//        //dt.Load(dataReader);

//        while (dataReader.Read())
//        {
//            bi.Num_of_goals = Convert.ToInt32(dataReader["Num_of_goals"]);
//        }

//        return bi;
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    finally
//    {
//        if (con != null)
//        {
//            // close the db connection
//            con.Close();
//        }
//    }

//}

////--------------------------------------------------------------------------------------------------
//// This method get the num of evaluQues for this userNum
////--------------------------------------------------------------------------------------------------
//public object GetNumOfUserEvlauQues(int userNum)
//{

//    SqlConnection con;
//    SqlCommand cmd;

//    try
//    {
//        con = connect("myProjDB"); // create the connection
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    cmd = CreateCommandWithSPGetS("sp_GetNumOfEvaluQuesPerUser", con, userNum);            // create the command


//    BI bi = new BI();

//    try
//    {
//        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
//        //dt.Load(dataReader);

//        while (dataReader.Read())
//        {
//            bi.User_num_of_evaluQues = Convert.ToInt32(dataReader["User_num_of_evaluQues"]);
//        }

//        return bi;
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    finally
//    {
//        if (con != null)
//        {
//            // close the db connection
//            con.Close();
//        }
//    }

//}
////--------------------------------------------------------------------------------------------------
//// This method get num goals by statuses
////--------------------------------------------------------------------------------------------------
//public List<Object> GetGoalsStatuses()
//{

//    SqlConnection con;
//    SqlCommand cmd;

//    try
//    {
//        con = connect("myProjDB"); // create the connection
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    cmd = CreateCommandWithSPGet("sp_GetStatuses", con);            // create the command

//    List<Object> statusesList = new List<Object>();

//    try
//    {
//        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
//        //dt.Load(dataReader);


//        while (dataReader.Read())
//        {
//            Object status = (new
//            {
//                Num_of_statuses = Convert.ToInt32(dataReader["Num_of_statuses"]),
//                GoalStatus = dataReader["GoalStatus"].ToString()
//            });

//            statusesList.Add(status);
//        }

//        return statusesList;
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    finally
//    {
//        if (con != null)
//        {
//            // close the db connection
//            con.Close();
//        }
//    }

//}


//////---------------------------------------------------------------------------------
////// Create the SqlCommand for get the ques answers avg according to the question group type, by year
//////---------------------------------------------------------------------------------
//private SqlCommand CreateCommandWithSPGetGoalsStatusesByYear(string spName, SqlConnection con, int goalYear)
//{
//    SqlCommand cmd = new SqlCommand(); // create the command object

//    cmd.Connection = con;              // assign the connection to the command object

//    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

//    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

//    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

//    cmd.Parameters.AddWithValue("@GoalYear", goalYear);//insert all the parameters we got from the user

//    return cmd;
//}
////--------------------------------------------------------------------------------------------------
//// This method get all goals statuses of the employees under this manager num, by the selected year
////--------------------------------------------------------------------------------------------------
//public List<Object> GetGoalsManagerNumNyear(int userNum, int goalYear)
//{

//    SqlConnection con;
//    SqlCommand cmd;

//    try
//    {
//        con = connect("myProjDB"); // create the connection
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    cmd = CreateCommandWithSPGetGoalsManagerNumNyear("spGetGoalsStatusByManagerNumNyear", con, userNum, goalYear);            // create the command

//    List<Object> GoalsList = new List<Object>();

//    try
//    {
//        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
//        //dt.Load(dataReader);


//        while (dataReader.Read())
//        {
//            Object goal = (new
//            {
//                GoalNum = Convert.ToInt32(dataReader["GoalNum"]),
//                GoalName = dataReader["GoalName"].ToString(),
//                GoalStatus = dataReader["GoalStatus"].ToString(),
//                num_of_goals = Convert.ToInt32(dataReader["num_of_goals"])
//            });

//            GoalsList.Add(goal);
//        }

//        return GoalsList;
//    }
//    catch (Exception ex)
//    {
//        // write to log
//        throw (ex);
//    }

//    finally
//    {
//        if (con != null)
//        {
//            // close the db connection
//            con.Close();
//        }
//    }

//}

//////---------------------------------------------------------------------------------
////// Create the SqlCommand for get all goals statuses of the employees under this manager num, by the selected year
//////---------------------------------------------------------------------------------
//private SqlCommand CreateCommandWithSPGetGoalsManagerNumNyear(string spName, SqlConnection con, int userNum, int goalYear)
//{
//    SqlCommand cmd = new SqlCommand(); // create the command object

//    cmd.Connection = con;              // assign the connection to the command object

//    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

//    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

//    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

//    cmd.Parameters.AddWithValue("@UserNum", userNum);//insert all the parameters we got from the user
//    cmd.Parameters.AddWithValue("@GoalYear", goalYear);

//    return cmd;
//}