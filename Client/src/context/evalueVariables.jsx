
import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { isEqual } from "lodash";

export const EvalueContext = createContext();
export default function EvalueContextProvider({ children }) {

  const [API, setAPI] = useState({
    // evaluationApi: "https://localhost:7079/userNum/evalu_Part_Type?userNum=",
    evaluationApi: "https://proj.ruppin.ac.il/cgroup47/prod/userNum/evalu_Part_Type?userNum=", //server
    // apiEvaluationQues: "https://localhost:7079/EvaluationAnswers",
    apiEvaluationQues: "https://proj.ruppin.ac.il/cgroup47/prod/EvaluationAnswers", //server
    // apiUserUrl: "https://localhost:7079/api/Employee",
    apiUserUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Employee", //server
    // apiDeprUrl: "https://localhost:7079/api/Department",
    apiDeprUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Department", //server
    // apiPutUserUrl: "https://localhost:7079/userEmail/is_Active/",
    apiPutUserUrl: "https://proj.ruppin.ac.il/cgroup47/prod/userEmail/is_Active/", //server
    // apiQuestionrUrl: "https://localhost:7079/api/Question",
    apiQuestionrUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Question", //server
    // apinewEvaluationQues: "https://localhost:7079/api/Rel_Questions_EvaluQues",
    apinewEvaluationQues: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Questions_EvaluQues", //server
    // apiQuestionnaire: "https://localhost:7079/quesType/roleGroup_Type?quesType=",
    apiQuestionnaire: "https://proj.ruppin.ac.il/cgroup47/prod/quesType/roleGroup_Type?quesType=", //server
    // apiQuestionnaireQuestiones: "https://localhost:7079/questionnaireNum?questionnaireNum=",
    apiQuestionnaireQuestiones: "https://proj.ruppin.ac.il/cgroup47/prod/questionnaireNum?questionnaireNum=", //server
    // apiUserUrllogin: "https://localhost:7079/userEmail/userpassword?",
    apiUserUrllogin: "https://proj.ruppin.ac.il/cgroup47/prod/userEmail/userpassword?", //server
    // apiGetAllGoals: "https://localhost:7079/api/Goal",
    apiGetAllGoals: "https://proj.ruppin.ac.il/cgroup47/prod/api/Goal", //server
    // apiPostFinishAll: "https://localhost:7079/EvaluationSummeryAnswers",
    apiPostFinishAll: "https://proj.ruppin.ac.il/cgroup47/prod/EvaluationSummeryAnswers", //server
    // apiGetEmployeeStatus: "https://localhost:7079/userNum?userNum=",
    apiGetEmployeeStatus: "https://proj.ruppin.ac.il/cgroup47/prod/userNum?userNum=", //
    // apiGoalsEmployee: "https://localhost:7079/userManager?userManager=",
    apiGoalsEmployee: "https://proj.ruppin.ac.il/cgroup47/prod/userManager?userManager=", //server
    // apiGetEvaluations: "https://localhost:7079/api/Rel_Questions_EvaluQues",
    apiGetEvaluations: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Questions_EvaluQues", //server
    // apiGetGoalsByUserNum: "https://localhost:7079/api/Rel_Goal_Employee?userNum=",
    apiGetGoalsByUserNum: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Goal_Employee?userNum=", //server
    // apiSetEvaluations: "https://localhost:7079/Active_Evaluations",
    apiSetEvaluations: "https://proj.ruppin.ac.il/cgroup47/prod/Active_Evaluations", //server
    // apiInsertNewGoal: "https://localhost:7079/newGoal?goalActive=",
    apiInsertNewGoal: "https://proj.ruppin.ac.il/cgroup47/prod/newGoal?goalActive=",//server
    // apiUpdateGoal: "https://localhost:7079/UpdateGoal/goalNum/",
    apiUpdateGoalName: "https://proj.ruppin.ac.il/cgroup47/prod/UpdateGoal/goalNum/", //server
    // apiUpdateGoalStatus: "https://localhost:7079/userNum/",
    apiUpdateGoalStatus: "https://proj.ruppin.ac.il/cgroup47/prod/userNum/", //server
    // apiGetPDFdetails: "https://localhost:7079/userNum/questionnaireNum?userNum=",
    apiGetPDFdetails: "https://proj.ruppin.ac.il/cgroup47/prod/userNum/questionnaireNum?userNum=", //server
    // apiStatusMeeting: "https://localhost:7079/api/Rel_Questions_EvaluQues/StatusMeeting/",
    apiStatusMeeting: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Questions_EvaluQues/StatusMeeting/", //server
    apiOpenAIdetails: "https://localhost:7079/api/OpenAI",
    // apiOpenAIdetails: "https://proj.ruppin.ac.il/cgroup47/prod/api/OpenAI", //server
    apiGetDataFromGPT: "https://localhost:7079/api/OpenAI/",
    // apiGetDataFromGPT: "https://proj.ruppin.ac.il/cgroup47/prod/api/OpenAI/", //server
    apiEmployeeInEachPart: "https://localhost:7079/Evaluation_Process_Status",
    // apiEmployeeInEachPart: "https://proj.ruppin.ac.il/cgroup47/prod/Evaluation_Process_Status", //server
    apiQuesGroupDep: "https://localhost:7079/Avg_Answers?answerYear=",
    // apiQuesGroupDep: "https://proj.ruppin.ac.il/cgroup47/prod/Avg_Answers?answerYear=", //server
    apiAvgAnsByYears: "https://localhost:7079/AvgAnswersByYear",
    // apiAvgAnsByYears: "https://proj.ruppin.ac.il/cgroup47/prod/AvgAnswersByYear", //server
    apiSelfKPI: "https://localhost:7079/Score?userNum=",
    // apiSelfKPI: "https://proj.ruppin.ac.il/cgroup47/prod/Score?userNum=", //server
    apiGoalsStatusBI: "https://localhost:7079/Goal_Status?goalYear=",
    // apiGoalsStatusBI: "https://proj.ruppin.ac.il/cgroup47/prod/Goal_Status?goalYear=", //server
  });


  const [chosenEmployee, setChosenEmployee] = useState("");

  const [depState, setDepState] = useState([]);

  const [FAQ, setFAQ] = useState([
    {
      "id": 1,
      "question": "איך למחוק יעד קיים?",
      "answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?"
    },
    {
      "id": 2,
      "question": "איך לעדכן פרטי משתמש?",
      "answer": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto veniam eveniet labore impedit nam"
    },
    {
      "id": 3,
      "question": "איך להוסיף משתמש חדש?",
      "answer": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores,"
    },
    {
      "id": 4,
      "question": "איך להקים טופס הערכה חדש?",
      "answer": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi."
    }
  ]);

  useEffect(() => {
    const exisiting = localStorage.getItem("chosenEmployee");
    const areObjectsEqual = isEqual(chosenEmployee, JSON.parse(exisiting));
    if (exisiting === null && chosenEmployee !== undefined || (exisiting !== null && chosenEmployee !== undefined && !areObjectsEqual)) {
      localStorage.setItem("chosenEmployee", JSON.stringify(chosenEmployee)); // Set chosenEmployee details in local storage
    }
    if (exisiting !== null && chosenEmployee === "") {
      setChosenEmployee(JSON.parse(exisiting));
    }
  }, [chosenEmployee])

  const values = {
    API,
    setAPI,
    chosenEmployee,
    setChosenEmployee,
    depState,
    setDepState,
    FAQ,
    setFAQ
  }

  return (
    <EvalueContext.Provider value={values}>
      {children}
    </EvalueContext.Provider>
  )

}




