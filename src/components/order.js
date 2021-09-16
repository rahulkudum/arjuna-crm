import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import ResponsiveDrawer from "./ui/drawer";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
 root: {
  display: "flex",
 },
 root2: {
  flexGrow: 1,
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
 toolbar: theme.mixins.toolbar,
 formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
 },
 backdrop: {
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
 },
}));

function OrderList() {
 const classes = useStyles();
 const [orderList, setOrderList] = useState([]);
 const [orderList1, setOrderList1] = useState([]);
 const [orderList2, setOrderList2] = useState([]);
 const [start1, setStart1] = useState(0);
 const [start2, setStart2] = useState(0);
 const [backdrop, setBackdrop] = useState(false);
 const [open1, setOpen1] = useState(false);
 const [open2, setOpen2] = useState(false);
 const [date1, setDate1] = useState(new Date().toISOString().slice(0, 10));
 const [date2, setDate2] = useState(new Date().toISOString().slice(0, 10));

 useEffect(() => {
  setBackdrop(true);
  axios
   .get("https://arjunadb.herokuapp.com/payment")
   .then((res) => {
    console.log(res.data);
    let orderlist1 = [];
    let orderlist2 = [];
    for (let i = 0; i < res.data.length; i++) {
     if (!res.data[i].process) orderlist1.push(res.data[i]);
     else orderlist2.push(res.data[i]);
    }
    setOrderList(res.data);
    setOrderList1(orderlist1);
    setOrderList2(orderlist2);
    setBackdrop(false);
   })
   .catch((err) => {
    console.log(err);
   });
 }, []);

 function popup(val) {
  console.log(val);
 }

 return (
  <>
   <Backdrop className={classes.backdrop} open={backdrop}>
    <CircularProgress color="inherit" />
   </Backdrop>
   <div className={classes.root}>
    <ResponsiveDrawer />

    <main className={classes.content}>
     <div className={classes.toolbar} />
     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h3>Orders to be placed</h3>
      <button
       className="btn btn-success"
       onClick={() => {
        setOpen1(true);
       }}
      >
       Search by Date
      </button>
     </div>
     <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
       <thead class="table-success">
        <tr>
         <th scope="col">#</th>
         <th scope="col">Order ID</th>
         <th scope="col">Name</th>
         <th scope="col">Ph No</th>
         <th scope="col">Email</th>
         <th scope="col">Books</th>
         <th scope="col">Amount</th>
         <th scope="col">Date</th>
         <th scope="col">Address</th>
         <th scope="col">Place</th>
        </tr>
       </thead>
       <tbody>
        {orderList1.map((val, i) => {
         if (i >= start1 && i <= start1 + 9) {
          return (
           <tr>
            <th
             onClick={() => {
              popup(val);
             }}
             scope="row"
            >
             {i + 1}
            </th>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.orderid}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.name}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.phno}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.email}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
             style={{ whiteSpace: "pre-line" }}
            >
             {val.books}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.amount / 100}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.date}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.address}
            </td>

            <td>
             <button
              type="button"
              class="btn"
              style={{ color: "blue" }}
              onClick={() => {
               setBackdrop(true);
               axios
                .post("https://arjunadb.herokuapp.com/payment/process", { id: val._id })
                .then((res) => {
                 console.log(res);
                 let orderlist1 = [];
                 let orderlist2 = [];

                 setOrderList((prev) => {
                  let dummy = [...prev];

                  for (let i = 0; i < dummy.length; i++) {
                   if (dummy[i]._id === val._id) {
                    dummy[i].process = true;
                    break;
                   }
                  }

                  return dummy;
                 });

                 for (let i = 0; i < orderList.length; i++) {
                  if (!orderList[i].process) orderlist1.push(orderList[i]);
                  else orderlist2.push(orderList[i]);
                 }

                 setOrderList1(orderlist1);
                 setOrderList2(orderlist2);

                 setBackdrop(false);
                })
                .catch((err) => console.log(err));
              }}
             >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
               <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
              </svg>
             </button>
            </td>
           </tr>
          );
         }
        })}
       </tbody>
      </table>
     </div>
     <p style={{ textAlign: "center" }}>
      <button
       className="btn"
       style={{ color: "green" }}
       onClick={() => {
        setBackdrop(true);
        axios
         .get("https://arjunadb.herokuapp.com/payment")
         .then((res) => {
          console.log(res.data);
          let orderlist1 = [];
          let orderlist2 = [];
          for (let i = 0; i < res.data.length; i++) {
           if (!res.data[i].process) orderlist1.push(res.data[i]);
           else orderlist2.push(res.data[i]);
          }
          setOrderList(res.data);
          setOrderList1(orderlist1);
          setOrderList2(orderlist2);
          setBackdrop(false);
         })
         .catch((err) => {
          console.log(err);
         });
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
       </svg>
      </button>
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start1 === 0) {
         setStart1(orderList1.length - (orderList1.length % 10));
        } else {
         setStart1(start1 - 10);
        }
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
        <path
         fill-rule="evenodd"
         d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
       </svg>
      </button>
      Displaying {start1 + 1} - {start1 + 10 > orderList1.length ? orderList1.length : start1 + 10} of {orderList1.length}{" "}
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start1 + 10 > orderList1.length) {
         setStart1(0);
        } else {
         setStart1(start1 + 10);
        }
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
        <path
         fill-rule="evenodd"
         d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
        />
       </svg>
      </button>
      <button
       className="btn"
       style={{ color: "green" }}
       onClick={() => {
        setBackdrop(true);
        axios
         .get("https://arjunadb.herokuapp.com/payment")
         .then((res) => {
          console.log(res.data);
          let orderlist1 = [];
          let orderlist2 = [];
          for (let i = 0; i < res.data.length; i++) {
           if (!res.data[i].process) orderlist1.push(res.data[i]);
           else orderlist2.push(res.data[i]);
          }
          setOrderList(res.data);
          setOrderList1(orderlist1);
          setOrderList2(orderlist2);
          setBackdrop(false);
         })
         .catch((err) => {
          console.log(err);
         });
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
       </svg>
      </button>
     </p>
     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h3>Placed orders</h3>
      <button
       className="btn btn-success"
       onClick={() => {
        setOpen1(true);
       }}
      >
       Search by Date
      </button>
     </div>

     <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
       <thead class="table-success">
        <tr>
         <th scope="col">#</th>
         <th scope="col">Order ID</th>
         <th scope="col">Name</th>
         <th scope="col">Ph No</th>
         <th scope="col">Email</th>
         <th scope="col">Book</th>
         <th scope="col">Amount</th>
         <th scope="col">Date</th>
         <th scope="col">Address</th>
        </tr>
       </thead>
       <tbody>
        {orderList2
         .slice(0)
         .reverse()
         .map((val, i) => {
          if (i >= start2 && i <= start2 + 9) {
           return (
            <tr>
             <th
              onClick={() => {
               popup(val);
              }}
              scope="row"
             >
              {i + 1}
             </th>
             <td
              onClick={() => {
               popup(val);
              }}
             >
              {val.orderid}
             </td>
             <td
              onClick={() => {
               popup(val);
              }}
             >
              {val.name}
             </td>
             <td
              onClick={() => {
               popup(val);
              }}
             >
              {val.phno}
             </td>
             <td
              onClick={() => {
               popup(val);
              }}
             >
              {val.email}
             </td>
             <td
              onClick={() => {
               popup(val);
              }}
              style={{ whiteSpace: "pre-line" }}
             >
              {val.books}
             </td>
             <td
              onClick={() => {
               popup(val);
              }}
             >
              {val.amount / 100}
             </td>
             <td
              onClick={() => {
               popup(val);
              }}
             >
              {val.date}
             </td>
             <td
              onClick={() => {
               popup(val);
              }}
             >
              {val.address}
             </td>
            </tr>
           );
          }
         })}
       </tbody>
      </table>
     </div>
     <p style={{ textAlign: "center" }}>
      <button
       className="btn"
       style={{ color: "green" }}
       onClick={() => {
        setBackdrop(true);
        axios
         .get("https://arjunadb.herokuapp.com/payment")
         .then((res) => {
          console.log(res.data);
          let orderlist1 = [];
          let orderlist2 = [];
          for (let i = 0; i < res.data.length; i++) {
           if (!res.data[i].process) orderlist1.push(res.data[i]);
           else orderlist2.push(res.data[i]);
          }
          setOrderList(res.data);
          setOrderList1(orderlist1);
          setOrderList2(orderlist2);
          setBackdrop(false);
         })
         .catch((err) => {
          console.log(err);
         });
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
       </svg>
      </button>
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start2 === 0) {
         setStart2(orderList2.length - (orderList2.length % 10));
        } else {
         setStart2(start2 - 10);
        }
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
        <path
         fill-rule="evenodd"
         d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
       </svg>
      </button>
      Displaying {start2 + 1} - {start2 + 10 > orderList2.length ? orderList2.length : start2 + 10} of {orderList2.length}{" "}
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start2 + 10 > orderList2.length) {
         setStart2(0);
        } else {
         setStart2(start2 + 10);
        }
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
        <path
         fill-rule="evenodd"
         d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
        />
       </svg>
      </button>
      <button
       className="btn"
       style={{ color: "green" }}
       onClick={() => {
        setBackdrop(true);
        axios
         .get("https://arjunadb.herokuapp.com/payment")
         .then((res) => {
          console.log(res.data);
          let orderlist1 = [];
          let orderlist2 = [];
          for (let i = 0; i < res.data.length; i++) {
           if (!res.data[i].process) orderlist1.push(res.data[i]);
           else orderlist2.push(res.data[i]);
          }
          setOrderList(res.data);
          setOrderList1(orderlist1);
          setOrderList2(orderlist2);
          setBackdrop(false);
         })
         .catch((err) => {
          console.log(err);
         });
        // let orderlist2 = [];

        // for (let i = 0; i < orderList.length; i++) {
        //  if (orderList[i].process) orderlist2.push(orderList[i]);
        // }

        // setOrderList2(orderlist2);
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
       </svg>
      </button>
     </p>
    </main>
    <Dialog open={open1} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Search by Date"}</DialogTitle>
     <DialogContent>
      <form className={classes.container} noValidate>
       <TextField
        id="date2"
        label="Starting Date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className={classes.textField}
        InputLabelProps={{
         shrink: true,
        }}
        onChange={(e) => {
         console.log(e.target.value);
         setDate1(e.target.value);
        }}
       />
      </form>
      <form className={classes.container} noValidate>
       <TextField
        id="date1"
        label="Ending Date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className={classes.textField}
        InputLabelProps={{
         shrink: true,
        }}
        onChange={(e) => {
         console.log(e.target.value);
         setDate2(e.target.value);
        }}
       />
      </form>
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen1(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setOrderList1((prev) => {
         return prev.filter((item, k) => item.date >= date1 && item.date <= date2);
        });
        setOpen1(false);
       }}
       color="primary"
      >
       Search
      </Button>
     </DialogActions>
    </Dialog>
    <Dialog open={open2} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Search by Date"}</DialogTitle>
     <DialogContent>
      <form className={classes.container} noValidate>
       <TextField
        id="date2"
        label="Starting Date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className={classes.textField}
        InputLabelProps={{
         shrink: true,
        }}
        onChange={(e) => {
         console.log(e.target.value);
         setDate1(e.target.value);
        }}
       />
      </form>
      <form className={classes.container} noValidate>
       <TextField
        id="date1"
        label="Ending Date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className={classes.textField}
        InputLabelProps={{
         shrink: true,
        }}
        onChange={(e) => {
         console.log(e.target.value);
         setDate2(e.target.value);
        }}
       />
      </form>
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen2(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setOrderList2((prev) => {
         return prev.filter((item, k) => item.date >= date1 && item.date <= date2);
        });
        setOpen2(false);
       }}
       color="primary"
      >
       Search
      </Button>
     </DialogActions>
    </Dialog>
   </div>
  </>
 );
}

export default OrderList;
