import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ListingSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/landlord/dashboard");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        Listing Published Successfully!
      </h1>
      <p className="mb-6 text-slate-600 dark:text-slate-300">
        Your property listing has been published. You will be redirected to your
        dashboard shortly.
      </p>
      <Button
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={() => navigate("/landlord/dashboard")}
      >
        Go to Dashboard Now
      </Button>
    </div>
  );
};

export default ListingSuccessPage;
