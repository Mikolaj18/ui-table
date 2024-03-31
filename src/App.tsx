import TagsTable from "./components/TagsTable/TagsTable.tsx";
import {Box} from "@mui/material";

function App() {
    return (
        <Box>
            <Box sx={{width: "75%", display: "table", tableLayout: "fixed", m: "auto"}}>
                <TagsTable/>
            </Box>
        </Box>
    );
}

export default App
