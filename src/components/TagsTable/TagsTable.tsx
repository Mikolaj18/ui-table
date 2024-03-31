import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import {useGetTagsQuery} from "../../store/api/tagsApi.ts";
import TagsTableItem from "../TagsTableItem/TagsTableItem.tsx";
import Loader from "../Loader/Loader.tsx";
import {Alert, Box} from "@mui/material";
import ItemsPerPageInput from "../RowsPerPageInput/ItemsPerPageInput.tsx";
interface Data {
    name: string,
    count: number,
}
const TagsTable = () => {
    const {data, error, isLoading} = useGetTagsQuery();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [order, setOrder] = useState<Order>('asc');

    const handleSort = (property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedData = data ? stableSort(data.items, getComparator(order, orderBy)) : [];
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedData.length) : 0;

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    type Order = 'asc' | 'desc';

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    if (error) {
        if ('status' in error) {
            return <Alert severity="error">{`An unexpected error occurred with status ${error.status}`}</Alert>;
        } else {
            return <Alert severity="error">An unexpected error occurred</Alert>;
        }
    }
    return (
        <Box>
            {isLoading ? <Loader/> :
                <Box>
                    <ItemsPerPageInput setItemsPerPage={setRowsPerPage} setPage={setPage}/>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        <TableSortLabel
                                            active={orderBy === 'name'}
                                            direction={orderBy === 'name' ? order : 'asc'}
                                            onClick={() => handleSort('name')}
                                        >
                                            Name
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TableSortLabel
                                            active={orderBy === 'count'}
                                            direction={orderBy === 'count' ? order : 'asc'}
                                            onClick={() => handleSort('count')}
                                        >
                                            Count
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TagsTableItem key={row.name} name={row.name} count={row.count}/>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 53 * emptyRows}}>
                                        <TableCell colSpan={2}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={sortedData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Box>
            }
        </Box>
    );
}

export default TagsTable;
