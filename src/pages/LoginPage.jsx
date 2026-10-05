import { useRef } from "react";
import { Mail, Lock, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const LoginPage = ({ onClose, openSignIn }) => {
  const formRef = useRef(null);
  const { login, isLoginPending, loginWithGoogle, isGooglePending } = useAuth();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      onClose();
    } catch (error) {
      console.error("Email login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl animate-fade-up">
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-400 rounded-full top-4 right-4 hover:text-gray-900 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
        <div className="p-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mb-6 text-gray-500">
            Log in to access your favorites and downloads.
          </p>

          <form ref={formRef} onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <Mail
                size={18}
                className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <button
              type="submit"
              disabled={isLoginPending}
              className="w-full py-3 font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoginPending ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isGooglePending}
            className="flex items-center justify-center w-full gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-medium text-gray-700">Google</span>
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => {
                onClose();
                setTimeout(openSignIn, 150);
              }}
              className="font-semibold text-gray-900 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
