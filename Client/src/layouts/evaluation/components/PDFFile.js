import React from "react";
import { Page, Text, Document, StyleSheet, Font, View } from "@react-pdf/renderer";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableBody } from "@mui/material";
import "@fontsource/rubik";
Font.register({ family: 'Rubik', src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf" });// The only font works for Hebrew!



// const objects = [
//   { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
//   { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
//   { name: 'Bob Johnson', age: 40, email: 'bob.johnson@example.com' },
// ];

const PDFFile = ({ data }) => {//receive the selected form by year and user
  const styles = StyleSheet.create({
    // body: {
    //   paddingTop: 35,
    //   paddingBottom: 65,
    //   paddingHorizontal: 35,
    // },
    page: {
      fontFamily: 'Rubik',
      padding: '1cm'
    },
    header: {
      marginBottom: '2cm',
    },
    headerTitle: {
      fontSize: 18,
      textAlign: "right",
    },
    section: {
      marginBottom: '1cm'
    },
    sectionText: {
      fontSize: 14,
      textAlign: "right",
      marginBottom: '0.5cm'
    },
    // text: {
    //   // margin: 12,
    //   fontSize: 14,
    //   textAlign: "right",
    //   // fontFamily: 'Rubik',
    //   color: "blue"
    // },
    // text1: {
    //   margin: 14,
    //   fontSize: 16,
    //   textAlign: "right",
    //   // fontFamily: 'Rubik'
    // }, 
    // text2: {
    //   margin: 12,
    //   fontSize: 10,
    //   textAlign: "right",
    //   // fontFamily: 'Rubik'
    // },
    // pageNumber: {
    //   position: "absolute",
    //   fontSize: 12,
    //   bottom: 30,
    //   left: 0,
    //   right: 0,
    //   textAlign: "center",
    //   color: "grey",
    // },
    table: {
      display: 'table',
      width: 'auto',
      marginBottom: '1cm'
    },
    tableRow: {
      flexDirection: 'row',
      // borderBottomWidth: 1,
      // borderBottomColor: '#ccc',
      // alignItems: 'center',
      // height: 24,
      margin: 'auto',
      // fontFamily: 'Rubik',
      color: "grey",

    },
    tableCell: {
      margin: 'auto',
      padding: '0.3cm',
      border: '1px solid black',
      fontSize: 12,
      // fontFamily: 'Rubik',
      color: "grey",

    },
  });

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.table}>
          {/* Title */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>טופס הערכה</Text>
          </View>
          {/* section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionText}>{data.userFName + " " + data.userLName} שם העובד:</Text>
            <Text style={styles.sectionText}>{data.userRole} תפקיד העובד:</Text>
            <Text style={styles.sectionText}>{data.userDepartment} מחלקת העובד:</Text>
            <Text style={styles.sectionText}>{data.questionnaireNum} שאלון מספר:</Text>
            <Text style={styles.sectionText}>{data.managerFname + " " + data.managerLName} שם המנהל:</Text>
            <Text style={styles.sectionText}>{data.managerRole} תפקיד המנהל:</Text>
            <Text style={styles.sectionText}>{data.managerDepartment} מחלקת המנהל:</Text>
          </View>
          {data?.parts?.map((part, index) => (
            <View key={index}>
              {part?.evaluPart == 2 ?
                <View style={styles.section}>
                  <Text style={styles.sectionText}>חלק: שיחת משוב</Text>
                  <Text style={styles.sectionText}>{part?.answerInsertDate} תאריך ביצוע:</Text>
                  <Text style={styles.sectionText}>{part?.managerOpinion} חוות דעת מנהל:</Text>
                  <Text style={styles.sectionText}>{part?.employeeOpinion} חוות דעת עובד:</Text>
                </View>
                : <View style={styles.section}>
                  <Text style={styles.sectionText}>{part?.evaluPart == 0 ? "הערכה עצמית" : "הערכת מנהל"} חלק:</Text>
                  <Text style={styles.sectionText}>{part?.answerInsertDate} תאריך ביצוע:</Text>
                  {/*Table section*/}
                  <View style={styles.table}>
                    < View style={styles.tableRow} >
                      <Text style={styles.tableCell}>נושא השאלה</Text>
                      <Text style={styles.tableCell}>תוכן השאלה</Text>
                      <Text style={styles.tableCell}>תשובה מספרית</Text>
                      <Text style={styles.tableCell}>תשובה מילולית</Text>
                    </View>
                    {part?.allQuestions?.map((questionsObj, quesIndex) => (
                      <View key={'q' + part.evaluPart + '-' + questionsObj.quesGroup_ID}>
                        {questionsObj?.questions?.map((question, idx) => (
                          <View key={'q' + part.evaluPart + '-' + questionsObj.quesGroup_ID + '-' + question.questionNum} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{questionsObj.quesGroup_Desc}</Text>
                            <Text style={styles.tableCell}>{question.quesContent}</Text>
                            <Text style={styles.tableCell}>{question.numericAnswer}</Text>
                            <Text style={styles.tableCell}>{question.verbalAnswer}</Text>
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
