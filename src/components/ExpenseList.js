
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useFormik} from 'formik'
import * as Yup from 'yup'

const ExpenseList = () => {
  
const [Expenses,setExpenses]=useState([])
const [id,setId]=useState('')
const navigate=useNavigate()


  //creating expense validation schema
  const expenseValidationSchema = Yup.object({
    edate: Yup.date()
    .nullable()
    .required("Expense Date must be filled in"),
    category: Yup.string().required("Category must be select in"),
    desc: Yup.string().required("Description must be filled in"),
    amount: Yup.number().min(1).required("Amount must be filled in"),
  });

  const formik = useFormik({
       //initialize the expense information values
    initialValues: { edate: null, category: "", desc: "", amount: 0 },
    validationSchema: expenseValidationSchema,//define the validation schema
    onSubmit: (exp) => {
      console.log(exp)
         //update the new expense info
      const updateExpense = {
        edate: exp.edate,
        category: exp.category,
        desc: exp.desc,
        amount: exp.amount,
      };
        //update the new expense to db
        fetch(`${API}/updateout/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" ,"x-access-token": localStorage.getItem("token"), },
          body: JSON.stringify(updateExpense),
        }).then((res) => getExpenses())
      
       togglePopup();
    },
  });

const getExpenses=()=>{
  fetch(`${API}/cashoutList`,{headers:{"x-access-token": localStorage.getItem("token"),}}).then((res)=>res.json()).then((data)=>setExpenses(data))
}

useEffect(()=>{
 getExpenses()
},[])

const getDate=(dt)=>
{
  var dateParts = dt.split("-");
        return (`${dateParts[2].split('T')[0]}-${dateParts[1]}-${dateParts[0]}`)
}

const handleDelete=(id)=>{
  fetch(`${API}/deleteout/${id}`,{method:"DELETE",headers:{ "x-access-token": localStorage.getItem("token"),}}).then((res)=>getExpenses())
}




const [isOpen, setIsOpen] = useState(false);
 
const togglePopup = () => {
  setIsOpen(!isOpen);
}
const tot=()=> {
  return Expenses.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  
    <h5>Expenses List</h5>
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
              <TableCell>category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
    
            {Expenses.length>0?Expenses.map((data)=>
           <TableRow key={data._id}>
            <TableCell>{getDate(data.edate)}</TableCell>
            <TableCell>{data.category}</TableCell>
            <TableCell>{data.desc}</TableCell>
            <TableCell>{data.amount}</TableCell>
            <TableCell>
          
          <IconButton color="warning" onClick={()=>{
            var dateParts = data.edate.split("-");
            formik.values.edate=`${dateParts[0]}-${dateParts[1]}-${dateParts[2].split('T')[0]}`
            formik.values.category=data.category
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
            <TableCell colSpan={3} align="right">Total Expense</TableCell>
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
      Update Expense
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
              required
              fullWidth
              value={formik.values.edate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
             {formik.errors.edate && formik.touched.edate ? (
              <div className="text-danger text-left">{formik.errors.edate}</div>
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
              <div className="text-danger text-left">{formik.errors.category}</div>
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
          Update
        </Button>
      </Box>
  </Box>


      </div>
    </div>:""}

       </Container>
  )
}



export default ExpenseList

