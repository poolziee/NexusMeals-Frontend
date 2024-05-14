// @ts-nocheck
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TrashIcon from "../../icons/Trash";

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
import inventoryService from "../../services/inventory-service";
const sortOptions = [
  {
    label: "Category",
    value: "category",
  },
  {
    label: "Name",
    value: "name",
  },
];

const applyFilters = (products, query) =>
  products.filter((product) => {
    let matches = true;

    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }
    return matches;
  });

const applyPagination = (products, page, limit) =>
  products.slice(page * limit, page * limit + limit);

const ProductListTable = ({ products, onRefresh, ...other }) => {
  const navigate = useNavigate();
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

  const handleEditProduct = (product) => {
    navigate("/chef/products/update", {
      state: { product },
    });
  };

  const handleDeleteProduct = async (product) => {
    await inventoryService.deleteProduct(product);
    onRefresh();
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, query);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);

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
            placeholder="Search products"
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
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => {
                return (
                  <TableRow hover key={product.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {product.image ? (
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
                            <img alt="product" src={product.image} />
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
                          {product.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price}€</TableCell>
                    <TableCell>
                      <div
                        data-tag={product}
                        onClick={() => {
                          handleEditProduct(product);
                        }}
                      >
                        <IconButton>
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        data-tag={product}
                        onClick={() => {
                          handleDeleteProduct(product);
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
            count={filteredProducts.length}
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

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductListTable;
