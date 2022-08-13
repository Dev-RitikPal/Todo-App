import React from 'react'
import Button from "@mui/material/Button";

export const TodoForm = (props) => {
  return (
    <>
    <div className="form-group">
                        <label for="exampleInputEmail1">Add task</label>
                        <input
                          type="text"
                          name="todo"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeHolder="✍️ Create a new Task"
                          value={props.addtask || props.todo?.taskName}
                          autoComplete="off"
                          onChange={(e) => props.setAddtask(e.target.value)}
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
                          value={props.category || props.todo?.category}
                          onChange={(e) => props.setCategory(e.target.value)}
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
                          value={props.description || props.todo?.description}
                          onChange={(e) => props.setDescription(e.target.value)}
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
                        onClick={props.clearinputs}
                      >
                        Cancel
                      </button>
                      </>
  )
}