import React from 'react'
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';


const Amount = ({opening,Cin,Cout}) => {

      
    return (
    <div>
    
     <Card sx={{backgroundColor:"green",p:2,m:2}}>
    <Typography component="p" variant="h4">
          {opening}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Opening Amount
          </Typography>
      </Card>
    <Card sx={{backgroundColor:"purple",p:2,m:2}}><Typography component="p" variant="h4">
   {Cin}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Cash In
          </Typography></Card>
    <Card sx={{backgroundColor:"blue",p:2,m:2}}><Typography component="p" variant="h4">
    {Cout}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
           Cash Out
          </Typography></Card>
    <Card sx={{backgroundColor:"darkorange",p:2,m:2}}><Typography component="p" variant="h4">
{opening+Cin-Cout}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
          Balance Amount
          </Typography></Card>

          </div>
  )
}




export default Amount;

