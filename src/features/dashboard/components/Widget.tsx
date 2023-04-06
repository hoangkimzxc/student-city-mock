import {
  Box,
  Grid,
  LinearProgress,
  createTheme,
  Paper,
  Typography,
} from "@mui/material";

export interface WidgetProp {
  title: string;
  children: any;
}

const theme = createTheme();

export function Widget({ title, children }: WidgetProp) {
  return (
    <Paper
      sx={{
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
