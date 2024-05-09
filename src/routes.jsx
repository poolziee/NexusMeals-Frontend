import Account from "./pages/Account";
import Chef from "./pages/Chef";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import CategoryCreate from "./pages/chef/CategoryCreate";
import CategoryList from "./pages/chef/CategoryList";
import CategoryUpdate from "./pages/chef/CategoryUpdate";
import ProductCreate from "./pages/chef/ProductCreate";
import ProductList from "./pages/chef/ProductList";
import ProductUpdate from "./pages/chef/ProductUpdate";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "me",
    element: <Account />,
  },
  {
    path: "customer",
    element: <Customer />,
    children: [
      {
        path: "",
        element: <Todo name="BrowseChefs" />,
      },
      {
        path: "history",
        element: <Todo name="CustomerOrderHistory" />,
      },
    ],
  },
  {
    path: "chef",
    element: <Chef />,
    children: [
      {
        path: "",
        element: <Todo name="FinancialOverview" />,
      },
      {
        path: "categories",
        element: <CategoryList />,
      },
      {
        path: "categories/create",
        element: <CategoryCreate />,
      },
      {
        path: "categories/update",
        element: <CategoryUpdate />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "products/create",
        element: <ProductCreate />,
      },
      {
        path: "products/update",
        element: <ProductUpdate />,
      },
      {
        path: "history",
        element: <Todo name="ChefOrderHistory" />,
      },
    ],
  },
];

export default routes;
