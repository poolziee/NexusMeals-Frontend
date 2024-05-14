import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChefCard = ({ chef, ...other }) => {
  const navigate = useNavigate();

  const handleChefClick = () => {
    navigate("/customer/browse-products", {
      state: { chef },
    });
  };

  return (
    <Card {...other}>
      <Box sx={{ p: 3 }}>
        <CardMedia
          image="https://media.istockphoto.com/id/1615583168/nl/vector/cooking-pan.jpg?s=1024x1024&w=is&k=20&c=6qfhdZWTV7nRsW6sbJmKOITFyqWybNDkHWVuHndsyVY="
          sx={{
            backgroundColor: "background.default",
            height: 200,
            cursor: "pointer",
          }}
          onClick={handleChefClick}
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            mt: 2,
          }}
        >
          <Box sx={{ ml: 2 }}>
            <Typography color="textPrimary" variant="h6">
              {chef.firstName + " " + chef.lastName}
            </Typography>
            <Typography color="textSecondary" variant="body2"></Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          pb: 2,
          px: 3,
        }}
      >
        <Typography color="textSecondary" variant="body2">
          {chef.street}
        </Typography>
      </Box>
      <Box
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography color="textPrimary" variant="subtitle2"></Typography>
            <Typography color="textSecondary" variant="body2"></Typography>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="subtitle2">
              {chef.categoryOverview.reduce(
                (acc, category) => acc + category.totalProducts,
                0
              )}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Total products
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ChefCard;
