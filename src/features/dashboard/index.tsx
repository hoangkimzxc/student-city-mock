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
import {
  Box,
  Grid,
  LinearProgress,
  createTheme,
  Typography,
} from "@mui/material";
import StatisticItem from "./components/StatisticItem";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Face4Icon from "@mui/icons-material/Face4";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { Widget } from "./components/Widget";
import StudentRankingList from "./components/StudentRankingList";

const theme = createTheme();

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

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

      {/* All Students Ranking */}
      <Box mt={5}>
        <Typography variant="h4">All Students</Typography>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Rankings By City */}
      <Box mt={5}>
        <Typography variant="h4">Rankings by City</Typography>
        <Box>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={`TP. ${ranking.cityName}`}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
