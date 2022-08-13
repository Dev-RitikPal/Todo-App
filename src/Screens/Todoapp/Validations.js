import { React, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  updateActiveTodo,
  updateCompletedTodo,
  handleDeletingTask,
  updatetaskname,
  updatetaskdesc,
  HandleDeletingTask,
  UpdateCompletedTodo,
  UpdateActiveTodo,
  Updatetaskname,
} from "../../Firebase";

export const Validation = ({ type, todo, getingdata, setLoader }) => {
  const tododatadetail = useSelector((state) => state);

  const [modaldata, setModaldata] = useState([]);
  const [updatedname, setUpdatedname] = useState();
  const [updateddesc, setUpdateddesc] = useState();

  const isActiveTodo = async (id) => {
    setLoader(true);
    try {
      UpdateActiveTodo(id);
      getingdata();
      setLoader(false);
      toast.success("Moved to Active");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const iscompletedTodo = async (id) => {
    setLoader(true);
    try {
      UpdateCompletedTodo(id);
      getingdata();
      setLoader(false);
      toast.success("Task Completed");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    setLoader(true);
    try {
      HandleDeletingTask(id);
      getingdata();
      setLoader(false);
      toast.success("Task deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updatetask = (id) => {
    if (updatedname) {
      try {
        Updatetaskname(id, updatedname);
        getingdata();
      } catch (error) {
        toast.error(error.message);
      }
    }
    if (updateddesc) {
      try {
        updatetaskdesc(id, updateddesc);
        getingdata();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div>
        <div key={todo._id} className="text">
          <input
            type="checkbox"
            className="all-checkbox"
            checked={todo.status === "Completed"}
            onClick={() =>
              todo.status === "Completed"
                ? isActiveTodo(todo.todoid)
                : iscompletedTodo(todo.todoid)
            }
          />
          {/* {console.log(todo)} */}
          <div>
            <span className="todo-task">
              {todo?.todo?.charAt(0)?.toUpperCase() + todo?.todo.slice(1)}
            </span>
          </div>
          <div className="container">
            <button
              className="btn btn-sm btn-danger px-2 mx-2 py-1"
              onClick={() => handleDeleteClick(todo.todoid)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target={`#${type}-${todo?.todoid}`}
              onClick={(e) =>
                setModaldata(
                  tododatadetail?.todos?.filter(
                    (taskid) => taskid?.todoid === todo?.todoid
                  )
                )
              }
            >
              <i className="fas fa-book-reader"></i>&nbsp;Read more
            </button>
          </div>
          <br />
        </div>
      </div>
      {/* <div className="modal fade" id={`${type}-${todo.todoid}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			  <div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
					<div className="modal-header">
						 <span className="modal-title " id="exampleModalLongTitle" style={{fontSize:"14px"}}>
							 <strong>Status : </strong>{modaldata.map((x)=>x.status)}<br/>
							 <strong>Category : </strong>{modaldata.map((x)=>x?.category?.charAt(0)?.toUpperCase() + x?.category.slice(1))}
							  </span>
						  <span aria-hidden="true" className="timedesc"><strong>Created</strong><br/> {modaldata.map((x)=>x.time)}, {modaldata.map((x)=>x.date)}</span>
					</div>
					<small id="emailHelp" className="form-text text-muted" style={{marginLeft:"15px", fontSize:"10px", float:"left" }}>You can edit your detail by clicking on them</small>
					<div className="modal-body">
					 <strong>Task</strong><br/><input value={(updatedname || updatedname === '') ? updatedname : modaldata.map((x)=> x.todo) } onChange={(e)=>(setUpdatedname(e.target.value))} className='modaltaskedit'/>
					 <span style={{wordBreak:"break-word"}}><strong>
						  Description</strong>
						  </span><br/>
					 <textarea value={(updateddesc || updateddesc === '') ? updateddesc : modaldata.map((x)=> x.description)} onChange={(e)=>(setUpdateddesc(e.target.value))} className='modaltaskdescedit'/>
					</div>
					<div className="modal-footer">
						 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						 <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>updatetask(todo.todoid)}>Save changes</button>
					</div>
					</div>
			  </div>
			  </div> */}
    </div>
  );
};
