
import { useState, useEffect, createContext, useMemo } from "react";
import { isEqual } from "lodash";

export const EvalueContext = createContext();
export default function EvalueContextProvider({ children }) {

  const [API, setAPI] = useState({
    evaluationApi: "https://proj.ruppin.ac.il/cgroup47/prod/userNum/evalu_Part_Type?userNum=", // server
    apiEvaluationQues: "https://proj.ruppin.ac.il/cgroup47/prod/EvaluationAnswers", //  server
    apiUserUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Employee", //  server
    apiDeprUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Department", //  server
    apiPutUserUrl: "https://proj.ruppin.ac.il/cgroup47/prod/userEmail/is_Active/", // server
    apiQuestionrUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Question", // server
    apinewEvaluationQues: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Questions_EvaluQues", // server
    apiQuestionnaire: "https://proj.ruppin.ac.il/cgroup47/prod/quesType/roleGroup_Type?quesType=", // server
    apiQuestionnaireQuestiones: "https://proj.ruppin.ac.il/cgroup47/prod/questionnaireNum?questionnaireNum=", //  server
    apiUserUrllogin: "https://proj.ruppin.ac.il/cgroup47/prod/userEmail/userpassword?", //  server
    apiGetAllGoals: "https://proj.ruppin.ac.il/cgroup47/prod/api/Goal", //  server
    apiPostFinishAll: "https://proj.ruppin.ac.il/cgroup47/prod/EvaluationSummeryAnswers", //  server
    apiGetEmployeeStatus: "https://proj.ruppin.ac.il/cgroup47/prod/userNum?userNum=", //  server
    apiGoalsEmployee: "https://proj.ruppin.ac.il/cgroup47/prod/userManager?userManager=", //  server
    apiGetEvaluations: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Questions_EvaluQues", //  server
    apiGetGoalsByUserNum: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Goal_Employee?userNum=", //  server
    apiSetEvaluations: "https://proj.ruppin.ac.il/cgroup47/prod/Active_Evaluations", // server
    apiInsertNewGoal: "https://proj.ruppin.ac.il/cgroup47/prod/newGoal?goalActive=",//  server
    apiUpdateGoal: "https://proj.ruppin.ac.il/cgroup47/prod/UpdateGoal/goalNum/", //  server
    apiUpdateGoalStatus: "https://proj.ruppin.ac.il/cgroup47/prod/userNum/", // server
    apiGetPDFdetails: "https://proj.ruppin.ac.il/cgroup47/prod/userNum/questionnaireNum?userNum=", // server
    apiStatusMeeting: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Questions_EvaluQues/StatusMeeting/", //  server
    apiPostMeeting: "https://proj.ruppin.ac.il/cgroup47/prod/setAmeeting", // server
    apiOpenAIdetails: "https://proj.ruppin.ac.il/cgroup47/prod/api/OpenAI", //  server
    apiGetDataFromGPT: "https://proj.ruppin.ac.il/cgroup47/prod/api/OpenAI/query", // server
    apiEmployeeInEachPart: "https://proj.ruppin.ac.il/cgroup47/prod/Evaluation_Process_Status", //  server
    apiQuesGroupDep: "https://proj.ruppin.ac.il/cgroup47/prod/Avg_Answers?answerYear=", //  server
    apiAvgAnsByYears: "https://proj.ruppin.ac.il/cgroup47/prod/AvgAnswersByYear", //  server
    apiSelfKPI: "https://proj.ruppin.ac.il/cgroup47/prod/Score?userNum=", //  server
    apiGoalsStatusBI: "https://proj.ruppin.ac.il/cgroup47/prod/Goal_Status?goalYear=", // server
    apiUserGuideDetails: "https://proj.ruppin.ac.il/cgroup47/prod/userGuide", //  server
    apiMeetings: "https://proj.ruppin.ac.il/cgroup47/prod/Meetings/", //  server
  });


  const [chosenEmployee, setChosenEmployee] = useState("");

  const [depState, setDepState] = useState([]);

  const [meetings, setMeetings] = useState([]);

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

  // const values = {
  //   API,
  //   setAPI,
  //   chosenEmployee,
  //   setChosenEmployee,
  //   depState,
  //   setDepState,
  //   meetings,
  //   setMeetings
  // }
  const memoizedValues = useMemo(() => ({
    API,
    setAPI,
    chosenEmployee,
    setChosenEmployee,
    depState,
    setDepState,
    meetings,
    setMeetings,
  }), [API, setAPI, chosenEmployee, setChosenEmployee, depState, setDepState, meetings, setMeetings]);

  return (
    <EvalueContext.Provider value={memoizedValues}>
      {children}
    </EvalueContext.Provider>
  )

}




