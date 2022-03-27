import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  HandleDeletingTask,
  UpdateActiveTodo,
  UpdateCompletedTodo,
  updatetaskdesc,
  Updatetaskname,
} from "../../Firebase";
import { toast } from "react-toastify";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import "./Todo.css";
import { Validation } from "./Validations";
// import { ExpandTask, ExpandTasks } from "./ExpnadTask";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const CheckboxList = ({ todo, id, getingdata }) => {
  const [updatedname, setUpdatedname] = React.useState();
  const [updateddesc, setUpdateddesc] = React.useState();
  const [openTask, setOpenTask] = React.useState(false);
  const tododatadetail = useSelector((state) => state);

  const isActiveTodo = async (id) => {
    try {
      UpdateActiveTodo(id);
      getingdata();
      toast.success("Moved to Active");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const iscompletedTodo = async (id) => {
    try {
      UpdateCompletedTodo(id);
      getingdata();
      toast.success("Task Completed");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      HandleDeletingTask(id);
      getingdata();
      toast.success("Task deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {openTask ? (
        <>
          <CloseIcon
            onClick={() => setOpenTask(false)}
            style={{ float: "right" }}
          /><br/><br/>
          <Validation todo={todo} getTodoData={getingdata} />
        </>
      ) : (
        <div className="bg-dark">
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <Tooltip
                    title="Delete task"
                    onClick={() => handleDeleteClick(todo.todoid)}
                  >
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              }
              disablePadding
            >
              <Tooltip title="Click to read more">
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      onClick={() =>
                        todo.status === "Completed"
                          ? isActiveTodo(todo.todoid)
                          : iscompletedTodo(todo.todoid)
                      }
                      checked={todo.status === "Completed"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    onClick={() =>
                      setOpenTask(
                        tododatadetail?.todos?.filter(
                          (taskid) => taskid?.todoid === todo?.todoid
                        )
                      )
                    }
                    className="todo-task"
                  >
                    {todo.todo}
                  </ListItemText>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </div>
      )}
    </>
  );
};
