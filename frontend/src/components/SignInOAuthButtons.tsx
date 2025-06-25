import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/sign-in-user")}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
    >
      <img src="/google.png" alt="Google" className="size-5" />
      Continue with Google
    </Button>
  );
};
export default SignInOAuthButtons;
