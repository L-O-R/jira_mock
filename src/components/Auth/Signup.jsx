import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// Signup Form Schema
const signupSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Passwords must match"
    )
    .required(),
});

const SignupForm = ({ switchToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  let getUserData =
    JSON.parse(localStorage.getItem("userData")) || [];

  const onSubmit = (data) => {
    const uniquieId = new Date();
    const userDetails = {
      ...data,
      id: uniquieId.getTime(),
    };
    console.log("Signup Data:", userDetails);
    console.log(getUserData);
    //added feature to check if user exist or not
    if (
      getUserData.some(
        (u) =>
          u.username === data.username ||
          u.email === data.email
      )
    ) {
      alert("User already exists");
      return;
    }

    getUserData.push(userDetails);
    //storing the data after check
    localStorage.setItem(
      "userData",
      JSON.stringify(getUserData)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <h2 className="text-3xl font-light mb-8 text-primary">
        Sign Up
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs">
        <div className="mb-4">
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full bg-transparent border-b text-text border-border py-2 px-0 focus:outline-none focus:border-primary   placeholder:text-text/70"
          />
          {errors.username && (
            <p className="text-warning text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full bg-transparent text-text border-b border-border py-2 px-0 focus:outline-none focus:border-primary placeholder:text-text/70"
          />
          {errors.email && (
            <p className="text-warning text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            autoComplete="New-Password"
            {...register("password")}
            placeholder="Password"
            className="w-full bg-transparent text-text border-b border-border py-2 px-0 focus:outline-none focus:border-primary   placeholder:text-text/70"
          />
          {errors.password && (
            <p className="text-warning text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            autoComplete="Confirm-Password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full text-text bg-transparent border-b border-border py-2 px-0 focus:outline-none focus:border-primary   placeholder:text-text/70"
          />
          {errors.confirmPassword && (
            <p className="text-warning text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={switchToLogin}
            className="px-4 py-2 text-primary bg-transparent hover:bg-surface/20 transition-colors">
            Login
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary   rounded shadow-md hover:bg-secondary transition-colors hover:shadow-lg">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
