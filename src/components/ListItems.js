import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StoreIcon from '@mui/icons-material/Store';
import AddCardIcon from '@mui/icons-material/AddCard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
const ListItems = () => {
  const navigate=useNavigate()
 return( <React.Fragment>
    <ListItemButton  onClick={()=>navigate('/dashboard')} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/company')}>
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Company Details" />
    </ListItemButton>
    <ListItemButton  onClick={()=>navigate('/dashboard/openbalance')} >
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Setting" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/addin')}>
      <ListItemIcon>
        <AddCardIcon />
      </ListItemIcon>
      <ListItemText primary="Add Income" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/addout')}>
      <ListItemIcon>
        <AppRegistrationIcon />
      </ListItemIcon>
 
      <ListItemText primary="Add Expense" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/incomelist')}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Income List" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/expenselist')}>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Expense List" />
    </ListItemButton>
<ListItemButton onClick={()=>navigate('/dashboard/reports')}>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton onClick={()=>{localStorage.removeItem("token");
        navigate("/");}} >
      <ListItemIcon>
    <ExitToAppIcon />
    </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);
}

export default ListItems