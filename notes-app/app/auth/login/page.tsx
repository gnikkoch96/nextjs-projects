"use client";

import { Container, Box, TextField, Button } from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

export default function Login() {
  return (
    <Container fixed className="h-full flex justify-center items-center">
      <Box component="form" className="flex flex-col gap-2 w-1/2">
        <span className="flex flex-col items-center gap-2">
          <DescriptionRoundedIcon fontSize="large" />
          Nikko's Note App
        </span>
        <TextField label="Email" type="email" />
        <TextField label="Password" type="password" />
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
