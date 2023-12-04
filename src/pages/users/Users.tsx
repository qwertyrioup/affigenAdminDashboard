import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import "./Users.scss";
import { useState, useEffect } from "react";

import { BaseUrl } from "../requests";
import axios from "axios";
import { Backdrop, Box, Fade, FormControl, InputLabel, MenuItem, Modal, NativeSelect, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";

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
    width: 150,
  },
  {
    field: "lastname",
    type: "string",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "country",
    type: "string",
    headerName: "Country",
    width: 150,
  },
  {
    field: "address",
    type: "string",
    headerName: "Address",
    width: 150,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "isAdmin",
    type: "string",
    headerName: "isAdmin",
    width: 200,
  },
  {
    field: "createdAt",
    type: "string",
    headerName: "Creation Date",
    width: 200,
  },
  
];

const Users = () => {
  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const userId = useAppSelector(state=>state.user.currentUser._id)
  
  const [isLoading, setIsLoading] = useState(true)
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [reload, setReload] = useState(false)
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  console.log(isAdmin)
  const handleChange = (e: SelectChangeEvent) => {
    setIsAdmin(!isAdmin);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerAlign:'center',
    align: 'center',
    headerName: "Delete",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer'}} className="delete">
            <img src="/delete.svg" alt="" onClick={() => handleDelete(params.row._id)} />
          </div>
        </div>
      );
    },
  };

  const handleDelete = async(id: number) => {
    try {

      const res = await axios.delete(`${BaseUrl}/auth/${id}`)
      
      
      alert("User Deleted Successfully !")
      setReload(!reload)
    } catch (error) {
      alert("Error Please Try Again !")
      console.log(error)
    }
  };

  const addUser = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
     try {
       const res = await axios.post(`${BaseUrl}/auth/signup`, {name: userName, email: email, password: password, isAdmin: isAdmin})
       alert("New User Added !")
       handleClose()
       setReload(!reload)
     } catch (error) {
       alert("Error Please Try Again !")
     }
   }

  const getAllUsers = async()=> {
    try {
      const res = await axios.get(`${BaseUrl}/auth/findall`)
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 25}} onSubmit={(e)=> addUser(e)} >
              <div>
                <Typography style={{ color: "black", fontFamily: 'Montserrat' }}>
                  Add New User
                </Typography>
              </div>
              <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 25, alignItems:'center', justifyContent: 'center'}} >
                <TextField
                  id="outlined-helperText"
                  label="User Name"
                  defaultValue={userName}
                  onChange={e => setUserName(e.target.value)}
                  
                />
                <TextField
                  id="outlined-helperText"
                  label="Email"
                  defaultValue={email}
                  onChange={e => setEmail(e.target.value)}

                />
                <TextField
                  id="outlined-helperText"
                  label="Password"
                  defaultValue={password}
                  onChange={e => setPassword(e.target.value)}

                />

<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">isAdmin</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={isAdmin}
        label="isAdmin"
        onChange={handleChange}
        
      >
        
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
        
      </Select>
    </FormControl>
              
              </div>
              <div>
                <button type="submit" style={{width: 100, height: 35,cursor: 'pointer', borderRadius: 25, border: 'none', backgroundColor: 'rgb(128, 0, 128)', color: "white", fontFamily: 'Montserrat'}} >Submit</button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
     
      
      <div className="info">
        <h1>Users</h1>
        {/* <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            backgroundColor: "#800080",
            color: "white",
          }}
          onClick={()=> {handleOpen()}}
        >
          Add New User
        </button> */}
      </div>
          
      
     

      {isLoading ? (
        "Loading..."
      ) : (
<DataGrid
        className="dataGrid"
        style={{backgroundColor: "#fff", fontFamily: 'Montserrat', color: 'black', fontSize: 14}}
        rows={users.filter((user)=>  user._id!== userId )}
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
