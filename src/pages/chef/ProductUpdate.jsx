import { useCallback, useEffect, useState } from "react";
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
import ProductCreateForm from "../../components/chef/ProductCreateForm";
import ArrowLeftIcon from "../../icons/ArrowLeft";
import ChevronRightIcon from "../../icons/ChevronRight";
import { useLocation } from "react-router";
import useMounted from "../../hooks/useMounted";
import inventoryService from "../../services/inventory-service";

const ProductUpdate = () => {
  const { state } = useLocation();
  let { product } = state;

  useEffect(() => {}, [product]);

  const mounted = useMounted();
  const [myCategoryNames, setMyCategoryNames] = useState([]);

  const getMyCategoryNames = useCallback(async () => {
    try {
      const data = await inventoryService.getMyCategoryNames();
      if (mounted()) {
        setMyCategoryNames(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getMyCategoryNames();
  }, [getMyCategoryNames]);
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
                Update an existing product
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
                  to="/chef/products"
                >
                  Products
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  Update product
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
                  to="/chef/products"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ProductCreateForm myCategoryNames={myCategoryNames} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductUpdate;
