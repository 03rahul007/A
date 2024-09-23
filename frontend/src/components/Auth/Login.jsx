<div className="content flex flex-col gap-6 p-6 md:p-10 rounded-lg shadow-lg bg-gray-800">
  <blockquote className="text-2xl font-semibold italic text-center text-slate-400 mb-8">
    Welcome back!{" "}
    <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-violet-500 relative inline-block">
      <span className="relative text-white">Login</span>
    </span>{" "}
    to continue your journey.
  </blockquote>

  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
    <TextField
      type="email"
      id="email"
      label="Email"
      variant="filled"
      sx={{ backgroundColor: "#302e2e", borderRadius: "8px", input: { color: "white" }, label: { color: "white" } }}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      required
    />
    <TextField
      id="password"
      label="Password"
      variant="filled"
      sx={{ backgroundColor: "#302e2e", borderRadius: "8px", input: { color: "white" }, label: { color: "white" } }}
      fullWidth
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      required
    />

    <div className="flex justify-between flex-wrap">
      <small>
        <Link to="/signup" className="text-blue-300">Create an Account</Link>
      </small>
      <small>
        <Link to="/forget-password" className="text-blue-300">Forget Password</Link>
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
      Login
    </Button>
  </form>
</div>
