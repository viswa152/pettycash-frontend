import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import * as Yup from "yup";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
//creating expense validation schema
const settingValidationSchema = Yup.object({
  odate: Yup.date().nullable().required("Setting Date must be filled in"),
  amount: Yup.number().min(1).required("Amount must be filled in"),
});
const Settings = () => {
  const [setting, setSetting] = useState(null);

  useEffect(() => {
    fetch(`${API}/getSetting`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setSetting(data));
  }, []);

  return <>{setting ? <OB ob={setting} /> : ""}</>;
};
function OB({ ob }) {
  const navigate = useNavigate();

  var dateParts = ob.odate.split("-");
  const formik = useFormik({
    //initialize the opening balance information from the props
    initialValues: {
      odate: `${dateParts[0]}-${dateParts[1]}-${dateParts[2].split("T")[0]}`,
      amount: ob.amount,
    },
    validationSchema: settingValidationSchema, //define the validation schema
    onSubmit: (open) => {
      //assign the new opening balance
      const newob = {
        odate: open.odate,
        amount: open.amount,
      };
      //updating the new opening balance to db
      fetch(`${API}/setting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newob),
      }).then((res) => navigate("/dashboard")); //redirect to dashboard
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AttachMoneyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Opening Balance
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="date"
                id="odate"
                name="odate"
               label="Date"
               variant="filled"
               required
                fullWidth
                autoFocus
                value={formik.values.odate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.odate && formik.touched.odate ? (
                <div className="text-danger text-left">
                  {formik.errors.odate}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.amount && formik.touched.amount ? (
                <div className="text-danger text-left">
                  {formik.errors.amount}
                </div>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="info"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Settings;
