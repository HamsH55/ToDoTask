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

export default function ToDo() {
  return (
    <>
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
                First Task
              </Typography>
              <Typography variant="h7" sx={{ textAlign: "left" }}>
               Yeah , More Details for Task 1
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
                aria-label="delete"
                sx={{
                  color: "green",
                  background: "white",
                  border: "solid green 3px",
                  textAlign: "left",
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* Edit Button */}
              <IconButton
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
              >
                <DeleteIcon />
              </IconButton>

              {/* End Actions Buttons */}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}
