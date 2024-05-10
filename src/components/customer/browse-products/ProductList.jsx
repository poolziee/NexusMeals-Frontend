import { Box, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => (
  <Box sx={{ overflow: "auto" }}>
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", overflowX: "auto", padding: 2 }}
    >
      {products.map((product) => (
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ProductList;
