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
    // TableSortLabel,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
// import { visuallyHidden } from "@mui/utils";
import { useDebounce } from "use-debounce";
import { EvalueContext } from "context/evalueVariables";
import TableItem from "components/TableItem";
import TableToolbar from "components/TableToolbar";

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
    console.log(tableHeadArr);
    const [tableHead, setTableHead] = useState(tableHeadArr);
    const [items, setItems] = useState([tableData]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { API } = useContext(EvalueContext);
    console.log(items);

    useEffect(() => {
        // Update the users array
        setItems(tableData);
    }, [tableData]);



    // handleSearch - start
    // const [searchInput, setSearchInput] = useState("");
    // const [searchDebounce] = useDebounce(searchInput, 500);

    // const handleSearch = (value) => {
    //     setSearchInput(value);

    //     // const sx = tableData.filter((item) =>
    //     //     item.includes(value.toLowerCase())
    //     // );

    //     setItems(value?.length > 0 ? sx : tableData);
    // };

    // useEffect(() => {
    //     handleSearch(searchDebounce);
    // }, [searchDebounce]);

    // handleSearch - end

    // show empty rows if the array / filted array is epmty or less then rowsPerPage
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

    return (
        <Paper sx={{ boxShadow: "none" }}>
            <TableToolbar
                fromAI={true}
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
                                    fromAI={true}
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
