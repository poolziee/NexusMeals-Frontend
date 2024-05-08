import FolderOpenIcon from "../../icons/FolderOpen";
import UserIcon from "../../icons/User";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import ChartPieIcon from "../../icons/ChartPie";

const SidebarSections = (role) => {
  if (role === "CHEF") {
    return [
      {
        title: "General",
        items: [
          {
            title: "Account",
            path: "/me",
            icon: <UserIcon fontSize="small" />,
          },
        ],
      },
      {
        title: "Inventory",
        items: [
          {
            title: "Categories",
            icon: <FolderOpenIcon fontSize="small" />,
            path: "/chef/categories",
            children: [
              {
                title: "Create",
                path: "/chef/categories/create",
              },
              {
                title: "List",
                path: "/chef/categories",
              },
            ],
          },
          {
            title: "Products",
            icon: <FolderOpenIcon fontSize="small" />,
            path: "/chef/products",
            children: [
              {
                title: "Create",
                path: "/chef/products/create",
              },
              {
                title: "List",
                path: "/chef/products",
              },
            ],
          },
        ],
      },
      {
        title: "Finances",
        items: [
          {
            title: "Analytics",
            path: "/chef",
            icon: <ChartPieIcon fontSize="small" />,
          },
          {
            title: "Orders History",
            path: "/chef/history",
            icon: <ReceiptIcon fontSize="small" />,
          },
        ],
      },
    ];
  } else if (role === "CUSTOMER") {
    return [
      {
        title: "General",
        items: [
          {
            title: "Account",
            path: "/me",
            icon: <UserIcon fontSize="small" />,
          },
        ],
      },
      {
        title: "Food",
        items: [
          {
            title: "Chefs",
            path: "/customer",
            icon: <FoodBankIcon fontSize="small" />,
          },
          {
            title: "Orders History",
            path: "/customer/history",
            icon: <ReceiptIcon fontSize="small" />,
          },
        ],
      },
    ];
  }
};
export default SidebarSections;
