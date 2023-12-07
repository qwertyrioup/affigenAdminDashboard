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
import {ProgressBarLine} from "react-progressbar-line"

import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

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
    field: "title",
    type: "string",
    headerName: "Title",
    width: 200,
  },
  {
    field: "link_to",
    type: "string",
    headerName: "Link To",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  // {
  //   field: "price",
  //   type: "string",
  //   headerName: "Price",
  //   width: 200,
  // },
];

const Posters = () => {
  const [users, setUsers] = useState([]);

  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [linkTo, setLinkTo] = useState("");
  const currentUser = useAppSelector((state) => state.user.currentUser);

  
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState("");
  
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
          setProgress(percentCompleted.toString());
        }
      });
      const url = response.data.url
      await axios.post(`${BaseUrl}/poster/create`, {
        title: title,
        link_to: linkTo,
        userId: currentUser._id,
        image: url.toString()
        
      });
      alert("New Poster created")
      handleClose();
      setFile("")
      setImage(null)
      setProgress("")
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
                try {
                  await axios.delete(
                    `${BaseUrl}/poster/delete/${params.row._id}`
                  );
                  alert("Poster Deleted !");
                  setReload(!reload);
                } catch (error) {
                  alert("Error");
                }
              }}
            >
              <img src="/delete.svg" alt="" />
            </Button>
          </div>
        </div>
      );
    },
  };


  const imageColumn: GridColDef = {
    field: "image",
    headerAlign: "center",
    align: "center",
    headerName: "Image",
    width: 200,
    renderCell: (params) => {
      return (
        <div style={{width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
          <img src={params.row.image} style={{objectFit: "cover", width: 200, height: 200}}  />

        </div>
      );
    },
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/poster/getall`);

      setUsers(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };





  useEffect(() => {
    getAllUsers();
  }, [reload]);

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
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 25,
              }}
              onSubmit={(e) => uploadPhoto(e)}
            >
              <div>
                <Typography
                  style={{ color: "black", fontFamily: "Montserrat" }}
                >
                  Add New Poster
                </Typography>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 25,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="outlined-helperText"
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  id="outlined-helperText"
                  label="Link to "
                  onChange={(e) => setLinkTo(e.target.value)}
                />
                {/* <TextField
                  id="outlined-helperText"
                  label="Price"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                /> */}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #1475cf",
                    height: 200,
                    width: 250,
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => document.querySelector(".inputField").click()}
                >
                  <input
                    style={{ width: 350, backgroundColor: "transparent" }}
                    type="file"
                    className="inputField"
                    onChange={handleChange}
                    accept="/image/*"
                    hidden
                  />
                  {image ? (
                    <img src={image} width={"100%"} height={"100%"} />
                  ) : (
                    <>
                      <MdCloudUpload color="#1475cf" size={60} />
                      <p>Browse Images to upload</p>
                    </>
                  )}
                </div>
                <div
                  style={{
                    margin: "10px 0",
                    width: 250,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#e9f0ff",
                  }}
                >
                  <div>
                    <AiFillFileImage color="#1475cf" />
                  </div>
                  <div>{file.name}</div>
                  <div>
                    <MdDelete
                      onClick={() => {
                        setImage(null);
                        setFile("");
                      }}
                    />
                  </div>
                </div>
                <div style={{width: 250}} >
                  <ProgressBarLine
                
          value={progress}
          min={0}
          max={100}
          strokeWidth={5}
          trailWidth={5}
          styles={{
            path: {
              stroke: "#17b978",
            },
            
            trail: {
              stroke: "#ffffff",
            },
            text: {
              fill: "#000000",
              textAlign: "center",
              fontSize: "12px",
            },
          }}
        /></div>
              </div>
              <div>
                <button
                  type="submit"
                  style={{
                    width: 100,
                    height: 35,
                    cursor: "pointer",
                    borderRadius: 25,
                    border: "none",
                    backgroundColor: "rgb(128, 0, 128)",
                    color: "white",
                    fontFamily: "Montserrat",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>

      <div className="info">
        <h1>Posters</h1>
        <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            backgroundColor: "#800080",
            color: "white",
          }}
          onClick={handleOpen}
        >
          Add New Poster
        </button>
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
          columns={[imageColumn, ...columns, actionColumn]}
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

export default Posters;
