// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-br from-black via-gray-900 to-black text-white border border-gray-700 p-8 shadow-xl w-full"
    >
      <h2 className="text-3xl font-bold mb-4">User Dashboard</h2>
      <p className="text-base mb-6">
        Welcome to your <span className="font-semibold text-purple-400">Knowledge Hub</span> dashboard.  
        Here’s what you can do:
      </p>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-200 cursor-pointer">
        <li className="hover:text-purple-400 transition">📄 Create new knowledge documents</li>
        <li className="hover:text-purple-400 transition">👀 View your own and your team’s documents</li>
        <li className="hover:text-purple-400 transition">✨ Generate summaries and tags with AI</li>
        <li className="hover:text-purple-400 transition">🔍 Search using filters or AI semantic search</li>
        <li className="hover:text-purple-400 transition">🤖 Ask questions in Team Q&A and get answers</li>
      </ul>
    </motion.div>
  );
};

export default Home;
