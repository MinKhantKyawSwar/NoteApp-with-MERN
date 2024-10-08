import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useContext, useEffect, useRef, useState } from "react";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//formik custom error message
import StyledErrorMessage from "./StyledErrorMessage";

import { UserContext } from "../contexts/UserContext";

const NoteForm = ({ isCreate }) => {
  const { token } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef();

  const { id } = useParams();

  const getOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (response.status === 200) {
      const note = await response.json();
      setOldNote(note);
    } else {
      setRedirect(true);
    }
  };

  useEffect((_) => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    note_id: isCreate ? "" : oldNote._id,
    cover_image: isCreate ? null : oldNote.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required."),
    content: Yup.string()
      .min(5, "Content is too short.")
      .required("Content is required."),
    cover_image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not supported.",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImage = (setFieldValue) => {
    setPreviewImage(null);
    setFieldValue("cover_image", null);
    if (isCreate) {
      fileRef.current.value = "";
    }
  };

  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;

    let method = "";

    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
      method = "post";
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
      method = "put";
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);

    const response = await fetch(API, {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (response.status === 201 || response.status == 200) {
      setRedirect(true);
    } else {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create New Note" : "Edit Your Note"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue, isSubmitting }) => (
          <Form encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="font-medium block">
                Note Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="title" />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="font-medium block">
                Note Content
              </label>
              <Field
                as="textarea"
                rows={4}
                type="text"
                name="content"
                id="content"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="content" />
            </div>
            <Field type="text" name="note_id" id="note_id" hidden />
            <div className="mb-5">
              <div className="flex items-center justify-between">
                <label htmlFor="cover_image" className="font-medium block">
                  Cover Image{" "}
                  <span className="text-xs font-medium"> (optional)</span>
                </label>

                {previewImage && (
                  <p
                    className="text-base font-medium text-teal-600 cursor-pointer"
                    onClick={(_) => {
                      clearPreviewImage(setFieldValue);
                    }}
                  >
                    Clear
                  </p>
                )}
                {isUpload ? (
                  <>
                    <p
                      className="text-base font-medium text-teal-600 cursor-pointer"
                      onClick={(_) => setIsUpload(false)}
                    >
                      Disable Cover Image
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className="text-base font-medium text-teal-600 cursor-pointer"
                      onClick={(_) => setIsUpload(true)}
                    >
                      Upload Cover Image
                    </p>
                  </>
                )}
              </div>

              {isUpload && (
                <>
                  <input
                    type="file"
                    name="cover_image"
                    hidden
                    ref={fileRef}
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                  <div
                    className="border border-teal-600 flex items-center justify-center text-teal-600 border-dashed h-60 cursor-pointer rounded-lg relative overflow-hidden"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <ArrowUpTrayIcon
                      width={40}
                      height={40}
                      className="z-20 font-bold"
                    />
                    {isCreate ? (
                      <>
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt={"preview"}
                            className="w-full absolute top-0 left-0 h-full object-cover opacity-70 z-10"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <img
                          src={
                            previewImage
                              ? previewImage
                              : `${import.meta.env.VITE_API}/${
                                  oldNote.cover_image
                                }`
                          }
                          alt={"preview"}
                          className="w-full absolute top-0 left-0 h-full object-cover opacity-70 z-10"
                        />
                      </>
                    )}
                  </div>
                </>
              )}
              <StyledErrorMessage name="cover_image" />
            </div>
            <button
              className="text-white bg-teal-600 py-4 font-medium w-full text-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isCreate
                ? `${isSubmitting ? "Uploading..." : "Share Note"}`
                : `${isSubmitting ? "Updating..." : "Update Note"}`}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
