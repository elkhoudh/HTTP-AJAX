import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 19,
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class TextFields extends React.Component {
  state = {
    error: false
  };

  componentWillMount = () => {
    if (this.props.error.length > 0) {
      this.setState({ error: true });
    }
  };

  componentWillReceiveProps = () => {
    if (this.props.error.length > 0) {
      this.setState({ error: true });
    }
  };
  render() {
    const {
      classes,
      name,
      age,
      email,
      handleChange,
      addFriend,
      updating,
      submitUpdate
    } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          error={this.state.error}
          id="standard-name"
          label="Name"
          value={name}
          name="name"
          onChange={handleChange}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error={this.state.error}
          id="standard-name"
          onChange={handleChange}
          name="age"
          value={age}
          label="Age"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error={this.state.error}
          value={email}
          onChange={handleChange}
          name="email"
          id="standard-name"
          label="Email"
          className={classes.textField}
          margin="normal"
        />
        <Button
          onClick={updating ? submitUpdate : addFriend}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {updating ? "Update Friend" : "Add Friend"}
        </Button>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
