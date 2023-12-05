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
    field: "title",
    type: "string",
    headerName: "Title",
    width: 200,
  },
  {
    field: "dsc",
    type: "string",
    headerName: "Description",
    headerAlign: 'center',
    align: 'center',
    width: 700,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
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
      const res = await axios.get(`${BaseUrl}/post/getall`)
     
     
      setUsers(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const addProduct = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
     try {
       const res = await axios.post(`${BaseUrl}/post/create`, {title: title, dsc: dsc, price: price, userId: currentUser._id })
       alert("New Post Added !")
       handleClose()
       setReload(!reload)
     } catch (error) {
       alert("Error Please Try Again !")
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 25}} onSubmit={(e)=> addProduct(e)} >
              <div>
                <Typography style={{ color: "black", fontFamily: 'Montserrat' }}>
                  Add New Post
                </Typography>
              </div>
              <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 25, alignItems:'center', justifyContent: 'center'}} >
                <TextField
                  id="outlined-helperText"
                  label="Title"
                  onChange={(e)=>setTitle(e.target.value)}
                 
                  
                  
                />
                <TextField
                  id="outlined-helperText"
                  label="Description"
                  onChange={(e)=>setDsc(e.target.value)}
                 

                />
                <TextField
                  id="outlined-helperText"
                  label="Price"
                  type="number"
                  onChange={(e)=>setPrice(e.target.value)}
                

                />
              
              
              </div>
              <div>
                <button type="submit" style={{width: 100, height: 35,cursor: 'pointer', borderRadius: 25, border: 'none', backgroundColor: 'rgb(128, 0, 128)', color: "white", fontFamily: 'Montserrat'}} >Submit</button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
      
     
      
      <div className="info">
        <h1>Posts</h1>
        <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            backgroundColor: "#800080",
            color: "white",
          }}
          onClick={handleOpen}
        >
          Add New Post
        </button>
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

export default Posts;
