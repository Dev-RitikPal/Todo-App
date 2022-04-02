import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

import "./Todo.css";

import { loading } from "../../Assets";
import { Navbaar } from "../../Containers";
import { handleErrors } from "../../Utils";
// import { Validation } from "./Validations";
import { addTodos, GetUsertodoData } from "../../Firebase";
import { GetTodo, searchkeyword } from "../../Redux";

import { RenderAllTask } from "./RenderAllTask";

export const TodoTasks = () => {
  const closeRef = useRef();
  const data = useSelector((state) => state?.todos);
  const history = useHistory();
  const dispatch = useDispatch();

  const [addtask, setAddtask] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);

  const GetingUserTododata = async () => {
    try {
      const res = await GetUsertodoData();
      if (res) {
        dispatch(GetTodo(res));
      } else {
        toast.error("User doesn't exists");
      }
    } catch (error) {
      toast.error(handleErrors(error));
    }
  };

  useEffect(() => {
    GetingUserTododata();
  }, [data]);
  
  const HandleAddingTask = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (addtask) {
      try {
        const res = await addTodos(addtask, category, description);
        closeRef.current.click();
        if (res) {
          GetingUserTododata();
          toast.success("Task Created ~ " + addtask);
        } else {
          toast.warning("Try again");
        }
      } catch (error) {
        toast.error(handleErrors(error));
      }
    } else {
      toast.warning("Task Not Given");
    }
    setLoader(false);
    setAddtask("");
    setDescription("");
    setCategory("");
    localStorage.setItem("pageID", 2);
  };

  const clearinputs = () => {
    setAddtask("");
    setCategory("");
    setDescription("");
  };

  return (
    <>
      <Navbaar />
      <br />
      <br />
      <div className="h-100 ">
        <div className="main-div h-100%">
          <br />
          <h1 style={{color:"white"}}>ToDo-App</h1>
          <br />
          <div className="App">
            <br />
            <button
              type="button"
              className="btn add-btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalLong"
            >
              <i className="fas fa-plus"></i>&nbsp;Add Task
            </button>
            <input
              type="search"
              id="form1"
              className="form-control w-25 search-label"
              placeholder="Search by Task Name, Category or Date."
              aria-label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div
              className="modal fade"
              ref={closeRef}
              id="exampleModalLong"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLongTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      <strong>Add Task</strong>
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(e) => HandleAddingTask(e)}>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Add task</label>
                        <input
                          type="text"
                          name="todo"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeHolder="✍️ Create a new Task"
                          value={addtask}
                          autoComplete="off"
                          onChange={(e) => setAddtask(e.target.value)}
                        />

                        <small id="emailHelp" className="form-text text-muted">
                          Schedule your day, according to time.
                        </small>
                      </div>
                      <div className="form-group my-2">
                        <label for="exampleInputPassword1">Category</label>
                        <input
                          type="text"
                          className="form-control "
                          id="exampleInputPassword1"
                          placeholder="Example : Health"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                      <div className="form-group my-2">
                        <label for="exampleInputPassword1">Description</label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Add description of your task"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          autoComplete="off"
                        ></textarea>
                      </div>
                      <br />
                      <Button
                        variant="contained"
                        className="btn-sm btn-primary"
                        type="submit"
                      >
                        Add
                      </Button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                        onClick={clearinputs}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <hr style={{border: "0.5px solid", color:"aliceblue"}}/>
          <center>
            <RenderAllTask search={search} GetingUserTododata={GetingUserTododata} />
          </center>
        </div>
      </div>
    </>
  );
};
