import { useState, useEffect, useCallback } from "react";
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
import CategoryListTable from "../../components/chef/CategoryListTable";
import useMounted from "../../hooks/useMounted";
import ChevronRightIcon from "../../icons/ChevronRight";
import DownloadIcon from "../../icons/Download";
import UploadIcon from "../../icons/Upload";
import PlusIcon from "../../icons/Plus";
import service from "../../services/inventory-service";

const CategoryList = () => {
  const mounted = useMounted();
  const [categories, setCategories] = useState([]);

  const getMyCategories = useCallback(async () => {
    try {
      const data = await service.getMyCategories();
      if (mounted()) {
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  const refreshCategories = useCallback(() => {
    getMyCategories();
  }, [getMyCategories]);

  useEffect(() => {
    getMyCategories();
  }, [getMyCategories]);
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
                Category List
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
                <Typography color="textSecondary" variant="subtitle2">
                  Categories
                </Typography>
              </Breadcrumbs>
              <Box
                sx={{
                  mb: -1,
                  mx: -1,
                  mt: 1,
                }}
              >
                <Button
                  color="primary"
                  startIcon={<UploadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                >
                  Import
                </Button>
                <Button
                  color="primary"
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                >
                  Export
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  to="/chef/categories/create"
                  variant="contained"
                >
                  New Category
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <CategoryListTable
              categoriesFull={categories}
              onRefresh={refreshCategories}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryList;
