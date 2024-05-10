import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCard = ({ product }) => (
  <Card sx={{ display: "inline-block", width: 300, margin: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image="https://media.self.com/photos/57d8952946d0cb351c8c50c9/master/w_1600%2Cc_limit/DELICIOUS-1-POT-Lentil-and-Black-Bean-Chili-Smoky-hearty-PROTEIN-and-fiber-packed-vegan-glutenfree-lentils-chili-healthy-recipe2.jpg"
      alt={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
      <Typography variant="body1" color="primary">
        ${product.price}
      </Typography>
    </CardContent>
  </Card>
);

export default ProductCard;
