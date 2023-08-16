import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCardIcon from '@mui/icons-material/AddCard';
import Typography from '@mui/material/Typography';
import {API} from '../API'
import {useNavigate} from 'react-router-dom'
import * as Yup from "yup";
import { useFormik } from "formik";
import Container from "@mui/material/Container";



const AddIncome = () => {
  const navigate=useNavigate()
//creating income validation schema
  const incomeValidationSchema = Yup.object({
    idate: Yup.date()
    .nullable()
    .required("Income Date must be filled in"),
    check: Yup.string().required("Checkno must be filled in"),
    desc: Yup.string().required("Description must be filled in"),
    amount: Yup.number().min(1).required("Amount must be filled in"),
  });
  var now = new Date();
  var month = (now.getMonth() + 1);               
  var day = now.getDate();
  if (month < 10) 
      month = "0" + month;
  if (day < 10) 
      day = "0" + day;
  var today = now.getFullYear() + '-' + month + '-' + day;

  const formik = useFormik({
    //initialize the income information values
    initialValues: { idate:today, check: "", desc: "", amount: 0 },
    validationSchema: incomeValidationSchema,//define the validation schema
    onSubmit: (inc) => {   
        //assign the new income info
      const newIncome={
      indate:inc.idate,
      check:inc.check,
      desc:inc.desc,
      amount:inc.amount
    }
    //Adding the new income to db
    fetch(`${API}/cashin`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"), },
      body: JSON.stringify(newIncome),
    }).then((res) => navigate('/dashboard'))//redirect to dashboard
    }
  })

 return (
  <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
    <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <AddCardIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      New Income
    </Typography>
    <Box component="form" noValidate  sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
  
    <Grid container spacing={2}>
    <Grid item xs={12}>
            <TextField
              type="date"
              id="idate"
              name="idate"
              label="Date"
              required
              fullWidth
              variant="filled"
              value={formik.values.idate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
             {formik.errors.idate && formik.touched.idate ? (
              <div className="text-danger text-left">{formik.errors.idate}</div>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="check"
              id="check"
              label="Check#"
              value={formik.values.check}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
              {formik.errors.check && formik.touched.check ? (
              <div className="text-danger text-left">{formik.errors.check}</div>
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
              <div className="text-danger text-left">{formik.errors.amount}</div>
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
              <div className="text-danger text-left">{formik.errors.desc}</div>
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

export default AddIncome;

