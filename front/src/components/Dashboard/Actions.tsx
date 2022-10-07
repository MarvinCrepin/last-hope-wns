import { IconButton } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

export type IActions = {
  deleteItem: () => void;
};

const Actions = ({ deleteItem }: IActions) => {
  return (
    <div>
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
