import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const RequireAuthentication = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in-user");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return <LoadingSpinner message="Please Wait..." />;
  }

  if (!isSignedIn) {
    return <LoadingSpinner message="Redirecting to Sign-In..." />;
  }

  return <>{children}</>;
};

export default RequireAuthentication;
