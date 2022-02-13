import React, { useState } from "react";
import { Button, Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { API_URL } from "../../globalconstant.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import numeral from 'numeral'


export function Pizza({ pizza, index }) {
  const [open, setOpen] = useState(false);
  const [Msg, setMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");
  const username = localStorage.getItem("Username");
  const total = pizza.prices[0][varient] * quantity;
  const addtocart = (pizza, varient, quantity) => {
    const price = pizza.prices[0][varient];
    const data = {
      productname: pizza.name,
      image: pizza.image,
      varient: varient,
      quantity: quantity,
      price: price,
      totalamount: quantity * price,
      username: username,
    };
    // console.log(data);
    fetch(`${API_URL}/pizzas/add-to-cart`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        setMsg({ msg: "added to cart successfully", status: "success" });
        setOpen(true);
      }
    });
  };
  return (
    <Grid spacing={5} item xs={12} sm={6} md={3}>
      <Card
        key={index}
        sx={{
          maxWidth: "340px",
          padding: "25px",
          margin: "10px",
          backgroundColor: "#f3f0f0",
          borderRadius: "15px",
          boxShadow: 3

        }}
        className="text-center"
      >
        <Typography gutterBottom variant="h6" component="div" sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          {pizza.name}
        </Typography>
        <div className="text-center">
          <div className="img-container my-2">
            {/* <img
              src={pizza.image}
              className="img-fluid"
              style={{ height: "200px", width: "200px" }}
              alt={pizza.name}
            /> */}
            <CardMedia
              component="img"
              sx={{ height: "200px", width: "200px", margin: "10px 0" }}
              height="200"
              image={pizza.image}
              alt={pizza.name}
            />
          </div>
          <div className="flex-container">
            <div className="varients">
              {/* <Typography varient="h6">Varients : </Typography> */}
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select">varient</InputLabel>
                <Select
                  // id="demo-simple-select-standard"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={varient}
                  // label="varient"
                  onChange={(e) => {
                    setvarient(e.target.value);
                  }}
                >
                  {pizza.varients.map((varient) => {
                    return <MenuItem value={varient}>{varient}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="quantity">
              {/* <Typography varient="h6">Quantity : </Typography> */}
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select">Quantity</InputLabel>
                <Select
                  // label="Quantity"
                  value={quantity}
                  onChange={(e) => {
                    setquantity(e.target.value);
                  }}
                >
                  {[...Array(10).keys()].map((x, i) => {
                    return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flexcontainer">
            <div className="my-2">
              <Typography variant="h5">
                <Typography variant="overline" display="inline" gutterBottom sx={{ marginRight: '5px' }}>
                  INR
                </Typography>
                {numeral(total).format('₹0,0.00')}
              </Typography>
            </div>
            <Button
              size="medium"
              variant="contained"
              onClick={() => addtocart(pizza, varient, quantity)}
            >
              Add to Cart  <AddShoppingCartIcon fontSize="small" sx={{ marginLeft: '10px' }} />
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={Msg.status}
            sx={{ width: "100%" }}
          >
            {Msg.msg}
          </Alert>
        </Snackbar>
      </Card>
    </Grid>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
