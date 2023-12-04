import { useEffect, useState } from "react";
import "./affigen.scss";
import DataTable from "../../components/dataTable/DataTable";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {BaseUrl} from "../requests"
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Backdrop, Box, Fade, Modal, TextField, Typography } from "@mui/material";


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


const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'product_name', headerName: 'Name', type: 'string', width: 150 },
  { field: 'category', headerName: 'Category', type: 'string', width: 150 },
  { field: 'supplier', headerName: 'Supplier', type: 'string', width: 150 },
  { field: 'cat_affigen', headerName: 'Cat Affigen', type: 'string', width: 150 },
  { field: 'cat_original', headerName: 'Cat Original', type: 'string', width: 150 },
  { field: 'size', headerName: 'size', type: 'string', width: 150 },
  { field: 'buy_price', headerName: 'Buy Price', type: 'string', width: 150 },
  { field: 'sell_price', headerName: 'Sell Price', type: 'string', width: 150 },
 
  
 
];




const Affigen = () => {
  const text = useLocation();
  const type = text.pathname.slice(1);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("")
  const [cat, setCat] = useState("")
  const [sup, setSup] = useState("")
  const [catAffigen, setCatAffigen] = useState("")
  const [catOriginal, setCatOriginal] = useState("")
  const [size, setSize] = useState("")
  const [buyPrice, setBuyPrice] = useState("")
  const [sellPrice, setSellPrice] = useState("")

  const addProduct = async(e: React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
    try {
      const res = await axios.post(`${BaseUrl}/affigen/add`, {product_name: name, category: cat, cat_affigen: catAffigen, supplier: sup, cat_original: catOriginal, size: size, buy_price: buyPrice, sell_price: sellPrice})
      alert("New Affigen Product Added !")
      handleClose()
      setReload(!reload)
    } catch (error) {
      alert("Error Please Try Again !")
    }
  }
  const getProducts = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/${type}`);
      setProducts(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
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
                  Add New Affigen Product
                </Typography>
              </div>
              <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 25, alignItems:'center', justifyContent: 'center'}} >
                <TextField
                  id="outlined-helperText"
                  label="Product Name"
                  defaultValue={name}
                  onChange={e => setName(e.target.value)}
                  
                />
               
                <TextField
                  id="outlined-helperText"
                  label="Category"
                  defaultValue={cat}
                  onChange={e => setCat(e.target.value)}

                />
                <TextField
                  id="outlined-helperText"
                  label="Supplier"
                  defaultValue={sup}
                  onChange={e => setSup(e.target.value)}

                />
                <TextField
                  
                  id="outlined-helperText"
                  label="Cat Affigen"
                  defaultValue={catAffigen}
                  onChange={e => setCatAffigen(e.target.value)}

                />
                <TextField
                  id="outlined-helperText"
                  label="Cat Original"
                  defaultValue={catOriginal}
                  onChange={e => setCatOriginal(e.target.value)}

                />
                <TextField
                  id="outlined-helperText"
                  label="Size"
                  defaultValue={size}
                  onChange={e => setSize(e.target.value)}

                />
                <TextField
                  id="outlined-helperText"
                  label="Buy Price"
                  defaultValue={buyPrice}
                  onChange={e => setBuyPrice(e.target.value)}

                />
                <TextField
                  id="outlined-helperText"
                  label="Sell Price"
                  defaultValue={sellPrice}
                  onChange={e => setSellPrice(e.target.value)}
                  
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
        <h1>Products</h1>
        <button style={{fontFamily: 'Montserrat', fontWeight: 'bold', backgroundColor: '#800080', color: 'white'}} onClick={handleOpen}>Add New Affigen</button>
        
      </div>

     
     
   

      {isLoading ? (
        "Loading..."
      ) : (
      
        <DataTable slug="products" columns={columns} rows={products}  />
      )}
    
    </div>
  );
};

export default Affigen;
