import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import CategoryCreateForm from "../../components/chef/CategoryCreateForm";
import ArrowLeftIcon from "../../icons/ArrowLeft";
import ChevronRightIcon from "../../icons/ChevronRight";

const CategoryCreate = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={"xl"}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Add a new category
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/chef"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  variant="subtitle2"
                  component={RouterLink}
                  to="/chef/categories"
                >
                  Categories
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  New Category
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<ArrowLeftIcon fontSize="small" />}
                  sx={{ mt: 1 }}
                  to="/chef/categories"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <CategoryCreateForm />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryCreate;
