import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import "./users.scss";
import { useState, useEffect } from "react";

import { BaseUrl } from "../requests";
import axios from "axios";
import { Backdrop, Box, Button, Fade, FormControl, InputLabel, MenuItem, Modal, NativeSelect, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
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
  display: 'flex',
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: 2
};
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },

  {
    field: "category",
    type: "string",
    headerName: "Category",
    width: 250,
  },
  {
    field: "sub_category",
    type: "string",
    headerName: "Sub Category",
    width: 250,
  },
  {
    field: "brand",
    type: "string",
    headerName: "Brand",
    width: 250,
  }
  
];

const Categories = () => {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState("")
  const [cat, setCat] = useState("")
  const [subCat, setSubCat] = useState("")
  const [brand, setBrand] = useState("")
  const [reload, setReload] = useState(false)
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const [list, setList] = useState([])


  const userId = useAppSelector(state=>state.user.currentUser._id)
  
  const [isLoading, setIsLoading] = useState(true)

  const updateCategory = async (id: String) => {



    try {
      const res = await axios.put(`${BaseUrl}/category/${id}`, {category: cat, sub_category: subCat, brand: brand});
      handleClose()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }

  const deleteCategory = async (id: String) => {



    try {
      const res = await axios.delete(`${BaseUrl}/category/${id}`);
      handleClose1()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }

  const singleActions: GridColDef = {
    field: "single_actions",
    headerAlign:'center',
    align: 'center',
    headerName: "Single Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}} className="delete">
            <img src="/delete.svg" alt=""  onClick={()=> {
              setId(params.row._id)
              
              handleOpen1()
            }} />
            <img src="/view.svg" alt="" onClick={()=> {
              setId(params.row._id)
              setCat(params.row.category)
              setBrand(params.row.brand)
              setSubCat(params.row.sub_category)
           
              handleOpen()
            }}   />

          </div>
        </div>
      );
    },
  };

  const bulkActions: GridColDef = {
    field: "bluk_actions",
    headerAlign:'center',
    align: 'center',
    headerName: "Bulk Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}} className="delete">
            <img src="/delete.svg" alt=""  onClick={()=> {
              // setId(params.row._id)
              
              handleOpen3()
            }} />
            <img src="/view.svg" alt="" onClick={()=> {
              setCat("")
              setBrand("")
              setSubCat("")
              handleOpen2()
            }}  />

          </div>
        </div>
      );
    },
  };

  const multiUpdate = async () => {



    try {
      const res = await axios.put(`${BaseUrl}/category/updatemany/${list}`, {category: cat, brand: brand, sub_category: subCat});
      handleClose2()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }
  const multiDelete = async () => {



    try {
      const res = await axios.delete(`${BaseUrl}/category/deletemany/${list}`);
      handleClose3()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }


  const Create = async () => {



    try {
      const res = await axios.post(`${BaseUrl}/category/create`, {category: cat, sub_category: subCat, brand: brand});
      handleClose4()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }



  const getAllUsers = async()=> {
    try {
      const res = await axios.get(`${BaseUrl}/category/getallcats`)
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
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Category
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 15}} >
          <TextField
          label="Category"
          id="outlined-size-small"
          onChange={(e)=>setCat(e.target.value)}
          value={cat}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Sub Category"
          id="outlined-size-small"
          onChange={(e)=>setSubCat(e.target.value)}
          value={subCat}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Brand"
          id="outlined-size-small"
          onChange={(e)=>setBrand(e.target.value)}
          value={brand}
          size="small"
          sx={{width: '90%'}}
        />
        
          </div>
          <Button onClick={()=> Create()} variant="outlined">Add</Button>
        </Box>
      </Modal>

<Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Product
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 15}} >
          <TextField
          label="Category"
          id="outlined-size-small"
          onChange={(e)=>setCat(e.target.value)}
          value={cat}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Sub Category"
          id="outlined-size-small"
          onChange={(e)=>setSubCat(e.target.value)}
          value={subCat}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Brand"
          id="outlined-size-small"
          onChange={(e)=>setBrand(e.target.value)}
          value={brand}
          size="small"
          sx={{width: '90%'}}
        />
        
          </div>
          <Button onClick={()=> multiUpdate()} variant="outlined">Multi Update</Button>
        </Box>
      </Modal>

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bulk Delete Categories
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 15}} >
            <p>Are you sure To bulk delete selected categories ?</p>
          <Button onClick={()=> multiDelete()} variant="outlined">Yes Delete</Button>
          
          </div>
        </Box>
      </Modal>

<Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Category
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 15}} >
            <p>Are you sure To delete this category ?</p>
          <Button onClick={()=> deleteCategory(id)} variant="outlined">Yes Delete</Button>
          
          </div>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Category
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 20}} >
       
        <TextField
          label="Category"
          id="outlined-size-small"
          onChange={(e)=>setCat(e.target.value)}
          value={cat}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Sub Category"
          id="outlined-size-small"
          onChange={(e)=>setSubCat(e.target.value)}
          value={subCat}
          size="small"
          sx={{width: '90%'}}
        />
        <TextField
          label="Brand"
          
          id="outlined-size-small"
          onChange={(e)=>setBrand(e.target.value)}
          value={brand}
          size="small"
          sx={{width: '90%'}}
        />
        
          </div>
          <Button onClick={()=> updateCategory(id)}  variant="outlined">Update</Button>
        </Box>
      </Modal>
      
     
      
      <div className="info">
        <h1>Categories</h1>
        <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            backgroundColor: "#800080",
            color: "white",
          }}
          onClick={()=> {
            setCat("")
            setBrand("")
            setSubCat("")            
            handleOpen4()
          }}
        >
          Add New Category
        </button>
      </div>
          
      
     

      {isLoading ? (
        "Loading..."
      ) : (
<DataGrid
        className="dataGrid"
        style={{backgroundColor: "#fff", fontFamily: 'Montserrat', color: 'black', fontSize: 14}}
        rows={users.filter((user)=>  user._id!== userId )}
        columns={[...columns, singleActions, bulkActions]}
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
        // pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={item=> setList(eval(item))}
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        // hideFooter={false}
      />
)}
      
    </div>
  );
};

export default Categories;
