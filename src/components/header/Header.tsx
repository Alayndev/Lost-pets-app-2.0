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
import { emailState } from "hooks/useCheckUser";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getLocalStorageItem, setLSItem } from "lib/localStorage";
import { tokenState, userNameState } from "lib/atoms";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PrimaryButton } from "ui/buttons";

const Header = () => {
  const userToken = getLocalStorageItem("token");

  const session = !userToken ? "Iniciar Sesión" : "Cerrar Sesión";

  const pages = [
    "Mis datos",
    "Mis mascotas reportadas",
    "Reportar mascota",
    session,
  ];

  const [token, setToken] = useRecoilState(tokenState);
  const [email, setEmail] = useRecoilState(emailState);
  const setUserName = useSetRecoilState(userNameState);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const MySwal = withReactContent(Swal);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();

  // ! Router:
  const handleCloseNavMenu = (page?) => {
    setAnchorElNav(null);

    console.log(page, "page");

    if (userToken === null) {
      navigate("/login", { replace: true });
    } else if (page) {
      page === "Mis datos" ? navigate("/user-data", { replace: true }) : null;

      page === "Mis mascotas reportadas"
        ? navigate("/user-pets", { replace: true })
        : null;

      page === "Reportar mascota"
        ? navigate("/pet-data", { replace: true })
        : null;

      page === "Iniciar Sesión" ? navigate("/login", { replace: true }) : null;

      if (page === "Cerrar Sesión") {
        const handleLogOutClick = () => {
          setLSItem("token", null);
          setLSItem("email", null);
          setToken(null);
          setEmail(null);
          setUserName(null);
          navigate("/", { replace: true });

          MySwal.fire({
            icon: "success",

            width: "345px",
            position: "center",
          });
        };

        MySwal.fire({
          icon: "question",
          title: (
            <>
              <p className={css.title}>¿DESEA CERRAR SESION?</p>
              <div onClick={handleLogOutClick}>
                <PrimaryButton> CERRAR SESION</PrimaryButton>
              </div>
            </>
          ),
          width: "345px",
          position: "center",

          showDenyButton: true,
          denyButtonText: `Cancelar`,
          showConfirmButton: false,
        });
      }
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
