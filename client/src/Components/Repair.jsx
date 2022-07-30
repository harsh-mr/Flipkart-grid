import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { repairTokenID, repairDiscription } from '../service/api';

const theme = createTheme();

export default function SignUp() {
  const [formParams, updateFormParams] = useState({
    tokenID: "",
    date: "",
    discription: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const repair=async()=>{
     await repairTokenID(formParams).then(
      async(da)=>{
        await repairDiscription(formParams).then(das=>{
          window.alert("Repair History successfully updated!")
        })
       
      }
     )
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add to Repair History
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="TokenID "
                  name="TokenID"
                  autoComplete="family-name"
                  value={formParams.tokenID}
                  onChange={(e) => {
                    updateFormParams({ ...formParams, tokenID: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Time"
                  type="date"
                  label=""
                  name="Date when repaired"
                  autoComplete="Time"
                  value={formParams.date}
                  onChange={(e) => {
                    updateFormParams({ ...formParams, date: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Problem Report"
                  label="Problem Report"
                  name="Specify problem and solution"
                  autoComplete="Time"
                  value={formParams.discription}
                  onChange={(e) => {
                    updateFormParams({ ...formParams, discription: e.target.value });
                  }}
                />
              </Grid>
             
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={repair}
            >
              Add Repair
            </Button>
            
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}