import { useAuth } from "@clerk/clerk-react";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import NotAuthorizedPage from "@/pages/NotAuthorizedPage";

const RequireAuthorization = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate(`/sign-in-user`);
    }
  });
  if (!isLoaded) {
    return <LoadingSpinner message="Please Wait..." />;
  }
  if (!isSignedIn) {
    return <LoadingSpinner message="Redirecting to Sign-In..." />;
  }
  if (!isAdmin) {
    return <NotAuthorizedPage />;
  }
  return <>{children}</>;
};

export default RequireAuthorization;
