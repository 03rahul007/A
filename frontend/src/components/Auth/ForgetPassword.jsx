import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopLoadingBar from "../TopLoadingBar";
import LoadingBar from 'react-top-loading-bar'


export default function ForgetPassword() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [progress, setProgress] = React.useState(0)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(progress + 10)
    let valid = true;

    if (!email) {
      toast.info('🦄 Email is required!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      valid = false;
    }
    if (!password) {
      toast.info('🦄 Password is required!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      valid = false;
    }
    if (valid) {
    try {
      const response = await fetch(`${import.meta.env.VITE_PORT}/updatepassword`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,password }),
      });
      setProgress(progress + 50)

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (!response.ok) {
          setProgress(progress + 80)
          console.log(result.message);
          // r@r.com
          toast.warn(result.message);
        } else {
          toast.success("Password update successfully.");
          setProgress(progress + 80)
          setEmail("");
          setPassword("");
          setTimeout(async() => {
            setProgress(progress + 100)
            navigate("/login"); // Uncomment to redirect to login page
          }, 4000);
          setTimeout(async() => {
            setProgress(progress + 100)
            navigate("/login"); // Uncomment to redirect to login page
          }, 4000);
        }
      } else {
        toast.warn("Response was not in JSON format");
      }
    } catch (error) {
      toast.warn(error.message);
    }
  };
}

  return (
    <main className="flex items-center justify-center h-screen w-full text-white relative bg-gradient-to-br from-gray-800 to-black">
      <style>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animated-gradient-border {
          background-size: 400% 400%;
          animation: gradientAnimation 8s ease infinite;
          padding: 60px;
          border-radius: 12px;
          max-width: 90%;
          margin: auto;
        }

        .animated-gradient-border > .content {
          background-color: #1f1f1f;
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
        }

        .floating-3d-image {
          position: absolute;
          animation: floatAnimation 6s ease-in-out infinite;
        }

        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .animated-gradient-border {
            padding: 30px;
          }

          .animated-gradient-border > .content {
            padding: 2rem;
          }

          .floating-3d-image {
            width: 100px;
          }
        }

        @media (max-width: 480px) {
          .animated-gradient-border {
            padding: 20px;
          }

          .animated-gradient-border > .content {
            padding: 1rem;
          }

          .floating-3d-image {
            width: 80px;
          }
        }
      `}</style>

      {/* Left Section with Form */}
      <section className="animated-gradient-border z-10">
      <div>
            {/* Apply gradient color through a wrapper div */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '4px', // Adjust as necessary
                    width: `${progress}%`,
                    background: 'linear-gradient(to right, #00bcd4, #3f51b5)', // Gradient colors
                    zIndex: 1000,
                    transition: 'width 0.2s ease-in-out'
                }}
            />
            <LoadingBar
                color="transparent" // Set to transparent as we are handling colors with CSS
                progress={progress}
                onLoaderFinished={() => setProgress(100)}
            />
        </div>
        <div className="content">
          <blockquote className="text-2xl font-semibold italic text-center text-slate-400 mb-8">
          Hey,
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-violet-500 relative inline-block">
              <span className="relative text-white">Something Forgot</span>
            </span>{" "}
            to continue your journey.
            <br />
            <span className="text-2xl font-semibold italic text-center text-slate-400 mb-8">Let's update</span>
          </blockquote>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <TextField
            type="email"
              id="email"
              // value={"sdsadasdd"}
              // disabled
              label="Email"
              variant="filled"
              sx={{
                backgroundColor: "#302e2e",
                borderRadius: "8px",
                input: { color: "white" },
                label: { color: "white" },
              }}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              variant="filled"
              sx={{
                backgroundColor: "#302e2e",
                borderRadius: "8px",
                input: { color: "white" },
                label: { color: "white" },
              }}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <div className="flex justify-between">
              <small>
                <Link to="/signup" className="text-blue-300">
                  Create an Account
                </Link>
              </small>
              <small>
                <Link to="/login" className="text-blue-300">
                Login into your Account
                </Link>
              </small>
            </div>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              color="secondary"
              fullWidth
              sx={{ fontWeight: "bold", fontSize: "1.1rem", padding: "12px 0" }}
              type="submit"
            >
              Update Password
            </Button>
          </form>
        </div>
      </section>

      {/* 3D Floating Images */}
      <section className="absolute bottom-10 right-10 z-20 floating-3d-image">
        {/* <img src={"./assets/3d-icon-1.png"} alt="3D Icon 1" width={"150px"} /> */}
        <div className="text-xl text-zinc-700 font-serif">{"</rahul>"}</div>
      </section>

      <section className="absolute top-10 left-10 z-20 floating-3d-image">
        {/* <img src={"./assets/3d-icon-2.png"} alt="3D Icon 2" width={"180px"} /> */}
        <div className="text-xl text-zinc-700 font-serif">{"<rahul>"}</div>
      </section>
          
      <ToastContainer autoClose={3000}/>
    </main>
  );
}
