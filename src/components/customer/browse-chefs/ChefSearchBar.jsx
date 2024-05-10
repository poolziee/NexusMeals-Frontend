// noinspection DuplicatedCode
import { useState } from "react";

import { Box, Button, Card, Grid, TextField } from "@mui/material";
import SearchIcon from "../../../icons/Search";
import { Link as RouterLink } from "react-router-dom";

const ChefSearchBar = (props) => {
  const { parentalCallBack } = props;
  const [city, setCity] = useState("");

  const handleSearch = () => {
    const data = {
      city: city,
      postalCode: "0000AA",
      street: "DummyStreet",
      houseNumber: "1",
    };
    parentalCallBack(data);
  };

  return (
    <Card>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          m: -1,
          p: 2,
          minHeight: 130,
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 500,
          }}
        >
          <TextField
            fullWidth
            placeholder="Where is the order for?"
            variant="outlined"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </Box>
        <Grid item>
          <Box>
            <Button
              color="primary"
              startIcon={<SearchIcon fontSize="small" />}
              sx={{ m: 1, height: 60, width: 150 }}
              variant="contained"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
};

export default ChefSearchBar;
