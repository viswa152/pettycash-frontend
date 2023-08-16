import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { API } from "../API";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Card, CardHeader, CardContent } from "@mui/material";

const Reports = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [opening, setOpening] = useState(0);
  const [Cin, setCin] = useState(0);
  const [Cout, setCout] = useState(0);
  const [company, setCompany] = useState(null);
  useEffect(() => {
    fetch(`${API}/cashinList`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setIncome(data));
    fetch(`${API}/cashoutList`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setExpense(data));
    fetch(`${API}/getOb`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((ob) => setOpening(ob));
    fetch(`${API}/income`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((cin) => setCin(cin));
    fetch(`${API}/expense`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((cout) => setCout(cout));
    fetch(`${API}/getcompany`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((com) => setCompany(com));
  }, []);

  const in_tot = () => {
    return income.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
  };
  const ex_tot = () => {
    return expense.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
   

      <Grid container spacing={3}>
        
        <Grid item sm={6}>
        <Card sx={{ m: "auto",p:3,mt:2}}>
        {company ? (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {company.name}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {company.address}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {company.contact}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {company.email}
            </Typography>
          </CardContent>
        ) : (
          ""
        )}
      </Card>
        </Grid>
        <Grid item sm={6}>
          <Card sx={{ backgroundColor: "green", p: 2, m: 2 }}>
            <Typography component="p" variant="h4">
              {opening}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Opening Amount
            </Typography>
          </Card>
          <Card sx={{ backgroundColor: "darkorange", p: 2, m: 2 }}>
            <Typography component="p" variant="h4">
              {opening + Cin - Cout}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Balance Amount
            </Typography>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Paper
            sx={{
              p: 3,
              display: "grid",
              gridTemplate: "row",
            }}
          >
            <h6>Incomes</h6>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Check#</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {income.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{getDate(data.indate)}</TableCell>
                    <TableCell>{data.check}</TableCell>
                    <TableCell>{data.desc}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    Total Incomes
                  </TableCell>
                  <TableCell colSpan={2}>{in_tot()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Paper
            sx={{
              p: 3,
              display: "grid",
              gridTemplate: "row",
            }}
          >
            <h6>Expenses</h6>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expense.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{getDate(data.edate)}</TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>{data.desc}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    Total Expense
                  </TableCell>
                  <TableCell colSpan={2}>{ex_tot()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

function getDate(dt) {
  var dateParts = dt.split("-");
  return `${dateParts[2].split("T")[0]}-${dateParts[1]}-${dateParts[0]}`;
}
export default Reports;
