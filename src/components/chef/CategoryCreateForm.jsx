import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import inventoryService from "../../services/inventory-service";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FileDropzone from "../FileDropzone";
import ArrowRightIcon from "../../icons/ArrowRight";
import { useLocation } from "react-router";
import ErrorFormHelperText from "../ErrorFormHelperText";

const CategoryCreateForm = (props) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const { state } = useLocation();
  // @ts-ignore
  let { category } = "";
  if (state !== null) {
    category = state.category;
  } else {
    category = {
      id: null,
      description: "",
      //  images: [],
      name: "",
      submit: null,
    };
  }

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          id: category.id,
          description: category.description,
          //  images: [],
          name: category.name,
          submit: "",
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string().max(255).required(),
          // images: Yup.array(),
          name: Yup.string().max(255).required(),
        })}
        onSubmit={async (values, { setStatus, setSubmitting, setErrors }) => {
          // NOTE: Make API request
          if (category.id) {
            inventoryService
              .updateCategory(values)
              .then((response) => {
                let category = response.data;
                if (category.id !== null) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success("Saved category!");
                  navigate("/chef/categories");
                }
              })
              .catch((err) => {
                setErrors({ submit: err.response.data.message });
                console.log(err);
              });
          } else {
            inventoryService
              .createCategory(values)
              .then((response) => {
                let category = response.data;
                if (category.id !== null) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success("Saved category!");
                  navigate("/chef/categories");
                }
              })
              .catch((err) => {
                setErrors({ submit: err.response.data.message });
                console.log(err);
              });
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit} onKeyDown={onKeyDown} {...props}>
            <Grid container spacing={3}>
              <Grid item lg={8} md={6} xs={12}>
                <Card>
                  <CardContent>
                    <div style={{ textAlign: "center" }}>
                      <TextField
                        style={{ width: 400 }}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        label="Category Name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </div>
                    <Typography
                      color="textSecondary"
                      sx={{
                        mb: 2,
                        mt: 3,
                      }}
                      variant="subtitle2"
                    >
                      Description
                    </Typography>
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
                <Box sx={{ mt: 3 }}>
                  <Card>
                    <CardHeader title="Upload Images" />
                    <CardContent>
                      <FileDropzone
                        accept="image/*"
                        files={files}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                      />
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <ErrorFormHelperText errorMessage={errors.submit} />
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
                  }}
                >
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    endIcon={<ArrowRightIcon />}
                  >
                    Save & Proceed
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CategoryCreateForm;
