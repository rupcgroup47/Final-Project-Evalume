import {
    // Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Tooltip
    // TableSortLabel,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useEffect, useState, useContext } from "react";
// import { visuallyHidden } from "@mui/utils";
import { EvalueContext } from "context/evalueVariables";
import TableItem from "components/TableItem";
import TableToolbar from "components/TableToolbar";
import * as XLSX from "xlsx";

export default function GPTTable({ tableData, setTableData }) {
    const objectArray = Object.entries(tableData[0])
    const tableHeadArr = objectArray?.map(item => {
        return {
            id: item[0],
            textAlign: "center",
            scope: "row",
            disablePadding: false,
            label: item[0],
            show: true,
        };
    });
    // console.log(tableHeadArr);
    const [tableHead, setTableHead] = useState(tableHeadArr);
    const [items, setItems] = useState([tableData]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { API } = useContext(EvalueContext);
    // console.log(items);

    useEffect(() => {
        // Update the users array
        setItems(tableData);
    }, [tableData]);

    //Export the table to excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        XLSX.writeFile(workbook, 'data.xlsx');
    };

    // show empty rows if the array / filted array is epmty or less then rowsPerPage
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

    return (
        <Paper sx={{ boxShadow: "none" }}>
            <Tooltip title="Export to Excel">
                <Button
                    variant="contained.base"
                    style={{position: "absolute", fontSize: "xx-large"}}
                    startIcon={<CloudDownloadIcon />}
                    onClick={exportToExcel}
                />
            </Tooltip>
            <TableToolbar
                fromAI
                // Users
                users={tableData}
                setUsers={setTableData}
                setItems={setItems}

                // Table Head
                tableHead={tableHead}
                setTableHead={setTableHead}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle" size="small">
                    {/* Table Head - Start */}
                    <TableHead sx={{ display: "table-header-group" }} style={{ position: "sticky", top: 0 }}>
                        <TableRow>
                            {tableHead.map((item) => {
                                return (
                                    item.show && (
                                        <TableCell
                                            key={item.id}
                                            align={item.textAlign || ""}
                                            padding={item.disablePadding ? "none" : "normal"}
                                            sx={{ fontWeight: 600, padding: "4px" }}
                                        >
                                            {item.label}
                                        </TableCell>
                                    )
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    {/* Table Head - End */}

                    {/* Table Body - Start */}
                    <TableBody>
                        {items
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableItem
                                    fromAI
                                    key={index}
                                    user={row}
                                    users={tableData}
                                    setUsers={setTableData}
                                    setItems={setItems}
                                    tableHead={tableHead}
                                    index={index}
                                />
                            ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={12} sx={{ textAlign: "inherit" }}>
                                    {tableData.length > 0
                                        ? items.length <= 0 && "לא נמצאו רשומות מתאימות"
                                        : "הרשימה ריקה, הוסף רשומות"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {/* Table Body - End */}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}–${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`
                }
                labelRowsPerPage="מספר שורות להציג:"
            />
        </Paper>
    );
}
