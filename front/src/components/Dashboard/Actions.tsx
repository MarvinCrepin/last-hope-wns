import { IconButton } from "@mui/material"
import { IoMdEye } from "react-icons/io"
import { MdOutlineModeEdit } from "react-icons/md"
import { TiDelete } from "react-icons/ti"


export default function Actions()  {
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
    size="small"
    edge="end"
    aria-label="account of current user"
    aria-haspopup="true"
    >
    <MdOutlineModeEdit className="text-lh-dark text-4xl" />
    </IconButton>
    <IconButton
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
