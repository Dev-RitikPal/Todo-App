import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "./Todo.css";

export const ExpandTask = (props) => {
  const { show, data, getingdata } = props;
  const closeRef = useRef();
  const [showModal, setShowModal] = useState(show);
  const [updatetask, setUpdatetask] = useState({
    taskName: data?.taskName,
    description: data?.description,
    category: data?.category,
  });

  const handleUpdateTask = async () => {
    try {
      const updatedData = {
        id: data._id,
        taskName: updatetask.taskName,
        description: updatetask.description,
        category: updatetask.category,
      };
      const res = await axios.put(
        "http://localhost:3003/updateTodosData",
        updatedData
      );
      setShowModal(false);
      getingdata();
      console.log(
        "🚀 ~ file: ExpnadTask.js ~ line 20 ~ handleUpdateTask ~ res",
        res
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: ExpnadTask.js ~ line 27 ~ handleUpdateTask ~ error",
        error
      );
    }
  };

  const handleChange = (key, value) => {
    switch (key) {
      case "name":
        return setUpdatetask({
          ...updatetask,
          taskName: value,
        });
      case "category":
        return setUpdatetask({
          ...updatetask,
          category: value,
        });
      case "desc":
        return setUpdatetask({
          ...updatetask,
          description: value,
        });
      default:
        break;
    }
  };

  return (
    <Modal
      show={showModal}
      // {...props}
      size="small"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-content">
        <div>
          <CloseIcon
            className="m-3 float-right cur-p"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">
            <strong>Update Task</strong>
          </h5>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <b>Name</b>
            <input
              type="text"
              name="todo"
              className="form-control mt-1"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeHolder="✍️ Create a new Task"
              value={updatetask.taskName}
              autoComplete="off"
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              Schedule your day, according to time.
            </small>
          </div>
          <div className="form-group my-2">
            <b for="exampleInputPassword1">Category</b>
            <input
              type="text"
              className="form-control mt-1"
              id="exampleInputPassword1"
              placeholder="Example : Health"
              value={updatetask.category}
              onChange={(e) => handleChange("category", e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group my-2">
            <b>Description</b>
            <textarea
              type="text"
              className="form-control mt-1"
              id="exampleInputPassword1"
              placeholder="Add description of your task"
              value={updatetask.description}
              onChange={(e) => handleChange("desc", e.target.value)}
              autoComplete="off"
            ></textarea>
          </div>
          <Button
            type="button"
            className="btn btn-primary width-15 mt-3"
            data-dismiss="modal"
            onClick={() => setShowModal(false)}
          >
            update
          </Button>
        </div>
      </div>
    </Modal>
  );
};
