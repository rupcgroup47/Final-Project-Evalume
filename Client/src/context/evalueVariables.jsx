
import React, { createContext } from "react";
import { useState } from "react";

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
  });

  //   const InitNotesContext = [ 
  //     {
  //         "id": 1,
  //         "title": "Note 1",
  //         "description":"Do presentation",
  //         "category":"Work"
  //       },
  //       {
  //         "id": 2,
  //         "title": "Note 2",
  //         "description":"Call Noa",
  //         "category":"Work"

  //       }, 
  //      {
  //         "id": 3,
  //         "title": "Note 3",
  //         "description":"Call Yarden",
  //         "category":"Work"

  //       },
  //       {
  //         "id": 4,
  //         "title": "Note 4",
  //         "description":"Send Email",
  //         "category":"Personal"

  //       }
  // ]


  //   const [notesArrContext, SetNotesArrContext] = useState(InitNotesContext);
  //   const InitCategoryArrContext = [ "Work", "Personal", "Ideas","Lists"]
  //   const [CategoryArrContext, SetCategoryArrContext] = useState(InitCategoryArrContext)
  //   const [currentCat, setCurrentCat] = useState("")
  const [chosenEmployee, setChosenEmployee] = useState("")

  const values = {
    // CategoryArrContext,
    // notesArrContext,
    // SetCategoryArrContext,
    // SetNotesArrContext,
    // currentCat,
    // setCurrentCat
    API,
    setAPI,
    chosenEmployee,
    setChosenEmployee
  }

  return (
    <EvalueContext.Provider value={values}>
      {children}
    </EvalueContext.Provider>
  )

}




