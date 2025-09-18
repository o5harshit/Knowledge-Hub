import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
import { ADD_DOCUMENT } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const AddDocument = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
    try {
      const response = await apiClient.post(ADD_DOCUMENT, formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Document created successfully!");
        navigate("/YourDocument");
        setLoading(false);
        setFormData({title : "",content : ""});
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to create document. Try again!");
    }
  };

  return (
    <div className="w-full bg-white shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        ✨ Create a New Document
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter document title"
            className="focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write the full content of the document..."
            rows={6}
            className="focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white transition-all duration-300 cursor-pointer"
        >
          {loading ? "loading..." : "Create Document"}
        </Button>
      </form>
    </div>
  );
};

export default AddDocument;
