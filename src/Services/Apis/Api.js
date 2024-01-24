export const getENVString = (url) => {
  const res = process.env[`REACT_APP_${url}`];
  if (res === undefined) {
    throw Error("Invalid url");
  } else {
    return res;
  }
};

export const BACKEND_URL = getENVString("http://localhost:3003");
