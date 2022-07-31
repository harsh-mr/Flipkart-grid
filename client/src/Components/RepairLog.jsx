import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { getRepairLog } from "../service/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  Modal,
  Grid,
  styled,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledButton = styled(Button)`
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

export default function BasicTable() {
  var [Date, setDate] = useState([]);
  var [Discription, setDiscription] = useState([]);
  const { tokenID } = useParams();
  console.log(tokenID);
  const getTable = async () => {
    try {
      await getRepairLog(tokenID).then((da) => {
        console.log(da.body);
        setDate(da.repair_date);
        setDiscription(da.repair_reason);
        console.log(Date);
        console.log(Discription);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTable();
  }, []);

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(true);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Problem Report</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Date &&
                    Date.map((val, index) => {
                      var comp = Discription[index];
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {val}
                          </TableCell>
                          <TableCell align="right">{comp}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <StyledButton style={{ marginTop: "30px", marginLeft: "280px" }}>
              <Link
                to="/myorders"
                style={{ textDecoration: "none", color: "white" }}
              >
                Go Back
              </Link>
            </StyledButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
