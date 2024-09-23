const handleSubmit = async (e) => {
  e.preventDefault();
  setProgress(10);
  let valid = true;

  if (!email) {
    toast.info('🦄 Email is required!', { position: "top-left", autoClose: 2000 });
    valid = false;
  }
  if (!password) {
    toast.info('🦄 Password is required!', { position: "top-left", autoClose: 2000 });
    valid = false;
  }

  if (valid) {
    try {
      const response = await fetch(`${import.meta.env.VITE_PORT}/updatepassword`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      setProgress(50);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (!response.ok) {
          toast.warn(result.message);
        } else {
          toast.success("Password updated successfully.");
          setEmail("");
          setPassword("");
          setProgress(100);
          setTimeout(() => navigate("/login"), 4000);
        }
      } else {
        toast.warn("Response was not in JSON format");
      }
    } catch (error) {
      toast.warn(error.message);
    }
  }
};
