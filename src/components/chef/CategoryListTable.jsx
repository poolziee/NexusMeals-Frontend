// @ts-nocheck
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import ImageIcon from "../../icons/Image";
import PencilAltIcon from "../../icons/PencilAlt";
import SearchIcon from "../../icons/Search";
import Scrollbar from "../Scrollbar";
import TrashIcon from "../../icons/Trash";
import inventoryService from "../../services/inventory-service";

const sortOptions = [
  {
    label: "Products (highest first)",
    value: "products|desc",
  },
  {
    label: "Products (lowest first)",
    value: "products|asc",
  },
];

const applyFilters = (categories, query) =>
  categories.filter((category) => {
    let matches = true;

    if (query && !category.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }
    return matches;
  });

const applyPagination = (categories, page, limit) =>
  categories.slice(page * limit, page * limit + limit);

const CategoryListTable = ({ categoriesFull, onRefresh, ...other }) => {
  const navigate = useNavigate();
  const categories = categoriesFull.map((category) => ({
    ...category,
    products: category.products.length,
  }));
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleEditCategory = (category) => {
    navigate("/chef/categories/update", {
      state: { category },
    });
  };

  const handleDeleteCategory = async (category) => {
    await inventoryService.deleteCategory(category);
    onRefresh();
  };

  // Usually query is done on backend with indexing solutions
  const filteredCategories = applyFilters(categories, query);
  const paginatedCategories = applyPagination(filteredCategories, page, limit);

  return (
    <Card {...other}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          m: -1,
          p: 2,
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search categories"
            value={query}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 240,
          }}
        >
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 240,
          }}
        ></Box>
      </Box>
      <Scrollbar>
        <Box sx={{ minWidth: 1200 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Total Products</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((category) => {
                return (
                  <TableRow hover key={category.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {category.image ? (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "background.default",
                              display: "flex",
                              height: 100,
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 100,
                              "& img": {
                                height: "auto",
                                width: "100%",
                              },
                            }}
                          >
                            <img alt="category" src={category.image} />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "background.default",
                              display: "flex",
                              height: 100,
                              justifyContent: "center",
                              width: 100,
                            }}
                          >
                            <ImageIcon fontSize="small" />
                          </Box>
                        )}
                        <Link
                          color="textPrimary"
                          component={RouterLink}
                          to="#"
                          underline="none"
                          sx={{ ml: 2 }}
                          variant="subtitle2"
                        >
                          {category.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.products}</TableCell>
                    <TableCell>
                      <div
                        data-tag={category}
                        onClick={() => {
                          handleEditCategory(category);
                        }}
                      >
                        <IconButton>
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        data-tag={category}
                        onClick={() => {
                          handleDeleteCategory(category);
                        }}
                      >
                        <IconButton>
                          <TrashIcon color="error" fontSize="small" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredCategories.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Scrollbar>
    </Card>
  );
};

CategoryListTable.propTypes = {
  categoriesFull: PropTypes.array.isRequired,
};

export default CategoryListTable;
