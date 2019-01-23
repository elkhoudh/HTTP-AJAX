import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Friend from "./components/Friend";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Snack from "./components/Snack";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class App extends Component {
  state = {
    friends: [],
    error: "",
    name: "",
    age: "",
    email: "",
    updatingId: "",
    updating: false,
    open: false,
    message: "New Friend Added",
    variant: "success",
    sliderValue: 0
  };

  handleSliderChange = (event, sliderValue) => {
    this.setState({ sliderValue });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  componentWillMount = () => {
    axios
      .get(`/friends`)
      .then(res => this.setState({ friends: res.data }))
      .catch(error => this.setState({ error }));
  };

  addFriend = e => {
    const { name, age, email, sliderValue } = this.state;
    if (!name || !age || !email) {
      this.setState({
        open: true,
        message: "All Fields Required",
        variant: "error"
      });
    } else if (isNaN(age)) {
      this.setState({
        open: true,
        message: "Age must be a number",
        variant: "error"
      });
    } else {
      axios
        .post(`/friends`, { email, age, name, like: sliderValue })
        .then(res =>
          this.setState({
            friends: res.data,
            message: "New Friend Added",
            variant: "success",
            name: "",
            age: "",
            email: "",
            open: true
          })
        )
        .catch(error =>
          this.setState({
            error,
            message: "Error saving friend",
            variant: "error",
            open: true
          })
        );
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`/friends/${id}`)
      .then(res =>
        this.setState({
          friends: res.data,
          open: true,
          message: `User with ID ${id} was delted`,
          variant: "success"
        })
      )
      .catch(error => this.setState({ error }));
  };

  handleUpdate = (id, email, age, name, sliderValue) => {
    this.setState({
      email,
      age,
      name,
      updating: true,
      updatingId: id,
      message: `Updating ${name}`,
      open: true,
      variant: "success",
      sliderValue
    });
  };

  submitUpdate = () => {
    axios
      .put(`/friends/${this.state.updatingId}`, {
        email: this.state.email,
        age: this.state.age,
        name: this.state.name,
        like: this.state.sliderValue
      })
      .then(res =>
        this.setState({
          friends: res.data,
          email: "",
          age: "",
          name: "",
          updatingId: "",
          updating: false,
          message: "Updated user",
          open: true
        })
      )
      .catch(error =>
        this.setState({
          error,
          open: true,
          variant: "error",
          message: "ERROR saving to backend"
        })
      );
  };

  render() {
    console.log(this.state.sliderValue);
    const {
      friends,
      error,
      name,
      age,
      email,
      updating,
      sliderValue
    } = this.state;

    const { classes } = this.props;

    return (
      <>
        <NavBar />
        <Snack
          open={this.state.open}
          handleClose={this.handleClose}
          message={this.state.message}
          variant={this.state.variant}
        />
        <Form
          handleSliderChange={this.handleSliderChange}
          sliderValue={sliderValue}
          addFriend={this.addFriend}
          handleChange={this.handleChange}
          name={name}
          email={email}
          age={age}
          error={error}
          updating={updating}
          submitUpdate={this.submitUpdate}
        />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={16}
            >
              {friends.map(friend => (
                <Friend
                  handleUpdate={this.handleUpdate}
                  handleDelete={this.handleDelete}
                  key={friend.id}
                  friend={friend}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(App);
