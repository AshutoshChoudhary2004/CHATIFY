import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-emerald-900 flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800 shadow-2xl animate-fade-in">
        <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8">
          <Lock className="size-12 text-emerald-500 mb-2 animate-bounce" />
          <h2 className="text-3xl font-extrabold text-zinc-100 text-center">
            Access Denied
          </h2>
          <p className="text-zinc-400 text-center text-base max-w-xs">
            You do not have permission to view this page.
            <br />
            Please contact the administrator if you believe this is a mistake.
          </p>
          <Button
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAuthorizedPage;
