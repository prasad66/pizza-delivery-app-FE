import React, { useState, useEffect } from "react";
import { Button, IconButton, Typography, TextField, Grid, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { API_URL } from "../../globalconstant.js";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cartproduct } from "./Cartproduct.js";
import { useHistory } from "react-router-dom";
import numeral from 'numeral';
export function Cart() {
  const [switchedit, setswitchedit] = useState(0);
  const data = JSON.parse(localStorage.getItem("user"));
  const id = data._id;
  const [products, setproducts] = useState();
  const getProducts = () => {
    fetch(`${API_URL}/pizzas/add-to-cart`, {
      method: "GET",
      headers: { "x-auth-token": id },
    })
      .then((data) => data.json())
      .then((cart) => {
        // console.log(cart);
        localStorage.removeItem("cart");
        localStorage.removeItem("includestax");
        setproducts(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      });
  };
  useEffect(getProducts, [id]);

  const removefrom = (_id) => {
    console.log(_id);
    fetch(`${API_URL}/pizzas/product/${_id}`, {
      method: "DELETE",
    }).then(() => getProducts());
  };
  const getamount = () => {
    Total();
    setswitchedit(1);
  };
  const Total = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
    // console.log(typeof cart);
    return cart
      ? cart
        .map((product) => product.totalamount)
        .reduce((curr, sum) => sum + curr, 0)
      : 0;
  };
  // console.log(Total());
  const [open, setopen] = useState(false);
  return products ? (
    <>
      <section className="cart-list">
        <div className="total">
          {switchedit === 0 && (
            <div className="d-flex ">
              <Typography variant="h5" display='inline'>Order confirmation:</Typography>
              <Button
                variant="contained"
                color="info"
                onClick={() => getamount()}
              >
                Place Order
              </Button>
            </div>
          )}
          {switchedit === 1 && (
            <div>
              <Typography variant="h4">Amount:</Typography>
              <Typography variant="h6">subtotal: {Total()}</Typography>
              <Typography variant="h6">
                Tax:{(14 / 100 + (4.5 / 100) * Total()).toFixed(2)}
              </Typography>
              <Typography variant="h6">
                Total:{14 / 100 + (4.5 / 100) * Total() + Total()}
              </Typography>
              <Button
                onClick={() => {
                  setopen((prev) => !prev);
                }}
                variant="contained"
                color="warning"
              >
                Pay Now
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setswitchedit(0);
                  window.location.reload();
                }}
                sx={{ marginLeft: '10px' }}
              >
                Edit Order
              </Button>
            </div>
          )}
        </div>
        <Typography variant="h5" sx={{ fontFamily: "Xuno" }}>
          My Cart🛒
        </Typography>
        <div className="cart-page">
          {
            !products ? "Cart Empty !!!":(
              <div className="cartpage">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                {products.map(
                  ({ productname, _id, image, varient, quantity, price }) => (
                    <Cartproduct
                      key={_id}
                      _id={_id}
                      productname={productname}
                      image={image}
                      varient={varient}
                      quantity={quantity}
                      price={price}
                      deleteButton={
                        <IconButton
                          onClick={() => removefrom(_id)}
                          className="movie-show-button"
                          color="error"
                          aria-label="delete movie"
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    />
                  )
                )}
              </Grid>
            </Box>
          </div>
            ) 
          }
         
        </div>
        <Paymentmodal open={open} setopen={setopen} />
      </section>
    </>
  ) : (
    <h5>No Items in your cart.please start shopping</h5>
  );
}

function Paymentmodal({ open, setopen }) {
  const history = useHistory();
  const username = localStorage.getItem("Username");
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [method, setMethod] = useState({});
  const paymentMethods = [
    { title: "Bank Transfer" },
    { title: "Cash" },
    { title: "Credit Card" },
    { title: "PayPal" },
    { title: "Others" },
  ];
  let date = new Date();
  // replace "/" with "."
  // toUTCString is a method to get a timestamp
  // date = date.toISOString();
  date = date.toLocaleString();
  const Total = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
    // console.log(typeof cart);
    return cart
      ? cart
        .map((product) => product.totalamount)
        .reduce((curr, sum) => sum + curr, 0)
      : 0;
  };
  console.log(cart);
  const includestax = Total() + 14 / 100 + (4.5 / 100) * Total();
  const handleSubmitPayment = () => {
    const data = {
      username: username,
      products: cart,
      amountPaid: includestax,
      datePaid: date,
      paymentMethod: method.title,
    };
    console.log(data);
    fetch(`${API_URL}/pizzas/payment`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      localStorage.removeItem("cart");
      history.push("/menu");
    });
  };
  return (
    <Dialog
      onClose={() => setopen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        style={{ paddingLeft: "20px", color: "inherit" }}
      >
        Payment
      </DialogTitle>
      <DialogContent dividers>
        <div className="my-3">
          <Typography variant="h6">
            <b>Amount to be paid:</b>
            {numeral(includestax).format('0,0.00')}
          </Typography>
          <Typography variant="h6">
            <b>Delivered to:</b>
            {user.contactAddress}
          </Typography>
          <Typography variant="h6">
            <b>Date:</b>
            {date}
          </Typography>
        </div>
        <Grid item spacing={5}>
          <Autocomplete
            id="combo-box-demo"
            options={paymentMethods}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => setMethod(value)}
            style={{ width: "96%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Payment Method"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleSubmitPayment();
          }}
          variant="contained"
          style={{ marginRight: "25px" }}
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
