import { useRef } from "react";
import { Mail, Lock, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const SignupPage = ({ onClose, openLoginModal }) => {
  const formRef = useRef(null);
  const { signup, isSignupPending, loginWithGoogle, isGooglePending } =
    useAuth();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signup({ email, password });
      onClose();
    } catch (error) {
      // Error handled by toast in useAuth
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl animate-fade-up">
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-400 transition-colors duration-200 rounded-full top-4 right-4 hover:text-gray-900 hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mb-6 text-gray-500">
            Join our community of creators and downloaders.
          </p>

          <form
            ref={formRef}
            onSubmit={handleEmailSignup}
            className="space-y-4"
          >
            {/* Email Input */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full py-3 pl-10 pr-4 transition-all duration-200 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                name="password"
                type="password"
                placeholder="Password (min 6 characters)"
                className="w-full py-3 pl-10 pr-4 transition-all duration-200 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isSignupPending}
              className="w-full py-3 font-semibold text-white transition-all duration-300 bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSignupPending ? "Creating account..." : "Sign up"}
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
            onClick={handleGoogleSignup}
            disabled={isGooglePending}
            className="flex items-center justify-center w-full gap-2 py-3 transition-all duration-300 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-medium text-gray-700">Google</span>
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => {
                onClose();
                setTimeout(openLoginModal, 150);
              }}
              className="font-semibold text-gray-900 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
