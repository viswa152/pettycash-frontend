import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CIChart from "../components/CIChart";
import Amount from "../components/Amount";
import { Copyright } from "./Copyright";
import { API } from "../API";
const AddCharts = () => {
  //declare the required hooks
  const [opening, setOpening] = useState(0);
  const [Cin, setCin] = useState(0);
  const [Cout, setCout] = useState(0);
  const [food, setFood] = useState(0);
  const [stationery, setStationery] = useState(0);
  const [postage, setPostage] = useState(0);
  const [carriage, setCarriage] = useState(0);
  const [traveling, setTraveling] = useState(0);

  useEffect(() => {
    fetch(`${API}/getOb`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((ob) => setOpening(ob)); //get the opening balance
    fetch(`${API}/income`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((cin) => setCin(cin)); //get the Cash in balance
    fetch(`${API}/expense`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((cout) => setCout(cout)); //get the Cash out balance
    fetch(`${API}/foodamount`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((food) => setFood(food)); //get the total food category expense
    fetch(`${API}/stationeryamount`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((sta) => setStationery(sta)); //get the total stationery expense
    fetch(`${API}/postageamount`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((post) => setPostage(post)); //get the total postage expense
    fetch(`${API}/carriageamount`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((car) => setCarriage(car)); //get the total carriage expense
    fetch(`${API}/travelingamount`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((trav) => setTraveling(trav)); //get the total traveling expense
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item sm={12} xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 3,
              display: "grid",
              gridTemplate: "row",
              height: 565,
            }}
          >
            <Amount opening={opening} Cin={Cin} Cout={Cout} />
          </Paper>
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 3,
              display: "grid",
              gridTemplate: "row",
            }}
          >
            <CIChart
              Cin={Cin}
              Food={food}
              Stationery={stationery}
              Postage={postage}
              Carriage={carriage}
              Traveling={traveling}
            />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default AddCharts;
