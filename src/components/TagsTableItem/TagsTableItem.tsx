import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type TagsTableItemProps = {
    name: string,
    count: number,
}
const TagsTableItem = ({ name, count }: TagsTableItemProps) => {
    return (
        <TableRow
            key={name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{count}</TableCell>
        </TableRow>
    );
};

export default TagsTableItem;
