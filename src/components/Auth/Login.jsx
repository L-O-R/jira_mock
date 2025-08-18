import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import React from "react";
// Login Form Schema
const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ switchToSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const Navigate = useNavigate();
  let UserData =
    JSON.parse(localStorage.getItem("userData")) || [];
  const onSubmit = (data) => {
    if (UserData.length > 0) {
      UserData.forEach((user) => {
        // simple check if username and password is correct or not, improve it later
        const users = UserData.find(
          (u) =>
            u.username === data.username &&
            u.password === data.password
        );
        console.log(users);
        if (users) {
          alert("Login Successful");
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem(
            "user",
            JSON.stringify(users)
          );
          Navigate("/Dashboard", { replace: true });
        } else {
          alert("Invalid credentials");
        }
      });
    } else {
      alert("user not available");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <h2 className="text-3xl font-light mb-8 text-primary">
        Login
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block text-text mb-2">
            Username
          </label>
          <input
            {...register("username")}
            className="w-full bg-transparent text-text border-b border-border py-2 px-0 focus:outline-none focus:border-primary"
          />
          {errors.username && (
            <p className="text-warning text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-text mb-2">
            Password
          </label>
          <input
            type="password"
            autoComplete="password"
            {...register("password")}
            className="w-full text-text bg-transparent border-b border-border  py-2 px-0 focus:outline-none focus:border-primary"
          />
          {errors.password && (
            <p className="text-warning text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={switchToSignup}
            className="px-4 py-2 text-primary bg-transparent hover:bg-surface transition-colors">
            Sign Up
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-background rounded shadow-md hover:bg-secondary transition-colors hover:shadow-lg">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
