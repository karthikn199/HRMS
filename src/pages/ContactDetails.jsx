import { faker } from "@faker-js/faker";
import DeleteIcon from "@mui/icons-material/Delete";
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

const generateMockContactData = (count = 20) => {
  const groups = ["Group A", "Group B", "Group C", "Group D"];
  const institutions = [
    "MORS",
    "Handiya",
    "Maruti Desai Residential I/O College",
    "Pre-Metric Boys Herald",
  ];
  const categories = ["28/W", "2A", "CM/2A/RL", "CM/2R/WNK", "28/MK"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    registerNo: faker.number.int({ min: 100000, max: 999999 }).toString(),
    name: faker.person.fullName(),
    contactNumber: faker.phone.number(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    dateOfBirth: faker.date.past().toLocaleDateString(),
    cdMember: `SND ${faker.number.int({ min: 1, max: 200 })}/${faker.number.int(
      { min: 1, max: 12 }
    )}/${faker.number.int({ min: 2000, max: 2023 })}`,
    group: groups[Math.floor(Math.random() * groups.length)],
    institution: institutions[Math.floor(Math.random() * institutions.length)],
    selectedCategory: categories[Math.floor(Math.random() * categories.length)],
    status: ["active", "inactive"][Math.floor(Math.random() * 2)],
  }));
};

const ContactDetailsTable = () => {
  const theme = useTheme();
  const originalData = useMemo(() => generateMockContactData(), []);
  const [data, setData] = useState(originalData);
  const [filters, setFilters] = useState({
    registerNo: "",
    name: "",
    group: "",
    institution: "",
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
    const reset = {
      registerNo: "",
      name: "",
      group: "",
      institution: "",
      status: "",
    };
    setFilters(reset);
    setData(originalData);
  };

  const handleEdit = (id) => {
    const rowToEdit = data.find((row) => row.id === id);
    console.log("Editing:", rowToEdit);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setData(data.filter((row) => row.id !== id));
    }
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
    { field: "registerNo", headerName: "Register No", width: 120 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "contactNumber", headerName: "Contact", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "dateOfBirth", headerName: "DOB", width: 120 },
    {
      field: "cdMember",
      headerName: "CD Member",
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.info.main, 0.1),
            color: theme.palette.info.main,
            fontWeight: 500,
          }}
        />
      ),
    },
    { field: "group", headerName: "Group", width: 100 },
    { field: "institution", headerName: "Institution", width: 200 },
    { field: "selectedCategory", headerName: "Category", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor:
              params.value === "active"
                ? alpha(theme.palette.success.main, 0.1)
                : alpha(theme.palette.error.main, 0.1),
            color:
              params.value === "active"
                ? theme.palette.success.main
                : theme.palette.error.main,
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={(e) => handleDelete(params.row.id)}
            sx={{ minWidth: 0, p: "4px" }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Contact Details
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
                 <Grid item xs={12} sm={6} md={2} key={key}>
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
                   <Button onClick={""} variant="outlined">
                     Add Contact
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

export default ContactDetailsTable;
