import LoadingSpinner from "@/components/LoadingSpinner";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

function SSOCallbackPage(){
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  return (<>
  <LoadingSpinner message = "Please wait"/>
  <AuthenticateWithRedirectCallback signInForceRedirectUrl={`/auth-callback/?redirectTo=${encodeURIComponent(redirectTo)}`}/>
  </>)
}
export default SSOCallbackPage;