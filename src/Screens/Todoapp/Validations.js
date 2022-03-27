import moment from "moment";
import { React, useEffect, useRef, useState } from "react";
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


export const Validation = ({ todo, getTodoData }) => {
  const [updatedname, setUpdatedname] = useState(todo?.todo);
  const [updateddesc, setUpdateddesc] = useState(todo?.description);
  const data = useSelector((state) => state?.todos);

  const updatetask = async () => {
    // if (updatedname) {
      try {
        const response = await Updatetaskname(todo?.todoid, updatedname, updateddesc);
        toast.success('Task updated');
      } catch (error) {
        toast.error(error.message);
      }
  };

  return (
    <div>
		<div className="modal-content">
		<div className="modal-header">
            <div style={{textAlign:"justify"}}>
				 <strong>Status : </strong>{todo?.status || "N/A"}<br/>
				 <strong>Category : </strong>{todo?.category?.charAt(0)?.toUpperCase() + todo?.category?.slice(1) || "N/A"}
            </div>
			  <span aria-hidden="true" className="timedesc"><strong>Created : </strong>{todo?.time}, {todo?.date}</span>
		</div>
		<small className="form-text text-muted" style={{marginLeft:"15px", fontSize:"10px", float:"left" }}>You can edit your detail by clicking on them</small>
		<div className="modal-body">
		 <strong style={{float:"left"}}>Task : </strong><input value={updatedname || "N/A"} onChange={(e)=>(setUpdatedname(e.target.value))} className='modaltaskedit'/>
		 <br/><br/>
         <span style={{wordBreak:"break-word", float:"left"}}><strong>
			  Description : </strong>
			  </span>
		 <textarea value={updateddesc || "N/A"} onChange={(e)=>(setUpdateddesc(e.target.value))} className='modaltaskdescedit'/>
		</div>
        <button
              type="button"
              className="btn btn-sm btn-primary w-25"
              onClick={updatetask}
              >
              Update
            </button>
            <br/>
		</div>
    </div>
  );
};
