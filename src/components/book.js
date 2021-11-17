import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import ResponsiveDrawer from "./ui/drawer";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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

function Book() {
 const classes = useStyles();

 const [bookList, setBookList] = useState([]);
 const [backdrop, setBackdrop] = useState(false);
 const [currentBook, setCurrentBook] = useState({});

 const [title, setTitle] = useState();

 const [open, setOpen] = useState(false);
 const [open1, setOpen1] = useState(false);

 useEffect(() => {
  setBackdrop(true);
  axios
   .get("https://arjunadb.herokuapp.com/book/")
   .then((res) => {
    setBookList(res.data);

    setBackdrop(false);
   })
   .catch((err) => {
    console.log(err);
   });
 }, []);
 function popup(val) {
  if (val.chapters.length == 0) {
   val.chapters.push({ name: "", desc: "" });
  }
  if (val.testimonials.length == 0) {
   val.testimonials.push({ name: "", position: "", comment: "" });
  }

  setCurrentBook(val);
  console.log(currentBook);

  setOpen1(true);
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
     <div className={classes.root2}>
      <Grid container spacing={3}>
       <Grid item xs={4}>
        <button
         className="w-100 btn btn-lg btn-success"
         onClick={() => {
          setOpen(true);
         }}
        >
         Add Book
        </button>
       </Grid>
      </Grid>
     </div>
     <br />
     <br />
     <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
       <thead class="table-success">
        <tr>
         <th scope="col">#</th>
         <th scope="col">Name</th>
         <th scope="col">Book Page</th>

         <th scope="col">Delete</th>
        </tr>
       </thead>
       <tbody>
        {bookList.map((val, i) => {
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
            {val.title}
           </td>
           <td>{`https://arjuna-book.herokuapp.com/book/${val.title}`}</td>
           <td>
            <button
             type="button"
             class="btn"
             style={{ color: "red" }}
             onClick={() => {
              setBackdrop(true);
              axios
               .post("https://arjunadb.herokuapp.com/book/delete", { id: val._id })
               .then((res) => {
                console.log(res);
                setBookList((prev) => {
                 return prev.filter((item, k) => k !== i);
                });
                setBackdrop(false);
               })
               .catch((err) => console.log(err));
             }}
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
               fill-rule="evenodd"
               d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
             </svg>
            </button>
           </td>
          </tr>
         );
        })}
       </tbody>
      </table>
     </div>
    </main>
    <Dialog open={open} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"New Book"}</DialogTitle>
     <DialogContent>
      <TextField
       autoFocus
       margin="dense"
       label="Tilte of the Book"
       type="text"
       value={title}
       onChange={(e) => {
        setTitle(e.target.value);
       }}
       fullWidth
      />
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setBackdrop(true);
        let uploaded = false;
        window.cloudinary.openUploadWidget(
         {
          cloudName: "arjunadb",
          uploadPreset: "arjunadb",
          sources: ["local", "url", "image_search", "camera", "google_drive", "dropbox", "facebook", "instagram", "shutterstock"],
          multiple: false,
          cropping: true,
          croppingShowDimensions: true,
          croppingCoordinatesMode: "custom",
          googleApiKey: "AIzaSyCEYCH1ZS1UH0C6QjWDxohAYcpRFFNyACc",
          folder: "book_covers",
         },
         (error, result) => {
          console.log(result);
          if (result.event === "success") {
           uploaded = true;
           axios
            .post("https://arjunadb.herokuapp.com/book/add", {
             title: title,
             image: "https://res.cloudinary.com/arjunadb/image/upload/" + result.info.public_id,
            })
            .then((res) => {
             setBookList((prev) => {
              let dummy = [...prev];
              dummy.push(res.data);
              return dummy;
             });
             setTitle("");
             alert("Successfully created the book");
             setBackdrop(false);
             setOpen(false);
            })
            .catch((err) => console.log(err));
          }
          if ((result.info === "hidden" && !uploaded) || error) {
           alert("uploading image failed");
          }
         }
        );
       }}
       color="primary"
      >
       Create
      </Button>
     </DialogActions>
    </Dialog>
    <Dialog fullWidth={true} maxWidth={"lg"} open={open1} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Update the book"}</DialogTitle>
     <DialogContent>
      <img src={currentBook.image} style={{ height: "300px" }} />
      <Button
       color="primary"
       onClick={() => {
        let uploaded = false;
        window.cloudinary.openUploadWidget(
         {
          cloudName: "arjunadb",
          uploadPreset: "arjunadb",
          sources: ["local", "url", "image_search", "camera", "google_drive", "dropbox", "facebook", "instagram", "shutterstock"],
          multiple: false,
          cropping: true,
          croppingShowDimensions: true,
          croppingCoordinatesMode: "custom",
          googleApiKey: "AIzaSyCEYCH1ZS1UH0C6QjWDxohAYcpRFFNyACc",
          folder: "book_covers",
         },
         (error, result) => {
          console.log(result);
          if (result.event === "success") {
             uploaded=true;
           setCurrentBook((prev) => {
            let dum = { ...prev };
            dum.image = "https://res.cloudinary.com/arjunadb/image/upload/" + result.info.public_id;
            return dum;
           });
          }
          if ((result.info === "hidden" && !uploaded) || error) {
           alert("uploading image failed");
          }
         }
        );
       }}
      >
       Change
      </Button>
      <br />
      <TextField
       autoFocus
       margin="dense"
       label="Tilte of the Book"
       type="text"
       value={currentBook.title}
       onChange={(e) => {
        setCurrentBook((prev) => {
         let dum = { ...prev };
         dum.title = e.target.value;
         return dum;
        });
       }}
      />
      <br />
      <TextField
       margin="dense"
       label="Subtitle"
       type="text"
       value={currentBook.subtitle}
       onChange={(e) => {
        setCurrentBook((prev) => {
         let dum = { ...prev };
         dum.subtitle = e.target.value;
         return dum;
        });
       }}
       style={{ marginBottom: "40px" }}
      />
      <br />

      <TextField
       label="Description"
       multiline
       rows={4}
       value={currentBook.description}
       variant="outlined"
       onChange={(e) => {
        setCurrentBook((prev) => {
         let dum = { ...prev };
         dum.description = e.target.value;
         return dum;
        });
       }}
       style={{ marginBottom: "40px" }}
       fullWidth
      />
      <br />
      <p>Chapters:</p>
      <>
       {currentBook.chapters
        ? currentBook.chapters.map((val, i) => {
           if (i === currentBook.chapters.length - 1) {
            return (
             <>
              <TextField
               style={{ width: "350px", margin: "10px", marginBottom: "40px" }}
               id="outlined-multiline-static"
               label="name"
               value={currentBook.chapters[i].name}
               onChange={(e) => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.chapters[i].name = e.target.value;
                 return dum;
                });
               }}
              />
              <TextField
               style={{ width: "650px", margin: "10px" }}
               id="outlined-multiline-static"
               label="description"
               value={currentBook.chapters[i].desc}
               onChange={(e) => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.chapters[i].desc = e.target.value;
                 return dum;
                });
               }}
              />
              <Button
               onClick={() => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.chapters = dum.chapters.filter((ele, k) => {
                  return k != i;
                 });
                 return dum;
                });
               }}
              >
               <DeleteOutlineIcon />
              </Button>
              <Button
               onClick={() => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.chapters.push({ name: "", desc: "" });
                 return dum;
                });
               }}
              >
               <AddCircleOutlineIcon />
              </Button>
              <br />
             </>
            );
           }
           return (
            <>
             <TextField
              style={{ width: "350px", margin: "10px" }}
              id="outlined-multiline-static"
              label="name"
              value={currentBook.chapters[i].name}
              onChange={(e) => {
               setCurrentBook((prev) => {
                let dum = { ...prev };
                dum.chapters[i].name = e.target.value;
                return dum;
               });
              }}
             />
             <TextField
              style={{ width: "650px", margin: "10px" }}
              id="outlined-multiline-static"
              label="description"
              value={currentBook.chapters[i].desc}
              onChange={(e) => {
               setCurrentBook((prev) => {
                let dum = { ...prev };
                dum.chapters[i].desc = e.target.value;
                return dum;
               });
              }}
             />
             <Button
              onClick={() => {
               setCurrentBook((prev) => {
                let dum = { ...prev };
                dum.chapters = dum.chapters.filter((ele, k) => {
                 return k != i;
                });
                return dum;
               });
              }}
             >
              <DeleteOutlineIcon />
             </Button>
             <br />
            </>
           );
          })
        : null}
      </>
      <p>Testimonials:</p>
      <>
       {currentBook.testimonials
        ? currentBook.testimonials.map((val, i) => {
           if (i === currentBook.testimonials.length - 1) {
            return (
             <>
              <TextField
               style={{ width: "200px", margin: "10px", marginBottom: "40px" }}
               id="outlined-multiline-static"
               label="name"
               value={currentBook.testimonials[i].name}
               onChange={(e) => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.testimonials[i].name = e.target.value;
                 return dum;
                });
               }}
              />
              <TextField
               style={{ width: "200px", margin: "10px" }}
               id="outlined-multiline-static"
               label="position"
               value={currentBook.testimonials[i].position}
               onChange={(e) => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.testimonials[i].position = e.target.value;
                 return dum;
                });
               }}
              />
              <TextField
               style={{ width: "600px", margin: "10px" }}
               id="outlined-multiline-static"
               label="comment"
               value={currentBook.testimonials[i].comment}
               onChange={(e) => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.testimonials[i].comment = e.target.value;
                 return dum;
                });
               }}
              />
              <Button
               onClick={() => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.testimonials = dum.testimonials.filter((ele, k) => {
                  return k != i;
                 });
                 return dum;
                });
               }}
              >
               <DeleteOutlineIcon />
              </Button>
              <Button
               onClick={() => {
                setCurrentBook((prev) => {
                 let dum = { ...prev };
                 dum.testimonials.push({ name: "", position: "", comment: "" });
                 return dum;
                });
               }}
              >
               <AddCircleOutlineIcon />
              </Button>
             </>
            );
           }
           return (
            <>
             <TextField
              style={{ width: "200px", margin: "10px" }}
              id="outlined-multiline-static"
              label="name"
              value={currentBook.testimonials[i].name}
              onChange={(e) => {
               setCurrentBook((prev) => {
                let dum = { ...prev };
                dum.testimonials[i].name = e.target.value;
                return dum;
               });
              }}
             />
             <TextField
              style={{ width: "200px", margin: "10px" }}
              id="outlined-multiline-static"
              label="position"
              value={currentBook.testimonials[i].position}
              onChange={(e) => {
               setCurrentBook((prev) => {
                let dum = { ...prev };
                dum.testimonials[i].position = e.target.value;
                return dum;
               });
              }}
             />
             <TextField
              style={{ width: "600px", margin: "10px" }}
              id="outlined-multiline-static"
              label="comment"
              value={currentBook.testimonials[i].comment}
              onChange={(e) => {
               setCurrentBook((prev) => {
                let dum = { ...prev };
                dum.testimonials[i].comment = e.target.value;
                return dum;
               });
              }}
             />
             <Button
              onClick={() => {
               setCurrentBook((prev) => {
                let dum = { ...prev };
                dum.testimonials = dum.testimonials.filter((ele, k) => {
                 return k != i;
                });
                return dum;
               });
              }}
             >
              <DeleteOutlineIcon />
             </Button>
            </>
           );
          })
        : null}
      </>
      <TextField
       margin="dense"
       label="Price"
       type="text"
       value={currentBook.price}
       onChange={(e) => {
        setCurrentBook((prev) => {
         let dum = { ...prev };
         dum.price = e.target.value;
         return dum;
        });
       }}
       style={{ marginBottom: "40px" }}
      />
      <br />
       <TextField
       margin="dense"
       label="Amazon link"
       type="text"
       value={currentBook.amazon}
       onChange={(e) => {
        setCurrentBook((prev) => {
         let dum = { ...prev };
         dum.amazon = e.target.value;
         return dum;
        });
       }}
       style={{ marginBottom: "40px" }}
      />
      <br />
       <TextField
       margin="dense"
       label="Youtube link"
       type="text"
       value={currentBook.youtube}
       onChange={(e) => {
        setCurrentBook((prev) => {
         let dum = { ...prev };
         dum.youtube = e.target.value;
         return dum;
        });
       }}
       style={{ marginBottom: "40px" }}
      />
      <br />
      {currentBook.backimg1 ? <img src={currentBook.backimg1} style={{ height: "300px" }} /> : null}
      <Button
       color="primary"
       onClick={() => {
        let uploaded = false;
        window.cloudinary.openUploadWidget(
         {
          cloudName: "arjunadb",
          uploadPreset: "arjunadb",
          sources: ["local", "url", "image_search", "camera", "google_drive", "dropbox", "facebook", "instagram", "shutterstock"],
          multiple: false,
          cropping: true,
          croppingShowDimensions: true,
          croppingCoordinatesMode: "custom",
          googleApiKey: "AIzaSyCEYCH1ZS1UH0C6QjWDxohAYcpRFFNyACc",
          folder: "back_images",
         },
         (error, result) => {
          console.log(result);
          if (result.event === "success") {
            uploaded=true;
           setCurrentBook((prev) => {
            let dum = { ...prev };
            dum.backimg1 = "https://res.cloudinary.com/arjunadb/image/upload/" + result.info.public_id;
            return dum;
           });
          }
          if ((result.info === "hidden" && !uploaded) || error) {
           alert("uploading image failed");
          }
         }
        );
       }}
      >
       Change Background Image 1
      </Button>
      <br />
      <br />
      {currentBook.backimg2 ? <img src={currentBook.backimg2} style={{ height: "300px" }} /> : null}
      <Button
       color="primary"
       onClick={() => {
        let uploaded = false;
        window.cloudinary.openUploadWidget(
         {
          cloudName: "arjunadb",
          uploadPreset: "arjunadb",
          sources: ["local", "url", "image_search", "camera", "google_drive", "dropbox", "facebook", "instagram", "shutterstock"],
          multiple: false,
          cropping: true,
          croppingShowDimensions: true,
          croppingCoordinatesMode: "custom",
          googleApiKey: "AIzaSyCEYCH1ZS1UH0C6QjWDxohAYcpRFFNyACc",
          folder: "back_images",
         },
         (error, result) => {
          console.log(result);
          if (result.event === "success") {
             uploaded=true;
           setCurrentBook((prev) => {
            let dum = { ...prev };
            dum.backimg2 = "https://res.cloudinary.com/arjunadb/image/upload/" + result.info.public_id;
            return dum;
           });
          }
          if ((result.info === "hidden" && !uploaded) || error) {
           alert("uploading image failed");
          }
         }
        );
       }}
      >
       Change Background Image 2
      </Button>
      <br />
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
        setBackdrop(true);
        axios
         .post("https://arjunadb.herokuapp.com/book/modify", { book: currentBook })
         .then((res) => {
          axios
           .get("https://arjunadb.herokuapp.com/book/")
           .then((res) => {
            setBookList(res.data);

            setBackdrop(false);
            setOpen1(false);
            alert("sucessfully updated the book");
           })
           .catch((err) => {
            console.log(err);
           });
         })
         .catch((err) => {
          console.log(err);
         });
       }}
       color="primary"
      >
       Save
      </Button>
     </DialogActions>
    </Dialog>
   </div>
  </>
 );
}

export default Book;
