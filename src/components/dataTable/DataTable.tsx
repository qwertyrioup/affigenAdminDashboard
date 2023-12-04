import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import axios from 'axios';
import { BaseUrl } from '../../pages/requests';

import {useState, useEffect} from 'react'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {

  const [page, setPage] = React.useState(1);


  const [rowsPerPage, setRowsPerPage] = React.useState(100);
const [data, setData] = useState([])
const [count, setCount] = useState(0)
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const fetchData =async () => {
    const res = await axios.get(`${BaseUrl}/odoo?page=${page}`)
    setData(res.data.results)
    setCount(res.data.count)
  }

  useEffect(() => {
    fetchData()
  

  }, [page])
  

  return (
    <>
    <TableContainer component={Paper} sx={{height: 700}}>

      <Table stickyHeader  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow>
            {/* <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14, width: 100}} >ID</TableCell> */}
            <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">CAT</TableCell>
            <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">Product Name</TableCell>
            <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">Category</TableCell>
            <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">Size</TableCell>
            <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">Buy Price</TableCell>
            <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">Sell Price</TableCell>
         
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14, width: 100}} component="th" scope="row">
                {row._id}
              </TableCell> */}
              <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">{row.cat_affigen}</TableCell>
              <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">{row.product_name}</TableCell>
              <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">{row.product_category}</TableCell>
              <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">{row.size}</TableCell>
              <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">$ {row.buy_price}</TableCell>
              <TableCell sx={{fontFamily: 'Montserrat', color: 'black', fontSize: 14}} align="left">$ {row.sell_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </TableContainer>
      <TablePagination
      component="div"
      sx={{backgroundColor: '#fff'}}
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      // onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </>
  );
}