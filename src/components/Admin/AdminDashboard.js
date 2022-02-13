import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../globalconstant";
import { DashBar } from "./DashBar";


const AdminDashboard = () => {

  const history = useHistory();
  const [pizzas, setpizzas] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/pizzas`)
      .then((data) => data.json())
      .then((pizzas) => { setpizzas(pizzas); console.log(pizzas) });
  }, []);
  const Username = localStorage.getItem("Username");
  if (!Username) {
    history.push("/");
  }

  return (
    <>
    <DashBar />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ justifyContent: 'center', margin: '20px 5px 10px 15px' }}>
        <Grid item xs={12} md={6}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Available</th>
              </tr>
            </thead>
            <tbody>
              {
                pizzas.map((pizza, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{pizza.name}</td>
                    <td>{pizza.count}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default AdminDashboard