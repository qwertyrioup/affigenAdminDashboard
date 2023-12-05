import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import "./users.scss";
import { useState, useEffect } from "react";

import { BaseUrl } from "../requests";
import axios from "axios";
import { Backdrop, Box, Fade, FormControl, InputLabel, MenuItem, Modal, NativeSelect, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

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
  { field: "_id", headerName: "ID", width: 100 },

  {
    field: "product_name",
    type: "string",
    headerName: "Product Name",
    width: 345,
  },
  {
    field: "cat_affigen",
    type: "string",
    headerName: "Cat Affigen",
    width: 200,
  },
  {
    field: "qty",
    type: "string",
    align: 'center',
    headerAlign: 'center',
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "buy_price",
    type: "string",
    align: 'center',
    headerAlign: 'center',
    headerName: "Buy Price",
    width: 150,
  },
  {
    field: "sell_price",
    type: "string",
    headerName: "Sell Price",
    align: 'center',
    headerAlign: 'center',
    width: 150,
  },
  
  
  
];

const Users = () => {
  const [users, setUsers] = useState([])
  const [order, setOrder] = useState({}) 
  const {id} = useParams()
  const [reload, setReload] = useState(false)
  const [revenue, setRevenue] = useState(0)



  
  
  const [isLoading, setIsLoading] = useState(true)




  const addRevenue = async() =>{
 
    try {
      const res = await axios.post(`${BaseUrl}/revenue/add`, {orderId: id, value: revenue})
    } catch (error) {
      console.log(error)
    }
  }






  const actionColumn: GridColDef = {
    field: "total",
    headerAlign:'center',
    align: 'center',
    headerName: "Total",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer'}} className="delete">
            <p> €  {params.row.qty * parseFloat(params.row.sell_price.replace(",", "."))} </p>
          </div>
        </div>
      );
    },
  };

  const revenueColumn: GridColDef = {
    field: "revenue",
    headerAlign:'center',
    align: 'center',
    headerName: "Revenue",
    width: 200,
    renderCell: (params) => {
      const value = (params.row.qty * parseFloat(params.row.sell_price.replace(",", "."))) - (params.row.qty * parseFloat(params.row.buy_price.replace(",", "."))) 
      
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer'}} className="delete">
            <p> €  {value} </p>
          </div>
        </div>
      );
    },
  };



  const getAllUsers = async()=> {
    try {
      const res = await axios.get(`${BaseUrl}/order/${id}`)
      const res1 = await axios.get(`${BaseUrl}/order/get/${id}`)
 

      setUsers(res.data)
      setOrder(res1.data)
      var total = 0
      res.data.map((u)=>{
        const value = (u.qty * parseFloat(u.sell_price.replace(",", "."))) - (u.qty * parseFloat(u.buy_price.replace(",", "."))) 
        total += value
      })
      setRevenue(total)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllUsers()

    
  }, [reload])

  return (
    <div className="users">
      
     
      
      <div className="info">
        <div>
        <h1>Order</h1>
        {order.status === "Delivered" && <p style={{fontWeight: 'bold', color: 'green'}} >{order.status}</p>}
        
        {order.status === "Processing" && <p style={{fontWeight: 'bold', color: 'gold'}} >{order.status}</p>}
        </div>

        {order.status !== "Delivered" && <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            backgroundColor: "#800080",
            color: "white",
          }}
          onClick={async()=>{
            try {
              addRevenue()
              const res = await axios.put(`${BaseUrl}/order/deliver/${id}`)
              alert("Success")
              setReload(!reload)
            } catch (error) {
              
            }
          }}

          
          
        >
          Deliver Order
        </button>}
        
    
      </div>
          
      
     

      {isLoading ? (
        "Loading..."
      ) : (
<DataGrid
        className="dataGrid"
        style={{backgroundColor: "#fff", fontFamily: 'Montserrat', color: 'black', fontSize: 14}}
        rows={users}
        columns={[...columns, actionColumn, revenueColumn]}
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
