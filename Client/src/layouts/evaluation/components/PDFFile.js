import React from "react";
import { Page, Text, Document, StyleSheet, Font, View } from "@react-pdf/renderer";
import "@fontsource/rubik";
Font.register({ family: 'Rubik', src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf" });// The only font works for Hebrew!

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: 'Rubik',
    color:"blue"

  },
  text1: {
    margin: 14,
    fontSize: 16,
    textAlign: "right",
    fontFamily: 'Rubik'
    },text2: {
    margin: 12,
    fontSize: 10,
    textAlign: "right",
    fontFamily: 'Rubik'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: 'Rubik'

  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PDFFile = (props) => {//receive the selected form by year and user 
    return(
        <Document>
        <Page style={styles.body}>
            <Text style={styles.header} fixed>1- 2023 שאלון מספר </Text>
            <Text style={styles.header} fixed>עובד: נועה פרקש מנהל: יהל שבח</Text>
            <Text style={styles.text}>מקרא 1-5, 1 שלילי 5 חיובי</Text>
            <Text style={styles.text1}>מישוב עצמי </Text>
            <Text style={styles.text2}> האם אני מרגיש בנוח? 5 </Text>
            <Text style={styles.text2}> האם אני מרגיש עובד טוב? 4 </Text>
            <Text style={styles.text2}> האם אני מרגיש מסופק? 4 כן העבודה מספקת אותי מאוד</Text>
            <Text style={styles.text2}> האם אני מרגיש בנוח עם העמיתים? 4 חברים טובים</Text>


          <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`} fixed></Text>
        </Page>
      </Document>
    )

};

export default PDFFile;
