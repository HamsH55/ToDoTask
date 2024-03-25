import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//const open= false;

export default function ToDo({ todo, hanleCheck }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  }); // to keep the same words in the update field
  //not empty

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleDeleteDialogClose = () => {
  //   setOpen(false);
  // };

  // Event Handlers

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos); 
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
    
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // To close update dialog
    alert("Sucessfully Updated");
    setShowUpdateDialog(false);
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  // Expain the code more :
  // function handleDeleteConfirm(){
  //  const updateTodos = todos.filter((t) =>{
  //   if (t.id = todo.id){
  //     return false;
  //   }else{
  //       return true; }
  //   }
  // },)
  //  setTodos(updateTodos);
  // }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        //style={{direction:"rtl"}}
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot cancel the deletion after it is complete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Close</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Yes,I want to Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Delete Dialog */}

      {/* Update Dialog */}
      <Dialog
        //style={{direction:"rtl"}}
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Task "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Task Title"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) => {
                setUpdatedTodo({ ...updatedTodo, title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Task Details"
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) => {
                setUpdatedTodo({ ...updatedTodo, details: e.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Close</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Update Dialoog */}
      <Card
        className="toDoCard"
        sx={{
          marginTop: "30px",
          minWidth: 275,
          background: "#f73378",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                {todo.title}
              </Typography>
              <Typography variant="h7" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Actions Buttons */}

              {/* Done Button */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                aria-label="delete"
                sx={{
                  color: todo.isCompleted ? "white" : "green",
                  background: todo.isCompleted ? "green" : "white",
                  border: "solid green 3px",
                  textAlign: "left",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* End Done Button  */}

              {/* Edit Button */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "yellow",
                  background: "white",
                  border: "solid yellow 3px",
                  textAlign: "left",
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              {/* End Edit Button  */}

              {/* Delete Button  */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "red",
                  background: "white",
                  border: "solid red 3px",
                  textAlign: "left",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* End Delete Button  */}
              {/* End Actions Buttons */}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}
