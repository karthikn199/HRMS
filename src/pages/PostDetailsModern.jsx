import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";

const generateMockData = (count = 20) => {
  const districts = ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"];
  const statuses = ["active", "pending", "closed"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    district: districts[Math.floor(Math.random() * districts.length)],
    taluk: `${faker.location.city()} Taluk`,
    institution: ["District Office", "Regional Office", "Headquarters"][
      Math.floor(Math.random() * 3)
    ],
    payScale: ["₹40,900-₹78,200", "₹35,600-₹67,800"][
      Math.floor(Math.random() * 2)
    ],
    post: ["Taluk Officer", "Project Coordinator", "Field Officer"][
      Math.floor(Math.random() * 3)
    ],
    goNumber: `GO-${Math.floor(1000 + Math.random() * 9000)}`,
    goDate: faker.date.past().toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    noOfPost: Math.floor(Math.random() * 5) + 1,
  }));
};

const PostDetailsTable = () => {
  const theme = useTheme();
  const originalData = useMemo(() => generateMockData(), []);
  const [data, setData] = useState(originalData);
  const [filters, setFilters] = useState({
    district: "",
    taluk: "",
    post: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = originalData.filter((row) =>
      Object.entries(updatedFilters).every(
        ([key, val]) =>
          !val ||
          (row[key] !== undefined &&
            row[key] !== null &&
            row[key].toString().toLowerCase().includes(val.toLowerCase()))
      )
    );

    setData(filtered);
  };

  const resetFilters = () => {
    setFilters({ district: "", taluk: "", post: "", status: "" });
    setData(originalData);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      renderCell: (params) => (
        <Avatar
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            width: 32,
            height: 32,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {params.value}
        </Avatar>
      ),
    },
    {
      field: "district",
      headerName: "District",
      width: 140,
      renderCell: (params) => (
        <Typography fontWeight={500}>{params.value}</Typography>
      ),
    },
    { field: "taluk", headerName: "Taluk", width: 160 },
    { field: "post", headerName: "Post", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor:
              params.value === "active"
                ? alpha(theme.palette.success.main, 0.1)
                : params.value === "pending"
                ? alpha(theme.palette.warning.main, 0.1)
                : alpha(theme.palette.error.main, 0.1),
            color:
              params.value === "active"
                ? theme.palette.success.main
                : params.value === "pending"
                ? theme.palette.warning.main
                : theme.palette.error.main,
            fontWeight: 600,
            px: 1,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      field: "noOfPost",
      headerName: "Posts",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    { field: "goNumber", headerName: "GO Number", width: 160 },
    { field: "goDate", headerName: "GO Date", width: 120 },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 3 }}
      >
        Post Details
      </Typography>

      {/* Filter UI */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container spacing={2}>
          {Object.keys(filters).map((filterKey) => (
            <Grid item xs={12} sm={6} md={12} key={filterKey}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: 14 }}>
                  {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                </InputLabel>
                <Select
                  value={filters[filterKey]}
                  name={filterKey}
                  label={filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                  onChange={handleFilterChange}
                  sx={{
                    borderRadius: 1,
                    "& .MuiSelect-select": {
                      py: 1.25,
                      fontSize: 14,
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {[...new Set(originalData.map((item) => item[filterKey]))]
                    .filter((val) => val)
                    .map((val, idx) => (
                      <MenuItem key={idx} value={val} sx={{ fontSize: 14 }}>
                        {val}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button onClick={resetFilters} variant="outlined" sx={{ px: 3 }}>
              Reset
            </Button>
            <Button variant="contained" sx={{ px: 3 }}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper
        sx={{
          borderRadius: 2,
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.grey[50],
              fontWeight: 600,
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${theme.palette.divider}`,
              py: 1.5,
              fontSize: 14,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: theme.palette.grey[50],
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default PostDetailsTable;
