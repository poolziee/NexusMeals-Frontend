import { useRef, useState } from "react";
import { subDays, subHours } from "date-fns";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import BellIcon from "../../../icons/Bell";
import CreditCardIcon from "../../../icons/CreditCard";
import ShoppingCartIcon from "../../../icons/ShoppingCart";

const now = new Date();

const notifications = [
  {
    id: "5e8883f1b51cc1956a5a1ec0",
    createdAt: subHours(now, 2).getTime(),
    description: "Dummy text",
    title: "Your order is placed",
    type: "order_placed",
  },
  {
    id: "5e8883fca0e8612044248ecf",
    createdAt: subDays(now, 3).getTime(),
    description: "Dummy text",
    title: "Your item is shipped",
    type: "item_shipped",
  },
];

const iconsMap = {
  item_shipped: ShoppingCartIcon,
  order_placed: CreditCardIcon,
};

const NotificationsPopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={anchorRef} onClick={handleOpen}>
          <Badge color="error" badgeContent={4}>
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 320 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="h6">
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography color="textPrimary" variant="subtitle2">
              There are no notifications
            </Typography>
          </Box>
        ) : (
          <>
            <List disablePadding>
              {notifications.map((notification) => {
                const Icon = iconsMap[notification.type];

                return (
                  <ListItem divider key={notification.id}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor: "primary.main",
                          color: "primary.contrastText",
                        }}
                      >
                        <Icon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link
                          color="textPrimary"
                          sx={{ cursor: "pointer" }}
                          underline="none"
                          variant="subtitle2"
                        >
                          {notification.title}
                        </Link>
                      }
                      secondary={notification.description}
                    />
                  </ListItem>
                );
              })}
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Button color="primary" size="small" variant="text">
                Mark all as read
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotificationsPopover;
