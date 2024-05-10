import { useCallback, useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import useMounted from "../../hooks/useMounted";
import ChevronRightIcon from "../../icons/ChevronRight";
import inventoryService from "../../services/inventory-service";
import CategoryCard from "../../components/customer/browse-products/CategoryCard";
import ProductList from "../../components/customer/browse-products/ProductList";

const ProductBrowse = () => {
  const { state } = useLocation();
  let { chef } = state;

  useEffect(() => {}, [chef]);

  const mounted = useMounted();
  const [categories, setCategories] = useState([]);

  const getCategoires = useCallback(async () => {
    try {
      const data = await inventoryService.browseCategories(chef.id);
      if (mounted()) {
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCategoires();
  }, [getCategoires]);

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
          <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Order the best homemade meals
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  variant="subtitle2"
                  component={RouterLink}
                  to="/customer"
                >
                  Browse Chefs
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  Browse Products
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryCard category={category} />
              <ProductList products={category.products} />
            </div>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default ProductBrowse;
