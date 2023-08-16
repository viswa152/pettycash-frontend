import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
const Forgot = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState({});
  const signUpValidationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: signUpValidationSchema,
    onSubmit: async (user) => {
      const Checkuser = {
        email: user.email,
      };
      const data = await fetch(`${API}/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Checkuser),
      }).then((res) => {
        return res.json();
      });
      setMsg(data);
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
      <h2>Forgot Password</h2>
      <p className="text-mute">
        Just enter your email address, and we will send you a link to reset your
        password.
      </p>
      {msg.status == "ok" ? (
        <div className="text-success">{msg.msg}</div>
      ) : (
        <div className="text-danger">{msg.error}</div>
      )}

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
      <button type="submit" className="btn btn-info btn-sm">
        Continue
      </button>
      <span>
        <button
          type="button"
          className="btn btn-link text-white "
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
        <button
          type="button"
          className="btn btn-link text-white"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </span>
    </form>
  );
};

export default Forgot;
