import { ChangeEvent } from "react";
import { City, ListParams } from "../../../models";
import {
  Box,
  FormControl,
  Grid,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="searchByName"
              endAdornment={<SearchIcon />}
              // defaultValue={filter.name_like}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
