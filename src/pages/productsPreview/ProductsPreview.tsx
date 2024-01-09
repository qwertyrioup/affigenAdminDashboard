import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import "./users.scss";
import { useState, useEffect } from "react";

import { BaseUrl } from "../requests";
import axios from "axios";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import LinearWithValueLabel from "../../components/progressBar/ProgressBar";


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
  // { field: "_id", headerName: "ID", width: 90 },
  // {
  //   field: "image",
  //   type: "string",
  //   headerName: "Image",
  //   width: 200,
  // },
  {
    field: "cat_affigen",
    type: "string",
    headerName: "Cat ",
    width: 200,
  },
  {
    field: "product_name",
    type: "string",
    headerName: "Product Name",
    width: 200,
  },
  // {
  //   field: "link_to",
  //   type: "string",
  //   headerName: "Link To",
  //   headerAlign: "center",
  //   align: "center",
  //   width: 200,
  // },
  // {
  //   field: "price",
  //   type: "string",
  //   headerName: "Price",
  //   width: 200,
  // },
];

const ProductPreview = () => {
  const [users, setUsers] = useState([]);

  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [linkTo, setLinkTo] = useState("");
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [age, setAge] = useState('');

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(`/brand/${event.target.value}`);
  };
  
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]))
  }


  const uploadPhoto = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let upload = file;
    if (!upload) {
      alert("Please add a Poster first!");
      
    } else {
      let fileUpload = new FormData();
    fileUpload.append("file", upload);

    try {
      const response = await axios.post(`${BaseUrl}/images/upload`, fileUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (uploadEvt) => {
          let percentCompleted = Math.round(
            (uploadEvt.loaded * 100) / uploadEvt.total
          );
          setProgress(percentCompleted);
        }
      });
      const url = response.data.url
      await axios.post(`${BaseUrl}/poster/create`, {
        title: title,
        link_to: age,
        userId: currentUser._id,
        image: url.toString()
        
      });
      alert("New Poster created")
      handleClose();
      setFile("")
      setImage(null)
      setProgress(0)
      setReload(!reload);
    
    } catch (error) {

      alert("Error")
    }

    }
    



   
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerAlign: "center",
    align: "center",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div
            style={{ paddingTop: 5.5, cursor: "pointer" }}
            className="delete"
          >
            <Button
              onClick={async () => {
                await deletePopular(params.row.cat_affigen)
              }}
            >
              <img src="/delete.svg" alt="" />
            </Button>
          </div>
        </div>
      );
    },
  };


//   const imageColumn: GridColDef = {
//     field: "image",
//     headerAlign: "center",
//     align: "center",
//     headerName: "Image",
//     width: 200,
//     renderCell: (params) => {
//       return (
//         <div style={{width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
//           <img src={params.row.image} style={{objectFit: "cover", width: 200, height: 200}}  />

//         </div>
//       );
//     },
//   };

//   const linkColumn: GridColDef = {
//     field: "link_to",
//     headerAlign: "center",
//     align: "center",
//     headerName: "Link To",
//     width: 200,
//     renderCell: (params) => {
//       return (
//         <div style={{width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
//           {params.row.link_to.split('/')[2]}

//         </div>
//       );
//     },
//   };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/popular/getall`);

      setUsers(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  const deletePopular = async(cat_affigen:string) => {
    try {
        const response = await axios.delete(`${BaseUrl}/popular/delete/${cat_affigen}`)
        alert('Successfully deleted !')
        setReload(!reload)
    } catch (error) {
        alert('Error:' + error.message)
    }
  }

//   const [brands, setBrands] = useState([])

//   const getAllBrands = async () => {
//     try {
//       const res = await axios.get(`${BaseUrl}/brands/getall`);

//       setBrands(res.data);
      
//     } catch (error) {
//       console.log(error);
//     }
//   };


// console.log(age)
// useEffect(()=>{
//   getAllBrands()
// }, [])

  useEffect(() => {
    getAllUsers();
  }, [reload]);

  return (
    <div className="users">
     

      <div className="info">
        <h1>Products In home</h1>
        {/* <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            backgroundColor: "#800080",
            color: "white",
          }}
          onClick={handleOpen}
        >
          Add New Poster
        </button> */}
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataGrid
          className="dataGrid"
          style={{
            backgroundColor: "#fff",
            fontFamily: "Montserrat",
            color: "black",
            fontSize: 14,
          }}
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

export default ProductPreview;
