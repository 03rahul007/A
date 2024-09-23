import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MessageModal() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendApi = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://a-iadm.onrender.com/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message);
        } else {
          toast.success("Message sent successfully!");
          setName("");
          setMessage("");
          handleClose();
        }
      } else {
        toast.warn("Response was not in JSON format");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div onClick={handleOpen} className="text-sm cursor-pointer">
        Send Message
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl gap-4 flex flex-col">
            <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
              Want to say something...
            </h3>

            <form onSubmit={sendApi}>
              <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="p-4 bg-transparent border border-zinc-800 w-full outline-none"
                    placeholder="Your Name..."
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <textarea
                    name="message"
                    value={message}
                    className="p-4 bg-transparent border outline-none border-zinc-800 w-full"
                    rows={5}
                    placeholder="Write Message here..."
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>

                  <button
                    className="bg-slate-800 p-4 text-white w-full"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      {/* Toastify Container for notifications */}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
