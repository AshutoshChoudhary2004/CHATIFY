import LoadingSpinner from "@/components/LoadingSpinner";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {

	const { isLoaded, user } = useUser();
	const navigate = useNavigate();
	useEffect(() => {
		const syncUser = async () => {
			if (!isLoaded || !user ) return;

			try {
				await axiosInstance.post("/auth/callback", {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					imageUrl: user.imageUrl,
				});
			} catch (error) {
				console.log("Error in auth callback", error);
			} finally {
				navigate("/");
			}
		};

		syncUser();
	}, [isLoaded, user, navigate]);

	return (
		<LoadingSpinner message="Logging you in" />
	);
};
export default AuthCallbackPage;
