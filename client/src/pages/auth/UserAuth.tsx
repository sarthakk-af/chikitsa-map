import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(2),
  age: z.string(),
  phone: z.string().min(10),
  gender: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
type RegisterFields = z.infer<typeof registerSchema>;
type LoginFields = z.infer<typeof loginSchema>;

const userAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFields | LoginFields>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const [loading , setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = isLogin
        ? await api.post("/api/users/loginUser", data)
        : await api.post("/api/users/registerUser", data);

      localStorage.setItem("token", res.data.token);
      alert(`${isLogin ? "Login" : "Registration"} successful`);
      navigate("/");
      reset();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="flex justify-around">
          <button
            className={`px-4 py-2 font-semibold${
              isLogin
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => {
              setIsLogin(true);
              reset();
            }}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              !isLogin
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => {
              setIsLogin(false);
              reset();
            }}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <>
              <input
                {...register("name")}
                placeholder="Name"
                className="input"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
              <input
                {...register("age" as const)}
                placeholder="Age"
                className="input"
              />
              <input
                {...register("phone")}
                placeholder="Phone"
                className="input"
              />
              <input
                {...register("gender")}
                placeholder="Gender"
                className="input"
              />
              <input
                {...register("address")}
                placeholder="Address"
                className="input"
              />
              <input
                {...register("city")}
                placeholder="City"
                className="input"
              />
            </>
          )}
          <input {...register("email")} placeholder="Email" className="input" />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
         disabled={loading}
         >

            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default userAuth;
