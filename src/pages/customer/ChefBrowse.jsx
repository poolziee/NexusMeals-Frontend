import { useCallback, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import userService from "../../services/users-service";
import ChefSearchBar from "../../components/customer/browse-chefs/ChefSearchBar";
import ChefSearchResult from "../../components/customer/browse-chefs/ChefSearchResult";

const ChefBrowse = () => {
  const mounted = useMounted();
  const [chefs, setChefs] = useState([]);

  const getChefs = useCallback(
    async (address) => {
      try {
        const data = await userService.browseChefs(address);
        if (mounted()) {
          setChefs(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mounted]
  );

  useEffect(() => {}, [getChefs]);

  const handleQuery = (address) => {
    getChefs(address);
  };

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
                <Typography color="textSecondary" variant="subtitle2">
                  Browse Chefs
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ChefSearchBar parentalCallBack={handleQuery} />
          </Box>
          <Box sx={{ mt: 6 }}>
            <ChefSearchResult chefs={chefs} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ChefBrowse;
