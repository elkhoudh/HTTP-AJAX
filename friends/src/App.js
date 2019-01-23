import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Friend from "./components/Friend";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavBar from "./components/NavBar";
import Form from "./components/Form";

const URL = "http://localhost:5000";
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
    updating: false
  };
  componentWillMount = () => {
    axios
      .get(`${URL}/friends`)
      .then(res => this.setState({ friends: res.data }))
      .catch(error => this.setState({ error }));
  };

  addFriend = e => {
    const { name, age, email } = this.state;
    if (!name || !age || !email) {
      alert("All Fields Required!!");
    } else {
      axios
        .post(`${URL}/friends`, { email, age, name })
        .then(res => this.setState({ friends: res.data }))
        .catch(error => this.setState({ error }));
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    );
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${URL}/friends/${id}`)
      .then(res => this.setState({ friends: res.data }))
      .catch(error => this.setState({ error }));
  };

  handleUpdate = (id, email, age, name) => {
    console.log("Updatig", id);
    this.setState({ email, age, name, updating: true, updatingId: id });
  };

  submitUpdate = () => {
    axios
      .put(`${URL}/friends/${this.state.updatingId}`, {
        email: this.state.email,
        age: this.state.age,
        name: this.state.name
      })
      .then(res =>
        this.setState({
          friends: res.data,
          email: "",
          age: "",
          name: "",
          updatingId: ""
        })
      )
      .catch(error => this.setState({ error }));
  };

  render() {
    const { friends, error, name, age, email, updating } = this.state;
    const { classes } = this.props;
    return (
      <>
        <NavBar />
        <Form
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
