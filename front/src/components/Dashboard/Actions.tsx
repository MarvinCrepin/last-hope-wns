import { IconButton } from "@mui/material"
import { IoMdEye } from "react-icons/io"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { TiDelete } from "react-icons/ti"
import { useMutation } from "@apollo/client";
import DeleteUser from "../../queries/User/DeleteUser"
import { User } from "../global";
import UpdateUser from "../../queries/User/UpdateUser";

export type IActions = {
    deleteItem: () => void
    updateItem: () => void
    viewItem: () => void
}


const Actions = ({deleteItem, updateItem, viewItem}: IActions) => {
    return (
        <div>
        <IconButton
        size="small"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        >
        <IoMdEye className="text-lh-dark text-4xl" />
        </IconButton>
        <IconButton 
        onClick={() => deleteItem()} 
        size="small"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        >
        <TiDelete className="text-lh-primary text-4xl" />
        </IconButton>
        </div>
    )
}

export default Actions;