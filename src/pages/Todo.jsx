import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const Todo = ({ name }) => {
  return (
    <>
      <Typography color="textPrimary" variant="h1">
        TODO: {name}
      </Typography>
    </>
  );
};

Todo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Todo;
