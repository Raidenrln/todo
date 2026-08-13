import { useState } from "react";
import todoAPI from "../service/api";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { fetchTodos } = useTodos();
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await todoAPI.post("/login", {
        username,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/todo");
      fetchTodos()
      console.log("Logged in!");
    } catch (error) {
      console.error(error);
    }
  };
  const handleRegister = async () => {
  try {
    const response = await todoAPI.post("/register", {
      id: crypto.randomUUID(),
      username,
      password,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="flex w-screen h-screen fixed inset-0 bg-black/70 justify-center items-center">
      <div className="w-[60%] h-[70%] bg-white">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label>
              Username
              <input
                className="border"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                className="border"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="flex w-full justify-between gap-2 p-2">
            <button
              type="submit"
              className="w-full px-2 py-4 bg-green-300"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full px-2 py-4 bg-blue-300"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;