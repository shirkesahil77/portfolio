import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../services/security-service"; // Your authentication service
import Button from "../../components/button";
import ErrorMessage from "../../components/ErrorMessage";
import { BookOpen } from "lucide-react";

const Login = () => {
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (user) => {
    try {
      const authenticationResult = await authenticateUser(user);
  
      if (authenticationResult.success) {
        sessionStorage.setItem("token", authenticationResult.token);
        sessionStorage.setItem("userId", authenticationResult.userId);
        navigate("/topics");
      } else {
        setAuthErrorMessage(authenticationResult.message || "Invalid credentials. Please try again.");
        setTimeout(() => setAuthErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again later.");
      setTimeout(() => setError(""), 5000);
    }
  };
  
  
  const handlClose = () => {
    setError('');
  }

  return (
    <>
  {error && <ErrorMessage error={error} handlclose={handlClose} />}
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      {/* Centering the icon */}
      <div className="flex justify-center mb-6">
        <BookOpen className="h-12 w-12 text-indigo-600" /> {/* Adjust size if needed */}
      </div>
      <div className="text-center mb-8">
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-gray-600">Please sign in to your account</p>
      </div>
      {authErrorMessage && <p className="text-red-600 mb-4">{authErrorMessage}</p>}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-600 text-sm">Please enter a valid email address</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.password && <p className="text-red-600 text-sm">Password must be at least 6 characters long</p>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</>

  );
};

export default Login;
