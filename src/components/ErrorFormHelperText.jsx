import { FormHelperText } from "@mui/material";
import PropTypes from "prop-types";

const ErrorFormHelperText = ({ errorMessage }) => {
  return (
    <>
      {Array.isArray(errorMessage) ? (
        errorMessage.map((message, index) => (
          <FormHelperText key={index} error>
            - {message}
            {index < errorMessage.length - 1 && <br />}
          </FormHelperText>
        ))
      ) : (
        <FormHelperText error>{errorMessage}</FormHelperText>
      )}
    </>
  );
};

ErrorFormHelperText.propTypes = {
  errorMessage: PropTypes.node,
};

ErrorFormHelperText.displayName = "ErrorFormHelperText";

export default ErrorFormHelperText;
