import { React, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./Blog.css";

import { Navbaar } from "../../Containers";
import {
  HandleAddingBlog,
  HandleupdatingBlog,
  storage,
  ref,
} from "../../Firebase";
import { handleErrors } from "../../Utils";
import { loading } from "../../Assets";

export const CreateBlog = () => {
  const history = useHistory();
  // const logedinUserName = useSelector((state) => state?.userName);
  const logedinUserName = useSelector(
    (state) => state?.userData?.data.username
  );
  console.log(logedinUserName);
  const blogdata = useSelector((state) => state?.blogs);
  const blogidref = useSelector((state) => state?.blogid);
  const previousblog = blogdata.filter((item) => item.blogid === blogidref);
  const selectedBlog = blogdata.filter((x) => x.blogid === blogidref)[0];
  const [loader, setloader] = useState(false);

  const [description, setDescription] = useState({
    htmlValue: " ",
    editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(selectedBlog ? selectedBlog.Blogdetail : "")
      )
    ),
  });
  const [uploadprogress, setUploadprogress] = useState(0);
  const [Title, setTitle] = useState(selectedBlog ? selectedBlog.Title : "");
  const [Image, setImage] = useState("");
  const [imageAsUrl, setimageAsUrl] = useState(null);

  const onEditorStateChange = (editorValue) => {
    setDescription({
      htmlValue: draftToHtml(convertToRaw(editorValue?.getCurrentContent())),
      editorState: editorValue,
    });
  };
  console.log(imageAsUrl, "immmmmmmmmmmmmmmmmmmmmmmmmm");

  const HandleAddingBlogs = async (e) => {
    e.preventDefault();
    // setloader(true);
    try {
      if (Title !== "" && description !== "" && imageAsUrl) {
        await HandleAddingBlog(
          logedinUserName,
          Title,
          description?.htmlValue,
          imageAsUrl
        );
        toast.success("Blog Created");
        history.push("/blogs");
        setloader(false);
      } else {
        toast.warning("Please Fill all fileds");
      }
    } catch (error) {
      handleErrors(toast.error(error.message));
    }
    setloader(false);
  };

  const HandleUpdateBlog = async () => {
    try {
      if (
        Title && description && Image
          ? Image
          : previousblog.map((item) => item.image)
      ) {
        const res = uploadImage();
        console.log(res);
        await HandleupdatingBlog(
          Title,
          description.htmlValue,
          imageAsUrl ? imageAsUrl : previousblog.map((item) => item.image),
          blogidref
        );
        toast.success("Blog has been updated");
      } else {
        toast.warning("Please Fill all fileds");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadImage = () => {
    try {
      if (uploadprogress !== 100) {
        const storageRef = ref(
          storage,
          `images/${new Date().getTime()}` + Image?.name
        );
        const uploadimage = uploadBytesResumable(storageRef, Image, {
          contentType: "image/jpeg",
        });

        uploadimage.on(
          "state_changed",
          (snapshot) => {
            setUploadprogress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            toast.error(handleErrors(error));
          },
          () => {
            getDownloadURL(uploadimage.snapshot.ref).then((downloadURL) => {
              setimageAsUrl(downloadURL);
            });
          }
        );
      } else {
        toast.error("Image already uploaded");
      }
    } catch (error) {}
  };

  const onImageChange = (event) => {
    if (event?.target?.files && event?.target?.files[0]) {
      if (event?.target?.files[0].type === "image/jpeg") {
        console.log(event?.target?.files[0]);
        uploadImage();
        setImage(event?.target?.files[0]);
      } else {
        if (event?.target?.files[0].type !== "image/jpeg") {
          toast.error("Please choose image only", (event.target.value = null));
        }
      }
    }
  };

  return (
    <div>
      <Navbaar />
      <center>
        <h4>Create blog</h4>
        <br />
        {loader ? (
          <center>
            <img src={loading} className="loadinggif" alt="loader" />
          </center>
        ) : (
          <div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Title of your blog"
                  defaultValue={
                    previousblog
                      ? previousblog.map((item) => item.Title)[0]
                      : Title
                  }
                  name={previousblog.map((item) => item.Title)[0]}
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br />
              </div>
              <div className="cl">
                <input
                  type="file"
                  title="Choose a cover image"
                  name="myImage"
                  className="form-control w-75"
                  onChange={(event) => {
                    onImageChange(event);
                  }}
                />
              </div>
              {Image ? (
                <div className="imagepreview my-2">
                  {Image ? (
                    <>
                      <img
                        src={URL.createObjectURL(Image)}
                        alt="UploadedImage"
                      />
                      {/* <button className="btn uploabtn btn-primary" onClick={uploadImage} style={{ float: "lef" }}>
                    {uploadprogress ? uploadprogress === 100 ? "Uploaded" : String(uploadprogress).slice(0, 4) + "% Done" : "Upload"}</button> */}
                    </>
                  ) : null}
                </div>
              ) : (
                previousblog.map((item) => (
                  <div className="imagepreview my-2">
                    <img
                      src={item.image}
                      className="h-100 w-25"
                      alt="UploadedImage"
                    />
                  </div>
                ))
              )}
              {/* {Image ? <button className="btn add-btn btn-primary" onClick={uploadImage} style={{ float: "lef" }}>
                {uploadprogress ? uploadprogress === 100 ? "Uploaded" : String(uploadprogress).slice(0, 4) + "% Done" : "Upload"}</button> : null} */}
              <div className="mt-4">
                <Editor
                  toolbarHidden={false}
                  editorState={description.editorState}
                  value={description.htmlValue}
                  onEditorStateChange={onEditorStateChange}
                  placeholder=" Start Writing Here..."
                  wrapperClassName="editor"
                  wrapperStyle={{
                    maxHeight: 1000,
                    height: "400px",
                    overflow: "hidden",
                    border: "1px solid #ced4da",
                  }}
                />
              </div>
            </div>

            {selectedBlog ? (
              <button
                onClick={HandleUpdateBlog}
                className="btn add-btn my-3 btn-primary"
              >
                Update Blog
              </button>
            ) : (
              <button
                onClick={(e) => HandleAddingBlogs(e)}
                className="btn add-btn my-3 btn-primary"
              >
                Create Blog
              </button>
            )}
          </div>
        )}
      </center>
    </div>
  );
};
