import {Alert} from "@mui/material";

type MessageProps = {
    text: string,
    severity: "success" | "info" | "warning" | "error",
}
const Message = ({severity, text}: MessageProps) => {
    return (
        <Alert severity={severity}>{text}</Alert>
    );
}

export default Message;