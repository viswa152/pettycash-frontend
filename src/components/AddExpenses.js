import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const AddExpenses = () => {
  const navigate = useNavigate();
  //creating expense validation schema
  const expenseValidationSchema = Yup.object({
    edate: Yup.date().nullable().required("Expense Date must be filled in"),
    category: Yup.string().required("Category must be select in"),
    desc: Yup.string().required("Description must be filled in"),
    amount: Yup.number().min(1).required("Amount must be filled in"),
  });
  var now = new Date();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  var today = now.getFullYear() + "-" + month + "-" + day;
  const formik = useFormik({
    //initialize the expense information values
    initialValues: { edate: today, category: "", desc: "", amount: 0 },
    validationSchema: expenseValidationSchema, //define the validation schema
    onSubmit: (exp) => {
      //assign the new expense info
      const newExpense = {
        edate: exp.edate,
        category: exp.category,
        desc: exp.desc,
        amount: exp.amount,
      };
      //Adding the new expense to db
      fetch(`${API}/cashout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newExpense),
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
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Expense
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
                id="edate"
                name="edate"
                label="Date"
                variant="filled"
                required
                fullWidth
                value={formik.values.edate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.edate && formik.touched.edate ? (
                <div className="text-danger text-left">
                  {formik.errors.edate}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="select-category-label"
                  id="category"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Stationery">Stationery</MenuItem>
                  <MenuItem value="Postage">Postage</MenuItem>
                  <MenuItem value="Carriage">Carriage</MenuItem>
                  <MenuItem value="Traveling">Traveling</MenuItem>
                </Select>
              </FormControl>

              {formik.errors.category && formik.touched.category ? (
                <div className="text-danger text-left">
                  {formik.errors.category}
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="desc"
                id="desc"
                label="Description"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.desc && formik.touched.desc ? (
                <div className="text-danger text-left">
                  {formik.errors.desc}
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
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddExpenses;
