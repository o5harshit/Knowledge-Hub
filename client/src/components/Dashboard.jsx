import { useSelector } from "react-redux";
import Home from "./Home";
import AdminHome from "./AdminHome";

export default function Dashboard() {
  const role = useSelector((state) => state.auth?.user?.role);

  return role === "admin" ? <AdminHome /> : <Home />;
}
