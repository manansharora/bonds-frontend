import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';

const Trades = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { state } = useLocation();
  const securityID = state.id;
  console.log("state: ", securityID);

  const [data, setData] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://localhost:8080/securities/${securityID}/trades`)
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
        console.log(response.data)
      })
  }, [])

  console.log('render', data.length, 'notes')

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "bookId", headerName: "Book ID" },
    {
      field: "counterpartyId",
      headerName: "Counterparty ID",
      type: "number",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "tradeDate",
      headerName: "Trade Date",
      type: "date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "settlementDate",
      headerName: "Settlement Date",
      type: "date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { 
      field: "status", 
      headerName: "Trade Status",
      type: "checkbox"
    },
    { 
      field: "buySell", 
      headerName: "Buy/Sell",
      type: "checkbox"
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="TRADES"
        subtitle="List of Trades"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Trades;
