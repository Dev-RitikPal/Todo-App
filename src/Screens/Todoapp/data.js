import React, { useState, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
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
import { ExpandTask, ExpandTasks } from "./ExpnadTask";
import axios from "axios";
import { TodoTasks } from "./Todo";
import { ModalOpen } from "../../Components/Modal";
import { TodoForm } from "./TodoForm";

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
  const closeRef = useRef();
  const dispatch = useDispatch()
  const [updatedname, setUpdatedname] = React.useState();
  const [updateddesc, setUpdateddesc] = React.useState();
  const [openTask, setOpenTask] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const tododatadetail = useSelector((state) => state);

  const [updatetask, setUpdatetask] = useState({
    taskName: "",
    description: "",
    category: "",
  });

  const isActiveTodo = async (todoid) => {
    try {
      // UpdateActiveTodo(id);
      const data = {
        id: todoid,
        status: false,
      };
      const res = await axios.put("http://localhost:3003/updateTodo", data);
      getingdata();
      if (res) {
        //   setLoader(false)
        toast.success("Moved to Active");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const iscompletedTodo = async (id) => {
    // setLoader(true)
    try {
      const data = {
        id: id,
        status: true,
      };
      const res = await axios.put("http://localhost:3003/updateTodo", data);
      getingdata();
      //   setLoader(false)
      if (res) {
        toast.success("Task Completed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = async (id) => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
  
      const dummyData = {
        // id: "order_JpxTfQfTVi33pe",
        id: "",
        currency: "INR",
        amount: 49900,
      };
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
  
      dispatch(RazorpayAPI(1));
  
      const options = {
        // key: __DEV__ ? "rzp_test_gu5uk7JE2B15Ah" : "PRODUCTION_KEY",
        key: "rzp_test_gu5uk7JE2B15Ah",
        currency: dummyData.currency,
        amount: dummyData.amount.toString(),
        order_id: dummyData.id,
        name: "Donation",
        description: "Thank you for nothing. Please give us some money",
        // image: "http://localhost:1337/user.png",
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Donation Test",
          email: "donation@test.com",
          phone_number: "9899999999",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    // try {
    //   await axios.delete(`http://localhost:3003/deleteTodo/${id}`);
    //   getingdata();
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  return (
    <>
      {openTask && (
        <ExpandTask
          show={show}
          data={openTask}
          onHide={() => setShow(false)}
          updatetask={updatetask}
          getingdata={getingdata}
        />
      )}
      <div className="bg-dark">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <Tooltip
                  title="Delete task"
                  onClick={() => handleDeleteClick(todo._id)}
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
                      todo.status
                        ? isActiveTodo(todo._id)
                        : iscompletedTodo(todo._id)
                    }
                    checked={todo.status}
                  />
                </ListItemIcon>
                <ListItemText
                  onClick={() => {
                    setOpenTask(todo);
                    setShow(true);
                  }}
                  className="todo-task"
                >
                  {todo.taskName}
                </ListItemText>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </div>
    </>
  );
};
