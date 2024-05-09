import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import inventoryService from "../../services/inventory-service";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FileDropzone from "../FileDropzone";
import ArrowRightIcon from "../../icons/ArrowRight";
import { useLocation } from "react-router";
import ErrorFormHelperText from "../ErrorFormHelperText";

const ProductCreateForm = ({ myCategoryNames, ...other }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { state } = useLocation();
  // @ts-ignore
  let { product } = "";
  if (state !== null) {
    product = state.product;
  } else {
    product = {
      id: null,
      description: "",
      //  images: [],
      name: "",
      submit: null,
      category: "",
      quantity: "",
      price: "",
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

  return (
    <>
      <Formik
        initialValues={{
          id: product.id,
          //  images: [],
          name: product.name,
          price: product.price,
          description: product.description,
          quantity: product.quantity,
          category: product.category,
          submit: "",
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string().max(255).required(),
          // images: Yup.array(),
          name: Yup.string().max(255).required(),
          price: Yup.number().required(),
          quantity: Yup.number().required(),
          category: Yup.string().required(),
        })}
        onSubmit={async (values, { setStatus, setSubmitting, setErrors }) => {
          // NOTE: Make API request
          if (product.id) {
            inventoryService
              .updateProduct({ ...values, price: parseFloat(values.price) })
              .then((response) => {
                let product = response.data;
                if (product.id !== null) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success("Saved product!");
                  navigate("/chef/products");
                }
              })
              .catch((err) => {
                setErrors({ submit: err.response.data.message });
                console.log(err);
              });
          } else {
            inventoryService
              .createProduct(values)
              .then((response) => {
                let product = response.data;
                if (product.id !== null) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success("Saved product!");
                  navigate("/chef/products");
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
          <form onSubmit={handleSubmit} onKeyDown={onKeyDown} {...other}>
            <Grid container spacing={3}>
              <Grid item lg={8} md={6} xs={12}>
                <Card>
                  <CardContent>
                    <CardHeader title="General" />
                    <div style={{ textAlign: "center" }}>
                      <TextField
                        style={{ width: 400 }}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        label="Product Name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexWrap: "wrap",
                          minHeight: 120,
                        }}
                      >
                        <Autocomplete
                          style={{ width: 400 }}
                          onChange={(e, value) =>
                            setFieldValue("category", value)
                          }
                          onInputChange={(e, value, reason) => {
                            setInputValue(value);
                          }}
                          value={values.category}
                          id="combo-box-demo"
                          options={myCategoryNames} // eslint-disable-line
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              placeholder="Choose a category."
                              variant="outlined"
                              error={Boolean(
                                touched.category && errors.category
                              )}
                              helperText={touched.category && errors.category}
                              label="Category"
                              InputProps={{
                                ...params.InputProps,
                              }}
                            />
                          )}
                        />
                      </Box>
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
                <Card>
                  <CardHeader title="Organize" />
                  <CardContent>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        error={Boolean(touched.quantity && errors.quantity)}
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.quantity}
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        error={Boolean(touched.price && errors.price)}
                        fullWidth
                        label="Price"
                        name="price"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.price}
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
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
              <Grid item lg={4} md={6} xs={12}>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <ErrorFormHelperText errorMessage={errors.submit} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProductCreateForm;
