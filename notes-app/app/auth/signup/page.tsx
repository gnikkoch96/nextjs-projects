import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { Container, Box, TextField, Button } from "@mui/material";
import Link from "next/link";

export default function Signup() {
  return (
    <Container fixed className="h-full flex justify-center items-center">
      <Box component="form" className="flex flex-col gap-2 xs:w-1/2">
        <span className="flex flex-col items-center gap-2">
          <DescriptionRoundedIcon fontSize="large" />
          Nikko's Note App
        </span>
        <TextField label="Email" type="email" />
        <TextField label="Password" type="password" />
        <TextField label="Re-Type Password" type="password" />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <span className="text-center mt-3">
          Already have an account? {" "}
          <Link
            href="/auth/login"
            className="underline pointer hover:opacity-75"
          >
           Sign in here!
          </Link>
        </span>
      </Box>
    </Container>
  );
}
