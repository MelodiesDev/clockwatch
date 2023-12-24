import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { ClockifyUser } from "@/types/ClockifyUser";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const queryClient = useQueryClient();

  const { data: user } = useQuery<ClockifyUser>({
    queryKey: ["clockify", "user"],
    queryFn: () =>
      fetch("https://api.clockify.me/api/v1/user", {
        headers: {
          "X-Api-Key": localStorage.getItem("apiKey") || ""
        }
      }).then((res) => res.json())
  });

  const [apiKey, setApiKey] = useState("");

  async function handleAPIkey() {
    localStorage.setItem("apiKey", apiKey);
    await queryClient.invalidateQueries({ queryKey: ["clockify"] });
    setApiKey("");
  }

  const hasApiKey = !!localStorage.getItem("apiKey");

  const handleLogout = () => {
    localStorage.removeItem("apiKey");
    queryClient.invalidateQueries({ queryKey: ["clockify"] });
    handleClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {!hasApiKey && (
          <React.Fragment>
            <TextField
              variant="outlined"
              size="small"
              label="Enter your API key."
              sx={{ mr: 2 }}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type={"password"}
            />
            <Button
              onClick={handleAPIkey}
              sx={{ mr: 2 }}
              variant="contained"
              color="success"
              disableElevation
            >
              Login
            </Button>
          </React.Fragment>
        )}

        <Typography sx={{ minWidth: 100 }}>{user?.name}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={user?.profilePicture} sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
