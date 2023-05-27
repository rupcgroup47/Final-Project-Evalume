import React from 'react';
import { Page, Text, Document, StyleSheet, Font, View } from '@react-pdf/renderer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';
import '@fontsource/rubik';
Font.register({ family: 'Rubik', src: 'http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf' });// The only font works for Hebrew!



// const objects = [
//   { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
//   { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
//   { name: 'Bob Johnson', age: 40, email: 'bob.johnson@example.com' },
// ];

const PDFFile = ({ data }) => {//receive the selected form by year and user
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      writingMode: 'horizontal-tb',
      textOrientation: 'mixed',
      padding: 30
    },
    container: {
      flex: 1,
      marginLeft: 30,
      marginRight: 30,
      paddingTop: 20,
      paddingBottom: 20,
      direction: 'rtl',
      fontFamily: 'Rubik',
      textAlign: 'right'
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
    section: {
      marginBottom: '0.5cm'
    },
    sectionText: {
      fontSize: 12,
      marginBottom: '0.25cm'
    },
    quesSection: {
      margin: 5,
      padding: 5
    },
    sectionTitleText: {
      fontSize: 14,
      fontWeight: 'semibold',
      marginBottom: '0.35cm'
    },  
    quesSectionText: {
      fontSize: 12,
      marginBottom: '0.25cm',
      marginRight: 15
    },
    border: {
      border: '1px solid grey',
      paddingTop: 10,
      paddingRight: 10,
      marginBottom: 10
    }
  });

  return (
    <Document>
      <Page size={'A4'} style={styles.page}>
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.section}>
            <Text style={styles.headerTitle}>טופס הערכה</Text>
          </View>
          {/* section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionText}>{data.userFName + ' ' + data.userLName}שם העובד: </Text>
            <Text style={styles.sectionText}>{data.userRole}תפקיד העובד: </Text>
            <Text style={styles.sectionText}>{data.userDepartment}מחלקת העובד: </Text>
            <Text style={styles.sectionText}>{data.questionnaireNum}שאלון מספר: </Text>
            <Text style={styles.sectionText}>{data.managerFname + ' ' + data.managerLName}שם המנהל: </Text>
            <Text style={styles.sectionText}>{data.managerRole}תפקיד המנהל: </Text>
            <Text style={styles.sectionText}>{data.managerDepartment}מחלקת המנהל: </Text>
          </View>
          {data?.parts?.map((part, index) => (
            <View key={index}>
              {part?.evaluPart == 2 ?
                <View style={styles.section}>
                  <Text style={styles.sectionText}>חלק: שיחת משוב</Text>
                  <Text style={styles.sectionText}>{part?.answerInsertDate}תאריך ביצוע: </Text>
                  <Text style={styles.sectionText}>{part?.managerOpinion}חוות דעת מנהל: </Text>
                  <Text style={styles.sectionText}>{part?.employeeOpinion}חוות דעת עובד: </Text>
                </View>
                : <View>
                  <Text style={styles.sectionText}>{part?.evaluPart == 0 ? 'הערכה עצמית' : 'הערכת מנהל'}סעיף: </Text>
                  <Text style={styles.sectionText}>{part?.answerInsertDate}תאריך ביצוע: </Text>
                  {/*Table section*/}
                  <View style={styles.quesSection}>
                    {part?.allQuestions?.map((questionsObj, quesIndex) => (
                      <View key={'q' + part.evaluPart + '-' + questionsObj.quesGroup_ID} style={styles.border}>
                        <Text style={styles.sectionTitleText}>{questionsObj.quesGroup_Desc}נושא השאלות: </Text>
                        {questionsObj?.questions?.map((question, idx) => (
                          <View key={'q' + part.evaluPart + '-' + questionsObj.quesGroup_ID + '-' + question.questionNum} style={styles.sectionText}>
                            <Text style={styles.quesSectionText}>{question.quesContent}תוכן השאלה: </Text>
                            <Text style={styles.quesSectionText}>{question.numericAnswer}תשובה מספרית: </Text>
                            <Text style={styles.quesSectionText}>{question.verbalAnswer}תשובה מילולית: </Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
              }
            </View>
          ))}
        </View>
      </Page>
    </Document >
  )
};

export default PDFFile;
