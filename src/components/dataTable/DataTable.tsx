import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, Modal, TablePagination, TextField, Typography } from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../../pages/requests";

import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },

  {
    field: "cat_affigen",
    type: "string",
    headerName: "Cat",
    width: 130,
  },
  {
    field: "product_name",
    type: "string",
    headerName: "Product Name",
    width: 550,
  },
  {
    field: "size",
    type: "string",
    headerName: "Size",
    width: 100,
  },
  {
    field: "buy_price",
    type: "string",
    headerName: "Buy Price",
    width: 150,
  },
  {
    field: "sell_price",
    type: "string",
    headerName: "Sell Price",
    width: 150,
  },
  // {
  //   field: "single_actions",
  //   type: "string",
  //   headerName: "Single Actions",
  //   width: 150,
  // },

  // {
  //   field: "bulk_actions",
  //   type: "string",
  //   headerName: "Bulk Actions",
  //   width: 150,
  // },
  
  
];



export default function BasicTable() {
  const [page, setPage] = React.useState(1);
  const [list, setList] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [reload, setReload] = useState(false);
  const debouncedSearchTerm = useDebounce(searchValue, 2000);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [id, setId] = useState("");
  const [cat, setCat] = React.useState("")
  const [product, setProduct] = React.useState("")
  const [size, setSize] = React.useState("")
  const [buyPrice, setBuyPrice] = React.useState(null)
  const [sellPrice, setSellPrice] = React.useState(null)

  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const addPopular = async(product_name: string, cat_affigen: string, product_id: string) => {
    try {
      const isPopular = (await axios.get(`${BaseUrl}/popular/get/${cat_affigen}`)).data
     console.log(typeof isPopular);
      if (Object.keys(isPopular).length>0) {
        alert('Product Already in Polpular List')
      } else {
        const response = await axios.post(`${BaseUrl}/popular/create`, {
          product_name: product_name,
          cat_affigen: cat_affigen,
          product_id: product_id
        })
        alert('Successfully added to popular list')
        
      }
    } catch (error) {
      console.log(error)
    }
  }


  const fetchData = async () => {
    if (!debouncedSearchTerm) {
      const res = await axios.get(`${BaseUrl}/odoo?page=${page}`);
      setData(res.data.results);
      setCount(res.data.count);
    } else {
      const res = await axios.get(
        `${BaseUrl}/elastic?param=${debouncedSearchTerm}&page=${page}`
      );
      setData(res.data.results);
      setCount(res.data.count);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearchTerm, reload]);

  const updateProduct = async (id: String) => {



    try {
      const res = await axios.put(`${BaseUrl}/odoo/${id}`, {cat_affigen: cat, product_name: product, size: size, buy_price: buyPrice, sell_price: sellPrice});
      handleClose()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }


  const deleteProduct = async (id: String) => {



    try {
      const res = await axios.delete(`${BaseUrl}/odoo/${id}`);
      handleClose1()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }

  const multiUpdate = async () => {



    try {
      const res = await axios.put(`${BaseUrl}/odoo/updatemany/${list}`, {cat_affigen: cat, product_name: product, size: size, buy_price: buyPrice, sell_price: sellPrice});
      handleClose2()
      alert("Success")
      setReload(!reload)
    } catch (error) {
      alert("Error")
    }
  }



  const multiDelete = async () => {



    try {
      const res = await axios.delete(`${BaseUrl}/odoo/deletemany/${list}`);
      handleClose3()
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
              setCat(params.row.cat_affigen)
              setProduct(params.row.product_name)
              setSize(params.row.size)
              setBuyPrice(params.row.buy_price)
              setSellPrice(params.row.sell_price)
              handleOpen()
            }}  />

          </div>
        </div>
      );
    },
  };


  const inHome: GridColDef = {
    field: "in_home",
    headerAlign:'center',
    align: 'center',
    headerName: "Popular",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action" >
          
          
          <div style={{paddingTop: 5.5, cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}} className="delete">
            
            <img src="/view.svg" alt="" onClick={async()=>{
              await addPopular(params.row.product_name, params.row.cat_affigen, params.row._id)
            }}  />

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
            }}/>
            <img src="/view.svg" alt="" onClick={()=> {
              setId("")
              setCat("")
              setProduct("")
              setSize("")
              setBuyPrice(null)
              setSellPrice(null)
              handleOpen2()
            }}  />

          </div>
        </div>
      );
    },
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <TextField
          label="Search"
          // id="outlined-size-small"
          defaultValue={searchValue}
          size="small"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Product
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 15}} >
          <TextField
          label="Cat"
          id="outlined-size-small"
          onChange={(e)=>setCat(e.target.value)}
          value={cat}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Product Name"
          id="outlined-size-small"
          onChange={(e)=>setProduct(e.target.value)}
          value={product}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Size"
          id="outlined-size-small"
          onChange={(e)=>setSize(e.target.value)}
          value={size}
          size="small"
          sx={{width: '90%'}}
        />
        <TextField
          label="Buy Price"
          type="number"
          id="outlined-size-small"
          onChange={(e)=>setBuyPrice(Number(e.target.value))}
          value={buyPrice}
          size="small"
          sx={{width: '90%'}}
        />
        <TextField
          label="Sell Price"
          type="number"
          id="outlined-size-small"
          onChange={(e)=>setSellPrice(Number(e.target.value))}
          value={sellPrice}
          size="small"
          sx={{width: '90%'}}
        />
          </div>
          <Button onClick={()=> updateProduct(id)} variant="outlined">Update</Button>
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
          label="Cat"
          id="outlined-size-small"
          onChange={(e)=>setCat(e.target.value)}
          value={cat}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Product Name"
          id="outlined-size-small"
          onChange={(e)=>setProduct(e.target.value)}
          value={product}
          size="small"
          sx={{width: '90%'}}
          
        />
        <TextField
          label="Size"
          id="outlined-size-small"
          onChange={(e)=>setSize(e.target.value)}
          value={size}
          size="small"
          sx={{width: '90%'}}
        />
        <TextField
          label="Buy Price"
          type="number"
          id="outlined-size-small"
          onChange={(e)=>setBuyPrice(e.target.value)}
          value={buyPrice}
          size="small"
          sx={{width: '90%'}}
        />
        <TextField
          label="Sell Price"
          type="number"
          id="outlined-size-small"
          onChange={(e)=>setSellPrice(e.target.value)}
          value={sellPrice}
          size="small"
          sx={{width: '90%'}}
        />
          </div>
          <Button onClick={()=> multiUpdate()} variant="outlined">Multi Update</Button>
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
            Delete Product
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 15}} >
            <p>Are you sure To delete this product ?</p>
          <Button onClick={()=> deleteProduct(id)} variant="outlined">Yes Delete</Button>
          
          </div>
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
            Bulk Delete Products
          </Typography>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 15}} >
            <p>Are you sure To bulk delete selected products ?</p>
          <Button onClick={()=> multiDelete()} variant="outlined">Yes Delete</Button>
          
          </div>
        </Box>
      </Modal>


<DataGrid
        className="dataGrid"
        style={{height: 600, backgroundColor: "#fff", fontFamily: 'Montserrat', color: 'black', fontSize: 14}}
        rows={data}
        columns={[...columns,inHome, singleActions, bulkActions]}
        getRowId={(row) => row._id}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 10,
        //     },
        //   },
        // }}
        // slots={{ toolbar: GridToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //     quickFilterProps: { debounceMs: 500 },
        //   },
        // }}
        // pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={item=> setList(eval(item))}
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        hideFooter={true}
      />


      <TablePagination
        component="div"
        sx={{ backgroundColor: "#fff" }}
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
