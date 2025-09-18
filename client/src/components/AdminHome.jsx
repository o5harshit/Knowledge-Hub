// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AdminHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white border border-gray-700 p-8 shadow-xl w-full"
    >
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <p className="text-base mb-6">
        Welcome,{" "}
        <span className="font-semibold text-purple-400">Administrator</span>.
        Here’s what you can manage:
      </p>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-200 cursor-pointer">
        <li className="hover:text-purple-400 transition">
          📂 View update and delete {" "}
          <span className="font-semibold">all the Document</span> created by the user.
        </li>
      </ul>
    </motion.div>
  );
};

export default AdminHome;
