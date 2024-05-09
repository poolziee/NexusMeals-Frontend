import authService from "./auth-service";
import req from "./nex-axios";

const getMyCategories = async () => {
  const userId = authService.getCurrentUser().id;
  const data = {
    chefId: userId,
    withProducts: true,
  };
  return req.post("/inventory/categories", data).then((response) => {
    return Promise.resolve(response.data);
  });
};

const getMyCategoryNames = async () => {
  const categories = await getMyCategories();
  return categories.map((category) => category.name);
};

const createCategory = async (category) => {
  return req.post("/inventory/category/create", category);
};

const updateCategory = async (category) => {
  return req.put("/inventory/category/update", category);
};

const createProduct = async (product) => {
  return req.post("/inventory/product/create", product);
};

const updateProduct = async (product) => {
  return req.put("/inventory/product/update", product);
};

const getMyProducts = async () => {
  const categories = await getMyCategories();
  const products = categories.reduce((acc, category) => {
    const productsFromCategory = category.products.map((product) => ({
      ...product,
      category: category.name,
    }));
    return acc.concat(productsFromCategory);
  }, []);
  return products;
};

export default {
  getMyCategories,
  getMyCategoryNames,
  createCategory,
  updateCategory,
  getMyProducts,
  createProduct,
  updateProduct,
};
