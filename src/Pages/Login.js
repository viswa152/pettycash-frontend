import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const signUpValidationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("No password provided.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signUpValidationSchema,
    onSubmit: async (user) => {
      const Checkuser = {
        email: user.email,
        password: user.password,
      };
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Checkuser),
      }).then((res) => {
        return res.json();
      });
      if (res.user) {
        setUser("");
        localStorage.setItem("token", res.user);
        navigate("/dashboard");
      } else {
        setUser(res.error);
      }
    },
  });
  return (
    <form
      className="card bg-transparent col-sm-6 col-md-6 col-lg-4 col-xs-6 form-container "
      onSubmit={formik.handleSubmit}
    >
      <h1>
        <i className="fa fa-user text-info" />
      </h1>
      <h2>Login</h2>
      <label id="err" className="text-danger">
        {user}
      </label>
      <div className="form-group text-left">
        {formik.errors.email && formik.touched.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : (
          <label htmlFor="email">Email</label>
        )}
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className="form-group text-left">
        {formik.errors.password && formik.touched.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : (
          <label htmlFor="password">Password</label>
        )}
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <button type="submit" className="btn btn-info">
        Submit
      </button>
      <span className="pt-4">
        {" "}
        <button
          type="button"
          className="btn btn-link text-white px-2"
          onClick={() => navigate("/forgot")}
        >
          Forgot Password?
        </button>
        <button
          type="button"
          className="btn btn-link text-white"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </span>
     
        Demo Credentials:
        <span> 
        <i className="fa fa-envelope p-2"></i>pcmdemo@gmail.com
        <i className="fa fa-unlock p-2"></i>Password@123
        </span>
    </form>
  );
};

export default Login;
