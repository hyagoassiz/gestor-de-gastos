import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setDrawerOpen } from "../../redux/drawerSlice";
import { useState } from "react";
import { options } from "./constants/constants";
import useAppBar from "./hooks/useAppBar";
import { useNavigate } from "react-router-dom";
import { useGlobalTheme } from "@/hooks/useGlobalTheme";

export const AppBar: React.FC = () => {
  const { drawer } = useAppBar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { darkMode, toggleDarkMode } = useGlobalTheme();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawer.isOpen ? drawer.drawerWidth : 0}px)`,
        ml: `${drawer.isOpen ? drawer.drawerWidth : 0}px`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(setDrawerOpen(true))}
          edge="start"
          sx={[{ mr: 2 }, drawer.isOpen && { display: "none" }]}
        >
          <MenuIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          sx={{ color: theme.palette.text.primary }}
        >
          Gestor de Gastos
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title={!darkMode ? "Modo Claro" : "Modo Escuro"}>
          <IconButton
            onClick={() => toggleDarkMode(!darkMode)}
            sx={{ color: theme.palette.text.primary, mr: 1 }}
          >
            {!darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Configurações">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="user.displayName" sx={{ width: 42, height: 42 }} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorElUser}
          open={!!anchorElUser}
          onClose={handleCloseUserMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.name}
              onClick={() => {
                handleCloseUserMenu();
                option?.action?.({ navigate });
              }}
              sx={{ gap: 1 }}
            >
              {option.icon}
              <Typography sx={{ fontSize: "12px" }}>{option.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </MuiAppBar>
  );
};
