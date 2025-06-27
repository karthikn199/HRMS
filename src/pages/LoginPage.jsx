import { useFormik } from "formik";
import { useState } from "react";
import {
  HiEye,
  HiEyeOff,
  HiOutlineDeviceMobile,
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { setUser } from "../redux/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true" || false
  );
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'mobile'

  // Check if user credentials are saved
  const savedEmail = localStorage.getItem("savedEmail") || "";
  const savedPassword = localStorage.getItem("savedPassword") || "";

  const validationSchema = Yup.object().shape({
    email: Yup.string().when([], {
      is: () => loginMethod === "email",
      then: (schema) =>
        schema.email("Invalid email address").required("Email is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    mobile: Yup.string().when([], {
      is: () => loginMethod === "mobile",
      then: (schema) =>
        schema
          .matches(/^[0-9]{10}$/, "Invalid mobile number")
          .required("Mobile number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: Yup.string().min(4, "Too Short!").required("Required"),
  });

  // You'll need to add loginMethod to your formik initial values

  const formik = useFormik({
    initialValues: {
      email: savedEmail,
      mobile: "",
      password: savedPassword,
      loginMethod: loginMethod,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock users based on roles
        const mockUsers = [
          {
            email: "test@gmail.com",
            mobile: "9876543210",
            password: "Test@123",
            name: "Admin User",
            role: "admin",
          },
          {
            email: "sales@jewelry.com",
            mobile: "9876543211",
            password: "Sales@123",
            name: "Sales Staff",
            role: "sales",
          },
          // Add other roles as needed
        ];

        const user = mockUsers.find((u) => {
          if (loginMethod === "email") {
            return u.email === values.email && u.password === values.password;
          } else {
            return u.mobile === values.mobile && u.password === values.password;
          }
        });

        if (user) {
          // Save credentials if remember me is checked
          if (rememberMe) {
            localStorage.setItem("savedEmail", user.email);
            localStorage.setItem("savedPassword", values.password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
            localStorage.removeItem("rememberMe");
          }

          dispatch(
            setUser({
              name: user.name,
              email: user.email,
              mobile: user.mobile,
              role: user.role,
              token: "mock-jwt-token",
            })
          );

          // Store auth token in localStorage
          localStorage.setItem("authToken", "mock-jwt-token");

          toast.success("Login successful!");

          console.log("Test=>", user.role);

          // Role-based redirection
          switch (user.role) {
            case "admin":
              navigate("/dashboard");
              break;
            case "sales":
              navigate("/pos");
              break;
            case "manager":
              navigate("/inventory");
              break;
            default:
              navigate("/dashboard");
          }
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        toast.error(error.message || "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    // Implement OTP-based password reset flow
    toast.info("OTP will be sent to your registered mobile/email");
    // navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-amber-800 font-inter">
      <div className="flex w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden bg-white/10 border border-amber-300/20 backdrop-blur-sm">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-10 text-white">
          {/* <div className="flex justify-center mb-6">
            <img
              src="/assets/jewelry-logo.png"
              alt="Jewelry Store Logo"
              className="h-16"
            />
          </div> */}
          <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300 text-transparent bg-clip-text animate-gradient-flow">
            Directorate of Minorities
          </h2>
          {/* <p className="text-sm text-amber-100 text-center mb-6">
            Premium Inventory & Sales Management System
          </p> */}

          <div className="flex justify-center mb-6 mt-4">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email");
                  formik.setFieldValue("loginMethod", "email");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  loginMethod === "email"
                    ? "bg-amber-600 text-white"
                    : "bg-white/10 text-amber-200 hover:bg-white/20"
                }`}
              >
                Admin Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("mobile");
                  formik.setFieldValue("loginMethod", "mobile");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  loginMethod === "mobile"
                    ? "bg-amber-600 text-white"
                    : "bg-white/10 text-amber-200 hover:bg-white/20"
                }`}
              >
                Staff Login
              </button>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {/* Email/Mobile Field */}
            <div className="relative mb-4">
              {loginMethod === "email" ? (
                <>
                  <HiOutlineMail className="absolute top-4 left-3 text-amber-300" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="pl-10 w-full p-2 border text-white bg-white/10 border-amber-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-200/50"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-amber-200 text-xs mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <HiOutlineDeviceMobile className="absolute top-4 left-3 text-amber-300" />
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    className="pl-10 w-full p-2 border text-white bg-white/10 border-amber-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-200/50"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                  />
                  {formik.errors.mobile && formik.touched.mobile && (
                    <p className="text-amber-200 text-xs mt-1">
                      {formik.errors.mobile}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Password */}
            <div className="relative mb-2">
              <HiOutlineLockClosed className="absolute top-4 left-3 text-amber-300" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="pl-10 w-full p-2 border text-white bg-white/10 border-amber-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-200/50 pr-10"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                className="absolute top-4 right-3 text-amber-300 hover:text-amber-200"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
              {formik.errors.password && formik.touched.password && (
                <p className="text-amber-200 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-amber-500 rounded focus:ring-amber-500 border-amber-300/30"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-amber-300 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 flex justify-center items-center ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        {/* Right Panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-amber-600/20 to-amber-800/30 flex-col justify-center items-center p-10 text-white text-center">
          <div>
            {/* <img
              src="/assets/Invoice-cuate.png"
              alt="Jewelry store illustration"
              className="w-72 mb-6 mx-auto"
            /> */}
            <h3 className="text-xl font-semibold mb-2 text-amber-100">
              Directorate of Minorities Karnataka
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
