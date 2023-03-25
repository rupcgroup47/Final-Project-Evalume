﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using Final_Server.Models;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;

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

        cmd = CreateCommandWithSPUserDetails("spGetUserDetails",con, userEmail, userpassword);            // create the command

        Employee employee = new Employee();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                employee.UserEmail = dataReader["UserEmail"].ToString();
                employee.UserNum = Convert.ToInt32(dataReader["UserNum"]);
                employee.UserId = dataReader["UserId"].ToString();
                employee.UserFName = dataReader["UserFName"].ToString();
                employee.UserLName = dataReader["UserLName"].ToString();
                employee.UserGender = dataReader["UserGender"].ToString();
                employee.UserInsertDate = Convert.ToDateTime(dataReader["UserInsertDate"]);
                employee.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]); 
                employee.Is_Admin = Convert.ToBoolean(dataReader["Is_Admin"]);
                employee.UserType = Convert.ToBoolean(dataReader["UserType"]);
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
                //var row= dt.NewRow();
                //for (int i = 0; i < dataReader.FieldCount; i++)
                //{
                //    row[i] = dataReader.GetValue(i);
                //}

                //dt.Rows.Add(row);
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

        cmd = CreateCommandWithSPGetAllUsers("spGetAllUsers", con);            // create the command
                                                                               
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
                employee.UserId = dataReader["UserId"].ToString();
                employee.UserFName = dataReader["UserFName"].ToString();
                employee.UserLName = dataReader["UserLName"].ToString();
                employee.UserGender = dataReader["UserGender"].ToString();
                employee.UserInsertDate = Convert.ToDateTime(dataReader["UserInsertDate"]);
                employee.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]);
                employee.Is_Admin = Convert.ToBoolean(dataReader["Is_Admin"]);
                employee.UserType = Convert.ToBoolean(dataReader["UserType"]);

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
    // Create the SqlCommand using a stored procedure to get all Users
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetAllUsers(String spName, SqlConnection con)
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
    //// This method gets all Users emails only
    ////--------------------------------------------------------------------------------------------------

    //public List<string> ReadAllUsersEmails()
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

    //    cmd = CreateCommandWithSPGet("spGetUsersEmails", con);             // create the command


    //    List<string> list = new List<string>();

    //    try
    //    {
    //        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

    //        while (dataReader.Read())
    //        {
    //            string UserEmail = dataReader["email"].ToString();

    //            list.Add(UserEmail);
    //        }

    //        return Emailslist;
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
    //private SqlCommand CreateCommandWithSPGet(String spName, SqlConnection con)
    //{

    //    SqlCommand cmd = new SqlCommand(); // create the command object

    //    cmd.Connection = con;              // assign the connection to the command object

    //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

    //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

    //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

    //    return cmd;
    //}

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
        cmd.Parameters.AddWithValue("@userpassword", employee.Userpassword);
        cmd.Parameters.AddWithValue("@UserId", employee.UserId);
        cmd.Parameters.AddWithValue("@UserFName", employee.UserFName);
        cmd.Parameters.AddWithValue("@UserLName", employee.UserLName);
        cmd.Parameters.AddWithValue("@UserGender", employee.UserGender);
        cmd.Parameters.AddWithValue("@Is_Active", employee.Is_Active);
        cmd.Parameters.AddWithValue("@Is_Admin", employee.Is_Admin);
        cmd.Parameters.AddWithValue("@UserType", employee.UserType);

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
    public int UpdateUserActive(string userEmail, bool is_Active)
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

        cmd = CreateCommandWithSPUserActive("spUpdateUserActive", con, userEmail, is_Active);             // create the command

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
    private SqlCommand CreateCommandWithSPUserActive(String spName, SqlConnection con, string userEmail, bool is_Active)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserEmail", userEmail); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@Is_Active", is_Active);

        return cmd;
    }


    ////--------------------------------------------------------------------------------------------------
    //// This method saves the changes in user details
    ////--------------------------------------------------------------------------------------------------
    public int UpdateUserDetails(string userEmail, string userFName, string userLName, string userGender)
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

        cmd = CreateCommandWithSPUpdateDetails("spUpdateUser", con, userEmail, userFName, userLName, userGender);             // create the command

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
    private SqlCommand CreateCommandWithSPUpdateDetails(String spName, SqlConnection con, string userEmail, string userFName, string userLName, string userGender)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserEmail", userEmail); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@UserFName", userFName);
        cmd.Parameters.AddWithValue("@UserLName", userLName);
        cmd.Parameters.AddWithValue("@UserGender", userGender);

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

        cmd = CreateCommandWithSPGetAllGoals("spGetAllGoals", con);            // create the command

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

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure to get all Goals
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetAllGoals(String spName, SqlConnection con)
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

        cmd = CreateCommandWithSPGetAllQuestions("spGetAllQuestions", con);            // create the command

        List<Question> QuestionsList = new List<Question>();

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //dt.Load(dataReader);


            while (dataReader.Read())
            {
                Question question = new Question();
                question.QuestionNum = Convert.ToInt32(dataReader["QuestionNum"]);
                question.QuesContent = dataReader["QuesContent"].ToString();
                question.Insert_date = Convert.ToDateTime(dataReader["Insert_date"]);
                question.Is_Active = Convert.ToBoolean(dataReader["Is_Active"]);

                QuestionsList.Add(question);

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

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure to get all Questions
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommandWithSPGetAllQuestions(String spName, SqlConnection con)
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
        cmd.Parameters.AddWithValue("@Insert_date", question.Insert_date);
        cmd.Parameters.AddWithValue("@Is_Active", question.Is_Active);

        return cmd;
    }

    ////--------------------------------------------------------------------------------------------------
    //// This method change "is_active" field by user email
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


    //--------------------------------------------------------------------------------------------------
    // This method Delete a question from the Question table 
    //--------------------------------------------------------------------------------------------------
    public int DeleteQues(int QuestionNum)
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

        cmd = CreateCommandWithSPDeleteQuestion("spDeleteQues", con, QuestionNum);             // create the command

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
    private SqlCommand CreateCommandWithSPDeleteQuestion(String spName, SqlConnection con, int QuestionNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@QuestionNum", QuestionNum); //insert all the parameters we got from the user

        return cmd;
    }

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
    //// This method inserts new employee goal
    ////--------------------------------------------------------------------------------------------------
    public int InsertEmployeeGoal(Rel_EmployeeGoal rel_EmployeeGoal)
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

        cmd = CreateCommandWithSPEmployeeUser("spInsertUserGoal", con, rel_EmployeeGoal);            // create the command

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
    private SqlCommand CreateCommandWithSPEmployeeUser(String spName, SqlConnection con, Rel_EmployeeGoal rel_EmployeeGoal)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

        cmd.Parameters.AddWithValue("@UserEmail", rel_EmployeeGoal.UserEmail); //insert all the parameters we got from the user
        cmd.Parameters.AddWithValue("@GoalNum", rel_EmployeeGoal.GoalNum);
        cmd.Parameters.AddWithValue("@GoalStatus", rel_EmployeeGoal.GoalStatus);


        return cmd;
    }
}