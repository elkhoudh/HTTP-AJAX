import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

const Friend = props => {
  const { classes, friend, handleDelete, handleUpdate } = props;
  return (
    <Chip
      onClick={() =>
        handleUpdate(friend.id, friend.email, friend.age, friend.name)
      }
      icon={<FaceIcon />}
      label={`${friend.name} ${friend.age} ${friend.email}`}
      onDelete={e => handleDelete(e, friend.id)}
      className={classes.chip}
      color="primary"
    />
  );
};

export default withStyles(styles)(Friend);

///<Grid container className={classes.root} spacing={16}>
//   <Grid item xs={12}>
//     <Grid container className={classes.demo} justify="center" spacing={16}>
//       <COMPONENETS />
//     </Grid>
//   </Grid>
// </Grid>
