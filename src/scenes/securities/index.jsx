import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from 'react'
import axios from "axios";

const Securities = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const data = [
  //     {
  //         "id": 1,
  //         "isin": "ABC123",
  //         "cusip": "CUSIP123",
  //         "issuer": "Maitri",
  //         "maturityDate": "2023-08-07T14:43:37.199+00:00",
  //         "coupon": 123.4,
  //         "type": "test",
  //         "faceValue": 123.4,
  //         "status": "DONE"
  //     }
  // ];
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:8080/security')
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
      })
  }, [])

  console.log('render', data.length, 'notes')

  const columns = [
    { field: "id", 
      headerName: "ID"
    },
    {
      field: "isin",
      headerName: "ISIN",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cusip",
      headerName: "CUSIP",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "issuer",
      headerName: "Issuer",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "maturityDate",
      headerName: "Maturity Date",
      type: "date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "coupon",
      headerName: "Coupon",
      type: "number",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "faceValue",
      headerName: "Face Value",
      type: "number",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Overdue",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="SECURITIES" subtitle="List of Securities" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Securities;
