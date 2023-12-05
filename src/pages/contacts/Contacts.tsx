import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import "./users.scss";
import { useState, useEffect } from "react";

import { BaseUrl } from "../requests";
import axios from "axios";
import { Backdrop, Box, Button, Fade, FormControl, InputLabel, MenuItem, Modal, NativeSelect, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
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
    field: "firstname",
    type: "string",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "lastname",
    type: "string",
    headerName: "Last Name ",
    headerAlign: 'center',
    align: 'center',
    width: 700,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },

  {
    field: "message",
    type: "string",
    headerName: "Message",
    width: 200,
  },
 
  
  
];

const Posts = () => {
  const [users, setUsers] = useState([])

  const [reload, setReload] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("")
  const [dsc, setDsc] = useState("")
  const [price, setPrice] = useState(null)
  const currentUser = useAppSelector((state)=> state.user.currentUser)
 
  // const userId = useAppSelector(state=>state.user.currentUser._id)
  
  const [isLoading, setIsLoading] = useState(true)




  const actionColumn: GridColDef = {
    field: "action",
    headerAlign:'center',
    align: 'center',
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer'}} className="delete">
          <Button onClick={async()=> {
                try {
                    await axios.delete(`${BaseUrl}/post/delete/${params.row._id}`)
                    alert("Post Deleted !")
                    setReload(!reload)
                } catch (error) {
                    alert("Error")
                }
            }} >
            <img src="/delete.svg" alt=""  />

            </Button>
          </div>
        </div>
      );
    },
  };



  const getAllUsers = async()=> {
    try {
      const res = await axios.get(`${BaseUrl}/contact/get`)
     
     
      setUsers(res.data)
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
        <h1>Contacts</h1>
        {/* <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            backgroundColor: "#800080",
            color: "white",
          }}
          onClick={handleOpen}
        >
          Add New Post
        </button> */}
      </div>
          
      
     

      {isLoading ? (
        "Loading..."
      ) : (
<DataGrid
        className="dataGrid"
        style={{backgroundColor: "#fff", fontFamily: 'Montserrat', color: 'black', fontSize: 14}}
        rows={users}
        columns={[...columns]}
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

export default Posts;
