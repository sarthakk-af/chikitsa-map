"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus, LogIn, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

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
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterFields = z.infer<typeof registerSchema>;
type LoginFields = z.infer<typeof loginSchema>;

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFields | LoginFields>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-100 to-teal-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md bg-white/40 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-900">
              {isLogin ? "Welcome back" : "Join ChikitsaMap"}
            </CardTitle>
          </CardHeader>

          {/* Switch Buttons */}
          <div className="flex justify-center mb-4 gap-4">
            <Button
              variant={isLogin ? "secondary" : "ghost"}
              onClick={() => {
                setIsLogin(true);
                reset();
              }}
              className="rounded-full px-6"
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "secondary" : "ghost"}
              onClick={() => {
                setIsLogin(false);
                reset();
              }}
              className="rounded-full px-6"
            >
              Register
            </Button>
          </div>

          <CardContent>
            <form
              key={isLogin ? "login" : "register"}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* REGISTRATION ONLY FIELDS */}
              {!isLogin && (
                <>
                  <div>
                    <Label>Name</Label>
                    <Input placeholder="Name" {...register("name" as const)} />
                    {errors && "name" in errors && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>Age</Label>
                      <Input placeholder="Age" {...register("age" as const)} />
                    </div>
                    <div className="flex-1">
                      <Label>Gender</Label>
                      <Input placeholder="Gender" {...register("gender")} />
                    </div>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="Phone" {...register("phone")} />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input placeholder="Address" {...register("address")} />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input placeholder="City" {...register("city")} />
                  </div>
                </>
              )}

              {/* EMAIL */}
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD WITH TOGGLE */}
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  disabled={loading}
                  className="w-full rounded-full"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" /> Please
                      wait...
                    </>
                  ) : isLogin ? (
                    <>
                      <LogIn className="h-4 w-4 mr-2" /> Login
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" /> Register
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
