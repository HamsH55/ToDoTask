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

// define an Array
const todos =[
  {
    id:1,
    title:"Read Book",
    details:"Letting go",
    isCompleted:false
  }
]

export default function ToDOList() {
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h3" component="div" style={{ font: "bold" }}>
            MY TASKS / مهامي
          </Typography>
          <Divider />
          {/* For 3 Buttons  */}
          <ToggleButtonGroup
            style={{
              direction: "ltr",
              marginTop: "30px",
            }}
            //value={alignment}
            exclusive
            // onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="right">TO DO</ToggleButton>
            <ToggleButton value="center">DONE</ToggleButton>
            <ToggleButton value="left">All</ToggleButton>
          </ToggleButtonGroup>
          {/* End 3 buttons  */}

          {/* ALL TODOS */}
          <ToDo />
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
  );
}
