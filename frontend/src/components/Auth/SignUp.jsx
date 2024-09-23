import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false); // Initialize with false

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!Fname) {
      toast.info("🦄 First name is required!", { autoClose: 2000 });
      valid = false;
    }
    if (!Lname) {
      toast.info("🦄 Last name is required!", { autoClose: 2000 });
      valid = false;
    }
    if (!username) {
      toast.info("🦄 Username is required!", { autoClose: 2000 });
      valid = false;
    }
    if (!email) {
      toast.info("🦄 Email is required!", { autoClose: 2000 });
      valid = false;
    }
    if (!password) {
      toast.info("🦄 Password is required!", { autoClose: 2000 });
      valid = false;
    }
    if (!accept) {
      toast.info("🦄 Regulation must be accepted!", { autoClose: 2000 });
      valid = false;
    }

    if (valid) {
      try {
        const response = await fetch(`${import.meta.env.VITE_PORT}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          if (!response.ok) {
            toast.warn(result.message);
          } else {
            toast.success("User created successfully. You can login now.");
            setFname("");
            setLname("");
            setUsername("");
            setEmail("");
            setPassword("");
            setAccept(false); // Reset the checkbox state
            setTimeout(() => {
              navigate("/login");
            }, 4000);
          }
        } else {
          toast.warn("Response was not in JSON format");
        }
      } catch (error) {
        toast.warn(error.message);
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full text-white bg-gradient-to-br from-gray-800 to-black p-4 relative">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <section className="glassmorphism-container z-10 bg-white/10 backdrop-blur-lg rounded-lg p-6 sm:p-10 shadow-lg">
            <div className="content">
              <blockquote className="text-2xl font-semibold italic text-center text-slate-400 mb-8">
                Simplify your{" "}
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-violet-500 relative inline-block">
                  <span className="relative text-white">signup</span>
                </span>{" "}
                process for a better user experience.
              </blockquote>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  id="first-name"
                  label="First Name"
                  variant="filled"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  fullWidth
                  value={Fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                <TextField
                  type="text"
                  id="last-name"
                  label="Last Name"
                  variant="filled"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  fullWidth
                  value={Lname}
                  onChange={(e) => setLname(e.target.value)}
                />
                <TextField
                  type="text"
                  id="username"
                  label="Username"
                  variant="filled"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  variant="filled"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  variant="filled"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={accept}
                    onChange={(e) => setAccept(e.target.checked)}
                  />
                  <label htmlFor="terms-checkbox" className="ml-2 text-gray-300">
                    I accept the terms and conditions.
                  </label>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  endIcon={<SendIcon />}
                  sx={{
                    background: "linear-gradient(to right, #6366F1, #7C3AED)",
                    padding: "0.75rem 2rem",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                    borderRadius: "8px",
                  }}
                  fullWidth
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  endIcon={<SendIcon />}
                  sx={{
                    background: "linear-gradient(to right, #121212, #212121)",
                    padding: "0.75rem 2rem",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                    borderRadius: "8px",
                  }}
                  fullWidth
                >
                  <Link to="/signupViaEmail" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Sign Up Using Email
                  </Link>
                </Button>
              </form>

              <p className="text-sm mt-4 text-gray-300 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-violet-500 underline">
                  Log in here
                </Link>
              </p>
            </div>
          </section>
        </Grid>
      </Grid>

      {/* Floating image */}
      <section className="absolute bottom-10 right-10 z-20 animate-float">
        <div className="text-xl text-zinc-700 font-serif">{"</rahul>"}</div>
      </section>

      <section className="absolute top-10 left-10 z-20 animate-float">
        <Link to="/">
          <div className="text-xl text-zinc-700 font-serif">{"<rahul>"}</div>
        </Link>
      </section>

      <ToastContainer />
    </main>
  );
}
