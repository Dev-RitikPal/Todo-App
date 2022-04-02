import { accordionActionsClasses } from "@mui/material";

export const TodoReducer = (state = [], action) => {
  switch (action.type) {
    case "GetTodo":
      return action.tododata.data;
    default:
      return state;
  }
};

export const UserDataReducer = (state = [], action) => {
  switch (action.type) {
    case "GetUserdata":
      return action.userdata;
    default:
      return state;
  }
};

export const BlogdetailsReducer = (state = [], action) => {
  switch (action.type) {
    case "getBlogs":
      return action.blogsdetail.detail;
    default:
      return state;
  }
};

export const BlogidReducer = (state = [], action) => {
  switch (action.type) {
    case "blogid":
      return action.blogsdetail.detail;
    default:
      return state;
  }
};

export const AddTofavoriteBlogidReducer = (state = [], action) => {
  switch (action.type) {
    case "Add_To_favorite_blogid":
      return {state:[...state,action.favoriteblog]}
    default:
      return state;
  }
};