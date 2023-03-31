import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Header, Sidebar } from "../Common";

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "240px 1fr",
    gridTemplateAreas: '"header header" "sidebar main"',
    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
    borderBottom: "1px solid #ccc",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: "1px solid #ccc",
  },
  main: {
    gridArea: "main",
    padding: "16px 18px",
  },
}));

export function AdminLayout() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>Main</Box>
    </Box>
  );
}
