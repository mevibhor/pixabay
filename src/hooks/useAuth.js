import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useFirebase } from "../context/Firebase";

export const useAuth = () => {
  const {
    logInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    userWithGoogleAccount,
    logOut,
  } = useFirebase();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) =>
      logInWithEmailAndPassword(email, password),

    onSuccess: () => {
      toast.success("Welcome back!");
    },

    onError: (error) => {
      toast.error(error.message || "Login failed.");
    },
  });

  const signupMutation = useMutation({
    mutationFn: ({ name, email, password }) =>
      signUpWithEmailAndPassword(name, email, password),

    onSuccess: () => {
      toast.success("Account created successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Signup failed.");
    },
  });

  const googleMutation = useMutation({
    mutationFn: userWithGoogleAccount,

    onSuccess: () => {
      toast.success("Logged in with Google!");
    },

    onError: (error) => {
      toast.error(error.message || "Google login failed.");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logOut,

    onSuccess: () => {
      toast.success("Logged out successfully.");
    },

    onError: (error) => {
      toast.error(error.message || "Logout failed.");
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoginPending: loginMutation.isPending,

    signup: signupMutation.mutateAsync,
    isSignupPending: signupMutation.isPending,

    loginWithGoogle: googleMutation.mutateAsync,
    isGooglePending: googleMutation.isPending,

    logout: logoutMutation.mutateAsync,
    isLogoutPending: logoutMutation.isPending,
  };
};
