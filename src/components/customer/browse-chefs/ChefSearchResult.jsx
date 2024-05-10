import { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChefCard from "./ChefCard";

const ChefSearchResult = (props) => {
  const { chefs, ...other } = props;
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most popular");
  const [mode, setMode] = useState("grid");

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = (value) => {
    setSelectedSort(value);
    setOpenSort(false);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  if (chefs.length > 0) {
    return (
      <div {...other}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            color="textPrimary"
            sx={{
              position: "relative",
              "&:after": {
                backgroundColor: "primary.main",
                bottom: "-8px",
                content: '" "',
                height: "3px",
                left: 0,
                position: "absolute",
                width: "48px",
              },
            }}
            variant="h5"
          >
            Showing {chefs.length} chefs
          </Typography>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button
              color="primary"
              onClick={handleSortOpen}
              ref={sortRef}
              sx={{
                textTransform: "none",
                letterSpacing: 0,
                mr: 2,
              }}
              variant="text"
            >
              {selectedSort}
              <ArrowDropDownIcon fontSize="small" />
            </Button>
            <ToggleButtonGroup
              exclusive
              onChange={handleModeChange}
              size="small"
              value={mode}
            >
              <ToggleButton value="grid">
                <ViewModuleIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {chefs.map((chef) => (
            <Grid
              item
              key={chef.id}
              md={mode === "grid" ? 4 : 12}
              sm={mode === "grid" ? 6 : 12}
              xs={12}
            >
              <ChefCard chef={chef} />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Pagination count={3} />
        </Box>
        <Menu
          anchorEl={sortRef.current}
          elevation={1}
          onClose={handleSortClose}
          open={openSort}
        >
          {["Dummy sort 1", "Dummy sort 2", "Dummy sort 3"].map((option) => (
            <MenuItem key={option} onClick={() => handleSortSelect(option)}>
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  } else {
    return "No results";
  }
};

ChefSearchResult.propTypes = {
  chefs: PropTypes.array.isRequired,
};

export default ChefSearchResult;
