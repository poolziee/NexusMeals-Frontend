import { Card, CardContent, CardMedia, Typography } from "@mui/material";

// CategoryCard Component
const CategoryCard = ({ category }) => (
  <Card sx={{ margin: 2 }}>
    <CardMedia
      component="img"
      height="180"
      image="https://kidlingoo.com/wp-content/uploads/vegetables_name_in_english_50.jpg"
      alt={category.name}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {category.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {category.description}
      </Typography>
    </CardContent>
  </Card>
);

export default CategoryCard;
