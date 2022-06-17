import { IconButton } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

export type IActions = {
  deleteItem: () => void;
  updateItem: () => void;
  viewItem: () => void;
};

const Actions = ({ deleteItem, updateItem, viewItem }: IActions) => {
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
  );
};

export default Actions;
