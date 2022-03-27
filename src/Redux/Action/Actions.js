export const GetTodo = (data) => {
  return {
    type: "GetTodo",
    tododata: {
      data: data,
    },
  };
};

export const GetUserData = (data) => {
  return {
    type: "GetUserdata",
    userdata: {
      data: data,
    },
  };
};

export const getBlogs = (data) => {
  return {
    type: "getBlogs",
    blogsdetail: {
      detail: data,
    },
  };
};

export const getBlogid = (data) => {
  return {
    type: "blogid",
    blogsdetail: {
      detail: data,
    },
  };
};
