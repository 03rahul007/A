import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupViaEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomOtp, setRandomOtp] = useState("");
const navigate = useNavigate();
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter a valid email.");
      return;
    }
    setIsLoading(true);

    try {
      // Generate and set the OTP
      const EmailOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setRandomOtp(EmailOtp);

      const response = await fetch("https://a-iadm.onrender.com/verifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: EmailOtp }), // Send generated OTP to the server
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (!response.ok) {
          toast.warn(result.message);
        } else {
          toast.success("OTP has been sent to your email!");
          setOtpSent(true);
        }
      } else {
        toast.warn("Response was not in JSON format");
      }
    } catch (error) {
      toast.warn(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.warn("Please enter the OTP.");
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otp === randomOtp) {
        toast.success("OTP verified successfully!");
        // Clear inputs after successful verification
        setEmail("");
        // setOtp("");
        setOtpSent(false);
        setRandomOtp("");
        navigate('/dashboard')
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    }, 2000); // Replace this with real API call
  };

  const resendOtp = () => {
    setOtpSent(false); // Reset to send a new OTP
    setOtp(""); // Clear the OTP field if needed
    sendOtp(); // Call sendOtp to generate and send a new OTP
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {otpSent ? "Enter OTP" : "Sign Up"}
        </h2>
        <form onSubmit={otpSent ? verifyOtp : sendOtp}>
          {/* Email Input */}
          {!otpSent && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                required
                name="email"
              />
            </div>
          )}

          {/* OTP Input */}
          {otpSent && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter OTP"
                maxLength="6"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        {otpSent && (
          <button
            className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg transition-all duration-300"
            onClick={resendOtp}
          >
            Resend OTP
          </button>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default SignupViaEmail;
