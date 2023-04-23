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

        cmd = CreateCommandWithSPGetDepatments("spGetDepartments", con);            // create the command
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

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure to get all departments details
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetDepatments(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        /*cmd.Parameters.AddWithValue();*/ //insert all the parameters we got from the user


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

        /*cmd.Parameters.AddWithValue();*/ //insert all the parameters we got from the user


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
    public int InsertGoal(Goal goal)
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

        cmd = CreateCommandWithSPnewGoal("spInsertGoal", con, goal);            // create the command

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
    private SqlCommand CreateCommandWithSPnewGoal(String spName, SqlConnection con, Goal goal)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@GoalName", goal.GoalName); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Is_Active", goal.Is_Active);

        return cmd;
    }


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
    // This method update a user in the users table 
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


    ////--------------------------------------------------------------------------------------------------
    //// This method Delete a question from the Question table 
    ////--------------------------------------------------------------------------------------------------
    //public int DeleteQues(int QuestionNum)
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

    //    cmd = CreateCommandWithSPDeleteQuestion("spDeleteQues", con, QuestionNum);             // create the command

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
    //private SqlCommand CreateCommandWithSPDeleteQuestion(String spName, SqlConnection con, int QuestionNum)
    //{

    //    SqlCommand cmd = new SqlCommand(); // create the command object

    //    cmd.Connection = con;              // assign the connection to the command object

    //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

    //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

    //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

    //    cmd.Parameters.AddWithValue("@QuestionNum", QuestionNum); //insert all the parameters we got from the user

    //    return cmd;
    //}


    ////--------------------------------------------------------------------------------------------------
    //// This method saves the changes in user details
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
    //// This method change "is_active" field by GoalNum for specific user
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
                    id = Convert.ToInt32(dataReader["UserNum"]),
                    name = dataReader["GoalName"].ToString(),
                    date = dataReader["GoalCreateDate"].ToString(),
                    isDone = dataReader["GoalStatus"].ToString(),
                });

                UserGoalsList.Add(goal);

                //goal.UserNum = Convert.ToInt32(dataReader["UserNum"]);
                //goal.GoalNum = Convert.ToInt32(dataReader["GoalNum"]);
                //goal.GoalName = dataReader["GoalName"].ToString();
                //goal.GoalStatus = dataReader["GoalStatus"].ToString();
                //goal.GoalGroup_Desc = dataReader["GoalGroup_Desc"].ToString();
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
    // This method Delete a Goal from the Goal table 
    //--------------------------------------------------------------------------------------------------
    public int DeleteGoal(int goalNum)
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

        cmd = CreateCommandWithSPDeleteGoal("spDeleteGoal", con, goalNum);             // create the command

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
    private SqlCommand CreateCommandWithSPDeleteGoal(String spName, SqlConnection con, int goalNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@GOALNUM", goalNum); //insert all the parameters we got from the user

        return cmd;
    }


    //--------------------------------------------------------------------------------------------------
    // This method get all users goals that under this corent manager
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

    ////--------------------------------------------------------------------------------------------------
    //// This section has all EvaluationQues functions
    ////--------------------------------------------------------------------------------------------------

    ////--------------------------------------------------------------------------------------------------
    //// This method inserts new Question
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
    //// This method gets the all the EvaluQues that fit the QuesType and RoleType
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
    //// This method gets the all the EvaluQues that fit the QuesType and RoleType
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
    //// This method gets the all the EvaluQues that fit the QuesType and RoleType
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

    //--------------------------------------------------------------------------------------------------
    // This method get all users goals that under this corent manager
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
                Object uses = (new
                {
                    UserNum = Convert.ToInt32(dataReader["UserNum"]),
                    UserFName = dataReader["UserFName"].ToString(),
                    UserLName = dataReader["UserLName"].ToString(),
                    AnswerInsertDate = dataReader["AnswerInsertDate"].ToString(),
                    QuestionnaireNum = Convert.ToInt32(dataReader["QuestionnaireNum"]),
                    Evalu_Part_Type = Convert.ToInt32(dataReader["Evalu_Part_Type"])
                });

                EmployeeStatusList.Add(uses);
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
}
