import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
//Components
import ToDo from "./ToDo";
import { v4 as uuidv4 } from "uuid";
import { useContext, useMemo, useState } from "react";
import { TodosContext } from "../contexts/todosContext";
// When we useContext we neee to use Parameter with it
// which is in this case : TodosContext

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ToDOList() {
  console.log("re render");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);
  const [dialogTodo, setDialogTodo] = useState();
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("All");
  // UseMemo take two parametar
  //المتغير الأول اجباري , اللي هي الفنكشن , المتغير الثاني اختياري اللي هو اللي يعتمد عليها
  //
  //Filtration Arrays for Done tasks & To do Tasks
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling memo");
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "Completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "Non-Completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  // We define the function in the Parent but we call it from the child
  // Cus this is the way of React to do functions , it should be from the parent cus all the objects are in the parent so any edit will be from the parnet he is the responsible for that
  // const completedTodos = todos.filter((t) => t.isCompleted);
  // const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  // let todosToBeRendered = todos;
  // if (displayedTodosType === "Completed") {
  //   todosToBeRendered = completedTodos;
  // } else if (displayedTodosType === "Non-Completed") {
  //   todosToBeRendered = notCompletedTodos;
  // }

  const todoJSx = todosToBeRendered.map((t) => {
    return <ToDo key={t.id} todo={t} showDelete={openDeleteDialog} />;
  }); // t object is contains id , title , details and isCompleted

  React.useEffect(() => {
    console.log("calling useEffect");
    // To convert form String to Array or object
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  });

  function changeDisplayedType(e) {
    //console.log("test" + e.target.value);
    setDisplayedTodosType(e.target.value);
  }
  function handleAddClick() {
    //  alert("Added Successfully");
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    // We give him a copy of the array and then he can change whatever he wamts (...todos)Means copy of todos Array
    setTodos(updatedTodos);
    //Stringify convert any object or array to String
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  // let dialogTodo = null;
  function openDeleteDialog(todo) {
    dialogTodo = todo;
    alert("Open dialogTodo");
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    console.log(dialogTodo);
    const updatedTodos = todos.filter((t) => {
      return t.id !== dialogTodo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

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
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h3" component="div" style={{ font: "bold" }}>
              <h7 style={{ color: "purple" }}></h7>
              <br></br>
              MY TASKS / مهامي
            </Typography>
            <Divider />
            {/* For 3 Buttons  */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton value="Non-Completed">TO DO</ToggleButton>
              <ToggleButton value="Completed">DONE</ToggleButton>
              <ToggleButton value="All">All</ToggleButton>
            </ToggleButtonGroup>
            {/* End 3 buttons  */}

            {/* ALL TODOS */}
            {todoJSx}
            {/* END ALL TODOS */}

            {/* Input + Add Button */}
            <Grid container marginTop={"30px"}>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  placeholder="Add new Task"
                  label="Task Title"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                // style={{background:"red"}}
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length == 0}
                >
                  Add
                </Button>
              </Grid>{" "}
            </Grid>
            {/* End Input + Add Button */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
