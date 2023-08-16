import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StoreIcon from "@mui/icons-material/Store";
import Typography from "@mui/material/Typography";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Container from "@mui/material/Container";

//creating company validation schema
const companyValidationSchema = Yup.object({
  name: Yup.string().required("Company Name must be filled in"),
  address: Yup.string().required("Address must be filled in"),
  contact: Yup.string().required("Contact must be filled in"),
  email: Yup.string().email().required("Email must be filled in"),
});

const CompanyInfo = () => {
  const [company, setCompany] = useState(null);
  //get company information
  useEffect(() => {
    fetch(`${API}/getcompany`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
      });
  }, []);
  //pass the company info props
  return <div>{company ? <UpdateCompany company={company} /> : ""}</div>;
};
//function for updating company information
function UpdateCompany({ company }) {
  const navigate = useNavigate();
  const formik = useFormik({
    //initialize the company information from the props
    initialValues: {
      name: company.name,
      address: company.address,
      contact: company.contact,
      email: company.email,
    },
    validationSchema: companyValidationSchema, //define the validation schema
    onSubmit: (com) => {
      //assign the updated company info
      const updateCompany = {
        name: com.name,
        address: com.address,
        contact: com.contact,
        email: com.email,
      };
      //updating the company information to db
      fetch(`${API}/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(updateCompany),
      }).then((res) => navigate("/dashboard")); //redirect to dashboard);
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
          <StoreIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Company Info
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
                name="name"
                required
                fullWidth
                id="name"
                label="Company Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="text-danger text-left">
                  {formik.errors.name}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.address && formik.touched.address ? (
                <div className="text-danger text-left">
                  {formik.errors.address}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="contact"
                id="contact"
                label="Contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.contact && formik.touched.contact ? (
                <div className="text-danger text-left">
                  {formik.errors.contact}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                id="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger text-left">
                  {formik.errors.email}
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
}
export default CompanyInfo;
