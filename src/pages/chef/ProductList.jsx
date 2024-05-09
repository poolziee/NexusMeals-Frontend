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
import ProductListTable from "../../components/chef/ProductListTable";
import useMounted from "../../hooks/useMounted";
import ChevronRightIcon from "../../icons/ChevronRight";
import DownloadIcon from "../../icons/Download";
import UploadIcon from "../../icons/Upload";
import PlusIcon from "../../icons/Plus";
import service from "../../services/inventory-service";

const ProductList = () => {
  const mounted = useMounted();
  const [products, setProducts] = useState([]);

  const getMyProducts = useCallback(async () => {
    try {
      const data = await service.getMyProducts();
      if (mounted()) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getMyProducts();
  }, [getMyProducts]);
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
                Product List
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
                  Products
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
                  to="/chef/products/create"
                  variant="contained"
                >
                  New Product
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ProductListTable products={products} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
