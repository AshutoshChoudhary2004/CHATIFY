import { useSignIn } from "@clerk/clerk-react";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect } from "react";

const SignInPage = () => {
	const { signIn, isLoaded } = useSignIn();

	useEffect(() => {
		if (isLoaded && signIn) {
			signIn.authenticateWithRedirect({
				strategy: "oauth_google",
				redirectUrl: `/sso-callback`,
				redirectUrlComplete: `/auth-callback`,
			});
		}
	}, [isLoaded, signIn]);

	if (!isLoaded) {
		return <LoadingSpinner message="Redirecting to Google Sign-In..." />;
	}

	return null;
};

export default SignInPage;
