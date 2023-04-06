import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  dashBoardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./dashboardSlice";
import { Box, Grid, LinearProgress, createTheme } from "@mui/material";
import StatisticItem from "./components/StatisticItem";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Face4Icon from "@mui/icons-material/Face4";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

const theme = createTheme();

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  console.log({
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCityList,
  });

  useEffect(() => {
    dispatch(dashBoardActions.fetchData());
  }, [dispatch]);
  return (
    <Box sx={{ position: "relative", paddingTop: theme.spacing(1) }}>
      {/* Loading */}
      {loading && (
        <LinearProgress
          sx={{ position: "absolute", top: theme.spacing(-1), width: "100%" }}
        />
      )}

      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAltIcon fontSize="large" color="primary" />}
            label={"male"}
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Face4Icon fontSize="large" color="primary" />}
            label={"female"}
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubbleIcon fontSize="large" color="primary" />}
            label={"mark >= 8"}
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LinearScaleIcon fontSize="large" color="primary" />}
            label={"mark <= 5"}
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
