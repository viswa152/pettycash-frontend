import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../API";
const ChangePWD = () => {
  const navigate = useNavigate();
  const { userid, token } = useParams();
  const [msg, setMsg] = useState("");
  const signUpValidationSchema = Yup.object({
    password: Yup.string()
      .required("No password provided.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    cPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: signUpValidationSchema,
    onSubmit: async (user) => {
      const newPassword = {
        password: user.password,
      };
      const data = await fetch(`${API}/password-reset/${userid}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      }).then((res) => {
        return res.json();
      });
      formik.values.password = "";
      formik.values.cPassword = "";
      setMsg(data);
      setTimeout(() => navigate("/"), 1000);
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
      <h2>Password Reset</h2>
      {msg.status == "ok" ? (
        <div className="text-success">{msg.msg}</div>
      ) : (
        <div className="text-danger">{msg.error}</div>
      )}
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
      <div className="form-group text-left">
        {formik.errors.cPassword && formik.touched.cPassword ? (
          <div style={{ color: "red" }}>{formik.errors.cPassword}</div>
        ) : (
          <label htmlFor="cPassword">Confirm Password</label>
        )}
        <input
          type="password"
          className="form-control"
          id="cPassword"
          name="cPassword"
          value={formik.values.cPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <button type="submit" className="btn btn-info">
        Update
      </button>
    </form>
  );
};

export default ChangePWD;
