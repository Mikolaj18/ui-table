import React, {useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Box, Button} from "@mui/material";

type RowsPerPageInputProps = {
    setItemsPerPage:  React.Dispatch<React.SetStateAction<number>>,
    setPage:  React.Dispatch<React.SetStateAction<number>>,
}

const ItemsPerPageInput = ({setItemsPerPage, setPage}: RowsPerPageInputProps) => {
    const fieldRef = useRef(document.createElement('input'));
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        const inputValue = parseInt(fieldRef.current.value);
        if (inputValue <= 0 || isNaN(inputValue)) {
            setError(true);
            console.log(inputValue);
        } else {
            setError(false);
            setItemsPerPage(inputValue);
            setPage(0);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3}}
        >
            <Box sx={{m: 1}}>
            <TextField
                label="Items per page"
                type="number"
                inputRef={fieldRef}
                error={error}
                helperText={error ? 'Enter a valid number' : ''}
            />
            </Box>

            <Box sx={{m: 1}}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default ItemsPerPageInput;
