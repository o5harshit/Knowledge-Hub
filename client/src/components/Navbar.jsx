import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { logout } from "@/store/slices/authSlice";
import { LOGOUT_USER } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const response = await apiClient.get(LOGOUT_USER, { withCredentials: true });
      if (response.data.success) {
        dispatch(logout());
        toast.success("User has been logged out");
        navigate("/auth");
      } else {
        toast.error("Logout failed! Try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4 flex items-center justify-between shadow-lg"
    >
      {/* Logo / Brand */}
      <div
        className="text-2xl font-bold text-white cursor-pointer tracking-wide"
      >
        Knowledge Hub
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-3">
        {!user && (
          <>
            <Button
              onClick={location.pathname === "/userLogin" ? () => navigate("/adminLogin") : () => navigate("/userLogin")}
              className="bg-black hover:bg-gray-900 text-white px-4 cursor-pointer"
            >
             {location.pathname === "/userLogin" ? "Admin Login" : "User Login"}
            </Button>
          </>
        )}
        {user && (
         <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 cursor-pointer"
            >
              Logout
            </Button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
