import React from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";
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
    textAlign: "justify",
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


const PDFFile = () => {
    return(
        <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>שלום</Text>
          <Text style={styles.text} >מלל בעברית</Text>
          <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`} fixed></Text>
        </Page>
      </Document>
    )

};

export default PDFFile;
