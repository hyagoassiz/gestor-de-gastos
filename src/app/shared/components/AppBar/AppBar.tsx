import {
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Menu,
  Typography,
  MenuItem,
  Box,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import { Title } from "./styles";
import { useAppBar } from "./hooks/useAppBar";
import { options } from "./constants";

export const AppBar: React.FC = () => {
  const {
    user,
    handleOpenUserMenu,
    anchorElUser,
    handleCloseUserMenu,
    navigate,
  } = useAppBar();

  return (
    <MuiAppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Title noWrap />
          <Box gap={2} sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{ fontWeight: 600, fontSize: "14px", fontStyle: "italic" }}
            >
              {`Olá, ${user.displayName}`}
            </Typography>

            <Tooltip title="Configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${user.displayName}`}
                  sx={{ width: 42, height: 42 }}
                  src="data:image/jpeg;base64,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"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {options.map((option) => (
                <MenuItem
                  sx={{ gap: 1 }}
                  key={option.name}
                  onClick={async () => {
                    navigate(option.route);
                    if (option.function) {
                      await option.function();
                    }
                  }}
                >
                  {option.icon}
                  <Typography sx={{ fontSize: "12px" }} textAlign="center">
                    {option.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
