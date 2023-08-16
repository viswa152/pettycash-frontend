
import React,{useEffect,useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {API} from '../API'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {useFormik} from 'formik'

const IncomeList = () => {
  
const [incomes,setIncomes]=useState([])
const [id,setId]=useState('')
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



const formik = useFormik({
  //initialize the income information values
  initialValues: { idate: null, check: "", desc: "", amount: 0 },
  validationSchema: incomeValidationSchema,//define the validation schema
  onSubmit: (inc) => {   
      //update the new income info
    const updateIncome={
    indate:inc.idate,
    check:inc.check,
    desc:inc.desc,
    amount:inc.amount
  }
  //update the new income to db
  fetch(`${API}/updatein/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" , "x-access-token": localStorage.getItem("token"),},
    body: JSON.stringify(updateIncome),
  }).then((res) => getincomes())

  togglePopup();
}
})

const getincomes=()=>{
  fetch(`${API}/cashinList`,{headers:{ "x-access-token": localStorage.getItem("token"),}}).then((res)=>res.json()).then((data)=>setIncomes(data))
}
useEffect(()=>{
 getincomes()
},[])
const getDate=(dt)=>
{
  var dateParts = dt.split("-");
        return (`${dateParts[2].split('T')[0]}-${dateParts[1]}-${dateParts[0]}`)
}

const handleDelete=(id)=>{
  fetch(`${API}/deletein/${id}`,{method:"DELETE",headers:{ "x-access-token": localStorage.getItem("token"),}}).then((res)=>getincomes())
}


const [isOpen, setIsOpen] = useState(false);
 
const togglePopup = () => {
  setIsOpen(!isOpen);
}
const tot=()=> {
  return incomes.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  
    <h5>Incomes List</h5>
        <Grid container spacing={3}>
        
        <Grid item sm={12} >
              <Paper
                sx={{
                  p:3,
                  display: 'grid',
                  gridTemplate: 'row',                  
                }}
              >
    
    <Table size="small">
       <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Check#</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
    
            {incomes.length>0?incomes.map((data)=>
           <TableRow key={data._id}>
            <TableCell>{getDate(data.indate)}</TableCell>
            <TableCell>{data.check}</TableCell>
            <TableCell>{data.desc}</TableCell>
            <TableCell>{data.amount}</TableCell>
            <TableCell>

          <IconButton color="warning" onClick={()=>{
            var dateParts = data.indate.split("-");
            formik.values.idate=`${dateParts[0]}-${dateParts[1]}-${dateParts[2].split('T')[0]}`
            formik.values.check=data.check
            formik.values.desc=data.desc
            formik.values.amount=data.amount
            formik.setTouched({}, false);
            setId(data._id);
            togglePopup()}}>
          <EditIcon />  
            </IconButton> 
        <IconButton  color="error" onClick={(e)=>handleDelete(data._id)}>
        <DeleteIcon />
        </IconButton>
      </TableCell>
            </TableRow>
            ): <TableRow><TableCell colSpan={4} align="center">No data Found</TableCell></TableRow>}
         
          <TableRow>
            <TableCell colSpan={3} align="right">Total Incomes</TableCell>
            <TableCell colSpan={2}>{tot()}</TableCell>
          </TableRow>
         
          </TableBody>
          </Table>
              </Paper>
        </Grid>
    
        
        </Grid>
        {isOpen?<div className="popup-box">
      <div className="box"   >
        <span className="close-icon" onClick={()=>togglePopup()}>x</span>
        <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     
    }}
  >

    <Typography component="h1" variant="h5">
      Update Income
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
        color="warning"
      >
        Update
      </Button>
     
    </Box>
  </Box>


      </div>
    </div>:""}

       </Container>
  )
}



export default IncomeList