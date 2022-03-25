import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";

import { useNavigate, Link } from "react-router-dom";
import css from "./header.css";

const Header = () => {
  // TODO: getLocalStorage(item: string) en useLocalStorage()
  const userToken = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  const session =
    userToken === "null" ? "Iniciar Sesión" : JSON.parse(userEmail);

  const pages = [
    "Mis datos",
    "Mis mascotas reportadas",
    "Reportar mascota",
    session,
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();

  // ! Router: Si jode con login comentar if de linea 45 a 47 y listo
  const handleCloseNavMenu = (page?) => {
    setAnchorElNav(null);

    console.log(page, "page");

    const userToken = localStorage.getItem("token");

    console.log(userToken, "userToken");

    if (userToken === "null") {
      navigate("/login", { replace: true });
    } else if (page) {
      page === "Mis datos"
        ? navigate("/user-data", { replace: true })
        : null;

      page === "Mis mascotas reportadas"
        ? navigate("/user-pets", { replace: true })
        : null;

      page === "Reportar mascota"
        ? navigate("/pet-data", { replace: true })
        : null;

      page === "Iniciar Sesión" ? navigate("/login", { replace: true }) : null;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <div className={css.logoSection}>
              <PetsIcon />
            </div>
          </Link>

          {/* Mobile Header */}
          <Box
            className={css.mobileHeader}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Header */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                variant="outlined"
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { Header };
