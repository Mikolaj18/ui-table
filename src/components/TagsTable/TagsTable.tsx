import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useGetTagsQuery} from "../../store/api/tagsApi.ts";
import TagsTableItem from "../TagsTableItem/TagsTableItem.tsx";
import Loader from "../Loader/Loader.tsx";
import Message from "../Message/Message.tsx";

const TagsTable = () => {
    const {data, error, isLoading} = useGetTagsQuery();
    console.log(error);
    if (error) {
        if ('status' in error) {
            return <Message severity="error" text={`An unexpected error occured with status ${error.status}`} />;
        } else {
            return <Message severity="error" text="An unknown error occurred" />;
        }
    }

    return (
        <>
            {isLoading ? <Loader/> :
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.items.map((row) => (
                                <TagsTableItem key={row.name} name={row.name} count={row.count}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
}

export default TagsTable;