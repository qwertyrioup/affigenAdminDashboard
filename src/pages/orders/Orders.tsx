import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import "./Orders.scss";
import { useState, useEffect } from "react";

import { BaseUrl } from "../requests";
import axios from "axios";
import { Backdrop, Box, Fade, FormControl, InputLabel, MenuItem, Modal, NativeSelect, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,

  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },

  {
    field: "name",
    type: "string",
    headerName: "Client Name",
    width: 130,
  },
  {
    field: "line1",
    type: "string",
    headerName: "Address",
    width: 130,
  },
  {
    field: "city",
    type: "string",
    headerName: "City",
    width: 130,
  },
  {
    field: "postal_code",
    type: "string",
    headerName: "Postal Code",
    width: 130,
  },
  {
    field: "country",
    type: "string",
    headerName: "Country",
    width: 130,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 130,
  },

  {
    field: "quantity",
    type: "string",
    headerName: "Quantity",
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: "type",
    type: "string",
    headerName: "Type",
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: "total",
    type: "string",
    headerName: "Total",
    width: 130,
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
    width: 130,
  },
  {
    field: "seen",
    type: "string",
    headerName: "Seen",
    width: 130,
  },
  
  
];

const Users = () => {
  const [users, setUsers] = useState([])
  // const userId = useAppSelector(state=>state.user.currentUser._id)
  
  const [isLoading, setIsLoading] = useState(true)




  const actionColumn: GridColDef = {
    field: "action",
    headerAlign:'center',
    align: 'center',
    headerName: "View Order",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer'}} className="delete">
            <Link to={`/order/${params.row._id}`} >
            <img src="/view.svg" alt=""  />
            </Link>
          </div>
        </div>
      );
    },
  };



  const getAllUsers = async()=> {
    try {
      const res = await axios.get(`${BaseUrl}/order`)
      const newArrOfObj = res.data.map(item => {
        return {
          _id: item._id,
          name: item.user_details.name,
          phone: item.user_details.phone,
          line1: item.user_details.address.line1,
          line2: item.user_details.address.line2,
          city: item.user_details.address.city,
          country: item.user_details.address.country,
          postal_code: item.user_details.address.postal_code,
          state: item.user_details.address.state,
          quantity: item.cart.quantity,
          total: "€ "+item.cart.total,
          status: item.status,
          seen: item.seen,
          type: item.type,
          
        };
      });
      setUsers(newArrOfObj)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllUsers()
  }, [])

  return (
    <div className="users">
      
     
      
      <div className="info">
        <h1>Orders</h1>
    
      </div>
          
      
     

      {isLoading ? (
        "Loading..."
      ) : (
<DataGrid
        className="dataGrid"
        style={{backgroundColor: "#fff", fontFamily: 'Montserrat', color: 'black', fontSize: 14}}
        rows={users}
        columns={[...columns, actionColumn]}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        // onRowSelectionModelChange={item=> setList(eval(item))}
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
)}
      
    </div>
  );
};

export default Users;
