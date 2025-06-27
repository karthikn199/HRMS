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
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = originalData.filter((row) =>
      Object.entries(filters).every(
        ([key, val]) =>
          !val || row[key]?.toString().toLowerCase().includes(val.toLowerCase())
      )
    );
    setData(filtered);
  };

  const resetFilters = () => {
    const reset = { district: "", taluk: "", post: "", status: "" };
    setFilters(reset);
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
    { field: "district", headerName: "District", width: 140 },
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
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Post Details
      </Typography>

      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container spacing={2}>
          {Object.entries(filters).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Box sx={{ width: 200 }}>
                {" "}
                {/* Fixed width wrapper */}
                <FormControl fullWidth size="small">
                  <InputLabel>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </InputLabel>
                  <Select
                    name={key}
                    value={value}
                    label={key}
                    onChange={handleFilterChange}
                    sx={{ fontSize: 14 }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {[...new Set(originalData.map((item) => item[key]))]
                      .filter(Boolean)
                      .map((val, idx) => (
                        <MenuItem key={idx} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button onClick={resetFilters} variant="outlined">
                Reset
              </Button>
              <Button onClick={applyFilters} variant="contained">
                Apply Filters
              </Button>
              <Button
                onClick={() => {
                  const csv = [
                    Object.keys(data[0] || {}).join(","),
                    ...data.map((row) => Object.values(row).join(",")),
                  ].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "post_details.csv";
                  a.click();
                }}
                variant="outlined"
                color="secondary"
              >
                Export CSV
              </Button>
            </Box>
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
          rowsPerPageOptions={[10, 25, 50]}
          autoHeight
          disableSelectionOnClick
          sx={{
            border: "none",

            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${theme.palette.divider}`,
              fontSize: 14,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: theme.palette.grey[50],
            },
            "& .MuiDataGrid-columnHeaders": {
              background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)`,
              backdropFilter: "blur(8px)",
              color: theme.palette.text.primary,
              fontWeight: "bold",
              borderBottom: `1px solid ${theme.palette.divider}`,
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default PostDetailsTable;
