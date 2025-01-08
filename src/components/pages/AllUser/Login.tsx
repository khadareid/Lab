import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "@/Redex/All Tables slice/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redex/Store";
import { setUser } from "@/Redex/UserInfo";

export default function Login() {
  const toastId = "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginState = useSelector((state: RootState) => state.Allusers); // Adjust state according to your actual reducer state
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { email, password };

    toast.loading("Loading! Please wait", { id: toastId });
    dispatch(loginUser(data)); // Dispatch login action
  };

  useEffect(() => {
    if (loginState.isSuccess && loginState.userInfo) {
      const { name, email,  role } = loginState.userInfo;
      dispatch(setUser({ name, email,  role }));
      toast.success("Login Successful", { id: toastId });
      navigate("/dashboard/Overview"); 
    }

    if (loginState.isError && loginState.errorMsg) {
      toast.error(loginState.errorMsg, { id: toastId });
    }
  }, [loginState, dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/dashboard/Overview"); 
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-indigo-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-white" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-green-200">
            Sign in to access your account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
