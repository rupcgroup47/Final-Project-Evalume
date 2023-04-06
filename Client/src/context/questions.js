import React, { useState, createContext } from 'react';

export const ArrayContext = createContext([]);

export const ArrayProvider = ({ children }) => {
    const FormQuestions = ["f","h"]
  const [globalQuestionArray, setGlobalQuestionsArray] = useState(FormQuestions);

  return (
    <ArrayContext.Provider value={[globalQuestionArray, setGlobalQuestionsArray]}>
      {children}
    </ArrayContext.Provider>
  );
};