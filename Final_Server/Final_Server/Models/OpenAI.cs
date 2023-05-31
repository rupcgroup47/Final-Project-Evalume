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
    }
}
