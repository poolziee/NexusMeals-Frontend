import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ErrorFormHelperText from "../components/ErrorFormHelperText";
import LoadingProgress from "../components/Loading";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let user = authService.getCurrentUser();
    if (user) {
      if (!authService.sessionExpired()) {
        if (user.role === "CHEF") {
          navigate("/chef");
        } else if (user.role === "CUSTOMER") {
          navigate("/customer");
        }
      }
    }
    setLoading(false);
  }, [navigate, setLoading]);

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  if (loading) {
    return <LoadingProgress />;
  }
  return (
    <Formik
      initialValues={{ username: "", password: "", submit: "" }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        authService
          .login(values)
          .then((user) => {
            if (user.role === "CUSTOMER") {
              navigate("/customer");
            } else if (user.role === "CHEF") {
              navigate("/chef");
            }
          })
          .catch((err) => {
            toast.error("Something went wrong!");
            setStatus({ success: false });
            setErrors({ submit: err.response.data.message });
            setSubmitting(false);
          });
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit} onKeyDown={onKeyDown}>
          <div className="page">
            <Container component="main" maxWidth="sm">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: 1,
                  borderRadius: 6,
                  padding: 5,
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={values.username}
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={values.password}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <ErrorFormHelperText errorMessage={errors.submit} />
                    </Box>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </div>
        </form>
      )}
    </Formik>
  );
}
