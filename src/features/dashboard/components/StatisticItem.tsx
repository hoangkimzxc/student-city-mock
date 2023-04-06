import * as React from "react";
import { Box, Paper, Typography, createTheme } from "@mui/material";

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const theme = createTheme();

export default function StatisticItem({
  icon,
  label,
  value,
}: StatisticItemProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(1, 2),
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
