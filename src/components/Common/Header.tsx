import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../../app/hooks";
import { authActions } from "../../features/auth/authSlice";

export function Header() {
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => dispatch(authActions.logout());
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
