"use client";

import { Container, Box, TextField, Button } from "@mui/material";

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Box 
        component="form">
            <TextField label="Email" type="email"/>
            <TextField label="Password" type="password"/>
            <Button type="submit" variant="contained">Sign In</Button>
      </Box>
    </Container>
  );
}
