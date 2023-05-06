import React from "react";
import { Page, Text, Document, StyleSheet, Font, View } from "@react-pdf/renderer";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableBody } from "@mui/material";
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
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    height: 24,
    fontFamily: 'Rubik',
    color: "grey",

  },
  tableCell: {
    margin: 'auto',
    fontSize: 12,
    fontFamily: 'Rubik',
    color: "grey",

  },
});
const objects = [
  { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
  { name: 'Bob Johnson', age: 40, email: 'bob.johnson@example.com' },
];
const PDFFile = () => {//receive the selected form by year and user 
    return(
      <Document>
      <Page>
        <View>
          <Table>
            {console.log(objects)}
            <TableBody>
              {objects.map((object, index) => (
                <TableRow style={styles.tableRow} key={index}>
                  <TableCell style={styles.tableCell}>{object.name}</TableCell>
                  {console.log(object.name)}
                  <TableCell style={styles.tableCell}>{object.age}</TableCell>
                  <TableCell style={styles.tableCell}>{object.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </View>
      </Page>
    </Document>
    )

};

export default PDFFile;
