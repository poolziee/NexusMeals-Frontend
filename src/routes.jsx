import Account from "./pages/Account";
import Chef from "./pages/Chef";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";

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
        element: <Todo name="ChefCategories" />,
      },
      {
        path: "categories/create",
        element: <Todo name="CreateCategory" />,
      },
      {
        path: "categories/:categoryId/update",
        element: <Todo name="UpdateCategory" />,
      },
      {
        path: "products",
        element: <Todo name="ChefProducts" />,
      },
      {
        path: "products/create",
        element: <Todo name="CreateProduct" />,
      },
      {
        path: "products/:productId/update",
        element: <Todo name="ProductUpdate" />,
      },
      {
        path: "history",
        element: <Todo name="ChefOrderHistory" />,
      },
    ],
  },
];

export default routes;
