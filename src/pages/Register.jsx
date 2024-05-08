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
  FormLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ErrorFormHelperText from "../components/ErrorFormHelperText";
import FormikRadioGroup from "../components/FormikRadioGroup";

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

export default function Register() {
  let navigate = useNavigate();

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  return (
    <Formik
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        city: "",
        postalCode: "",
        street: "",
        houseNumber: "",
        role: "CUSTOMER", // default role
        submit: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
        city: Yup.string().required("City is required"),
        postalCode: Yup.string().required("Postal code is required"),
        street: Yup.string().required("Street is required"),
        houseNumber: Yup.string().required("House number is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        authService
          .register(values)
          .then((response) => {
            console.log(
              "Registered new user: {}",
              JSON.stringify(response.data)
            );
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
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
                  Sign up
                </Typography>
                <Box sx={{ mt: 5 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ width: "100%", textAlign: "center" }}>
                        <FormLabel component="legend">Role</FormLabel>
                        <Field name="role">
                          {({ field, form }) => (
                            <FormikRadioGroup
                              form={form}
                              field={field}
                              name={undefined}
                              options={undefined}
                              row
                              sx={{ justifyContent: "center" }}
                            >
                              {["CUSTOMER", "CHEF"].map((option) => (
                                <FormControlLabel
                                  key={option}
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                  sx={{ margin: "auto" }}
                                />
                              ))}
                            </FormikRadioGroup>
                          )}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        onChange={handleChange}
                        value={values.firstName}
                        autoComplete="fname"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        onChange={handleChange}
                        value={values.lastName}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                        onChange={handleChange}
                        value={values.username}
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        onChange={handleChange}
                        value={values.email}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        onChange={handleChange}
                        value={values.password}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city}
                        onChange={handleChange}
                        value={values.city}
                        fullWidth
                        name="city"
                        label="City"
                        autoComplete="city"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        error={Boolean(touched.postalCode && errors.postalCode)}
                        helperText={touched.postalCode && errors.postalCode}
                        onChange={handleChange}
                        value={values.postalCode}
                        fullWidth
                        name="postalCode"
                        label="Postal Code"
                        autoComplete="postal-code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <TextField
                        error={Boolean(touched.street && errors.street)}
                        helperText={touched.street && errors.street}
                        onChange={handleChange}
                        value={values.street}
                        fullWidth
                        name="street"
                        label="Street"
                        autoComplete="street"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        error={Boolean(
                          touched.houseNumber && errors.houseNumber
                        )}
                        helperText={touched.houseNumber && errors.houseNumber}
                        onChange={handleChange}
                        value={values.houseNumber}
                        fullWidth
                        name="houseNumber"
                        label="Nr."
                        autoComplete="house-number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
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
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </div>
        </form>
      )}
    </Formik>
  );
}
