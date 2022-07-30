import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { getRepairLog } from '../service/api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



export default function BasicTable() {

    var [Date,setDate]=useState([]);
    var [Discription,setDiscription]=useState([]);
    const {tokenID}=useParams();
    console.log(tokenID)
    const getTable = async () => {
        
        try{
           await getRepairLog(tokenID).then(
            da=>{
                console.log(da.body)
             setDate(da.repair_date);
             setDiscription(da.repair_reason);
             console.log(Date);
             console.log(Discription);
            }
           )

        }
        catch(e){
            console.log(e);
        }
     }

    useEffect(()=>{
        getTable();
    },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Problem Report</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Date && Date.map((val,index) => {
            var comp=Discription[index];
            return(
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {val}
              </TableCell>
              <TableCell align="right">{comp}</TableCell>
            </TableRow>)
})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
