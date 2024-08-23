import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//formik custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  const [redirect, setReirect] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const AuthFormSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username is too short.")
      .max(10, "Username is too long.")
      .required("Username is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Please enter a valid email."),
    password: Yup.string()
      .min(4, "Password is too short.")
      .required("Password is required."),
  });

  const submitHandler = async (values) => {
    const { email, password, username } = values;
    if (isLogin) {
      //login codes
    } else {
      const response = await fetch(`${import.meta.env.VITE_API}/register`, {
        method: "POST",
        body: JSON.stringify({ email, password, username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 201) {
        setReirect(true);
      } else if (response.status === 400) {
        const { errorMessages } = await response.json();
        const pickedMessage = errorMessages[0].msg;
        toast.error(pickedMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
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
        theme="light"
        transition={Slide}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={AuthFormSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form className="w-1/2 mx-auto">
            <h1 className="text-center font-semibold text-4xl my-4 text-teal-600">
              {isLogin ? "Login" : "Register"}
            </h1>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="username" className="font-medium block">
                  username
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="username" />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="font-medium block">
                email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="font-medium block">
                password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="password" />
            </div>
            <button
              className="text-white bg-teal-600 py-4 font-medium w-full text-center"
              type="submit"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
