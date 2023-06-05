using System.Globalization;

namespace Final_Server.Models
{
    public class OpenAI
    {
        string organization_name;
        string openAI_api_key;
        string organization_ID;

        public string Organization_name { get => organization_name; set => organization_name = value; }
        public string OpenAI_api_key { get => openAI_api_key; set => openAI_api_key = value; }
        public string Organization_ID { get => organization_ID; set => organization_ID = value; }

        public static OpenAI ReadDetails() //get all openAI details
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetOpenAIDetails();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<Object> ReadUserGuideDetails() //get User Guide details
        {
            try
            {
                DBservices dbs = new DBservices();
                return dbs.GetUserGuideDetails();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<Object> ReadsqlCommand(string sqlCommand) //get all openAI details
        {
            try
            {
                DBservices dbs = new DBservices();
                List<Object> result = dbs.ReadsqlCommand(sqlCommand);
                //foreach (var row in result)
                //{
                //    Dictionary<string, object> rowData = (Dictionary<string, object>)row;

                //    foreach (var field in rowData)
                //    {
                //        string fieldName = field.Key;
                //        object fieldValue = field.Value;
                //    }

                //    Console.WriteLine(); // Add a line break between rows
                //}
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
