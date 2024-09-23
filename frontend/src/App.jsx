import { Box, Stack } from "@mui/material";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useApi } from "./Context/Provider";
import { useEffect, useState } from "react";
import Dashboard from "./components/Home/Dashboard";
import ForgetPassword from "./components/Auth/ForgetPassword"
import SignupViaEmail from "./components/Auth/SignOtp/SingupViaEmail";

const App = () => {
  return (
    <BrowserRouter>
      <Box height="100vh" bgcolor="#212121" overflow="hidden">
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/signupViaEmail" element={<SignupViaEmail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Stack>
      </Box>
    </BrowserRouter>
  );
};

export default App;
