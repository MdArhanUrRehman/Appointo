import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [state, setState] = useState("Sign Up");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      const { data } = await axios.post(backendUrl + "/appointo/user/signUp", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      if (data.success) {
        localStorage.setItem("token", data.message);
        setToken(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + "/appointo/user/login", {
        email: user.email,
        password: user.password,
      });

      if (data.success) {
        localStorage.setItem("token", data.message);
        setToken(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="py-5" onSubmit={onSubmitHandler}>
      <form className="min-h-[80vh] flex items-center ">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-xl/30">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p>
            Please{" "}
            {state == "Sign Up" ? (
              <span className="font-semibold text-[1rem]">Sign Up</span>
            ) : (
              <span className="font-semibold text-[1rem]">Login</span>
            )}{" "}
            to book appointment
          </p>
          {state == "Sign Up" ? (
            <div className="w-full">
              <p>Full Name</p>
              <input
                type="text"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                value={user.name}
                className="border vorder-[#DADADA] rounded w-full p-2 mt-1"
                required
              />
            </div>
          ) : null}
          <div className="w-full">
            <p>Email</p>
            <input
              type="text"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              className="border vorder-[#DADADA] rounded w-full p-2 mt-1"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="text"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              className="border vorder-[#DADADA] rounded w-full p-2 mt-1"
              required
            />
          </div>
          <button className="bg-[#284B63] text-white py-2 w-full cursor-pointer rounded-md text-base">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-[#284B63] underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-[#284B63] underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
