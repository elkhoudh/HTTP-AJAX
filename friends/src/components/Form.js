import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";

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
  },
  root: {
    width: 300
  },
  slider: {
    padding: "45px 0px",
    width: "100%"
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
      submitUpdate,
      sliderValue,
      handleSliderChange
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
        <div className={classes.root}>
          <Typography id="label">Love Meter</Typography>
          <Slider
            classes={{ container: classes.slider }}
            value={sliderValue}
            aria-labelledby="label"
            onChange={handleSliderChange}
            name="sliderValue"
          />
        </div>
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
