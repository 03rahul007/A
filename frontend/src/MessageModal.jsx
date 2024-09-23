import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
  const [loading, setLoading] = React.useState(false); // To show a loading state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendApi = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
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
          alert(result.message); // Handle error message display (replace with Toastify if needed)
        } else {
          alert("Message sent successfully!"); // Success message
          setName("");
          setMessage("");
          handleClose(); // Close modal on successful message send
        }
      } else {
        alert("Response was not in JSON format");
      }
    } catch (error) {
      alert(`Error: ${error.message}`); // Show error message (replace with Toastify if needed)
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <div onClick={handleOpen} className="text-sm">
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
            <div className="">
              <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                Want to say something...
              </h3>
            </div>

            <form onSubmit={sendApi}>
              <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    value={name} // Controlled component
                    className="p-4 bg-transparent border border-zinc-800 w-[25rem] outline-none"
                    placeholder="Your Name..."
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <textarea
                    name="message"
                    value={message} // Controlled component
                    className="p-4 bg-transparent border outline-none border-zinc-800"
                    rows={5}
                    cols={50}
                    placeholder="Write Message here..."
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>

                  <button
                    className="bg-slate-800 p-4"
                    type="submit"
                    disabled={loading} // Disable the button when loading
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
