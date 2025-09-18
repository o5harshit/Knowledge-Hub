import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // ✅ import redux hook
import { apiClient } from "@/lib/api-client";
import {
  GET_USER_DOCUMENT,
  DELETE_DOCUMENT,
  GEMINI_SUMMARY,
  GEMINI_TAGS,
  UPDATE_DOCUMENT,
  GET_ALL_DOC,
} from "@/utils/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const GetallDocuments = () =>  {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geminisumCall, setGeminiSumCall] = useState(false);
  const [geminitagscall, setGeminitagscall] = useState(false);
  const [expandedSummaries, setExpandedSummaries] = useState({});
  const [editDoc, setEditDoc] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editTags, setEditTags] = useState([]);

  const userId = useSelector((state) => state.auth.user?.id);
  const role = useSelector((state) => state.auth?.user?.role);

  console.log(userId);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await apiClient.get(GET_ALL_DOC, {
          withCredentials: true,
        });
        setDocs(res.data.message || []);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  // Open edit dialog and populate fields
  const handleEdit = (doc) => {
    setEditDoc(doc);
    setEditTitle(doc.title || "");
    setEditContent(doc.content || "");
    setEditSummary(doc.summary || "");
    setEditTags(doc.tags || []);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedDoc = {
        title: editTitle,
        content: editContent,
        summary: editSummary,
        tags: editTags,
      };
      await apiClient.patch(`${UPDATE_DOCUMENT}/${editDoc._id}`, updatedDoc, {
        withCredentials: true,
      });

      setDocs((prev) =>
        prev.map((d) => (d._id === editDoc._id ? { ...d, ...updatedDoc } : d))
      );
      setEditDoc(null);
      toast.success("Document updated successfully");
    } catch (error) {
      console.error("Failed to update document:", error);
      toast.error("Update failed");
    }
  };

  const generateSummary = async () => {
    setGeminiSumCall(true);
    try {
      const res = await apiClient.post(
        `${GEMINI_SUMMARY}`,
        { title: editTitle, content: editContent },
        { withCredentials: true }
      );
      if (res.data.success) {
        setEditSummary(res.data.message);
        toast.success("Summary Updated Successfully");
      } else {
        toast.error("Something went wrong! Try again");
      }
    } catch {
      toast.error("Summary generation failed");
    } finally {
      setGeminiSumCall(false);
    }
  };

  const generateTags = async () => {
    setGeminitagscall(true);
    try {
      const res = await apiClient.post(
        `${GEMINI_TAGS}`,
        { title: editTitle, content: editContent },
        { withCredentials: true }
      );
      if (res.data.success) {
        setEditTags(res.data.message);
        toast.success("Tags Updated Successfully");
      } else {
        toast.error("Something went wrong! Try again");
      }
    } catch {
      toast.error("Tags generation failed");
    } finally {
      setGeminitagscall(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.patch(
        `${DELETE_DOCUMENT}/${id}`,
        {},
        { withCredentials: true }
      );
      setDocs((prev) => prev.filter((doc) => doc._id !== id));
      toast.success("Document deleted");
    } catch (error) {
      console.error("Failed to delete doc:", error);
      toast.error("Delete failed");
    }
  };

  const toggleSummary = (id) => {
    setExpandedSummaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading)
    return (
      <p className="text-center py-6 text-gray-600">Loading documents...</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8 w-full">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => {
          const expanded = expandedSummaries[doc._id];
          const preview = doc.summary?.slice(0, 150);
          const showReadMore = doc.summary && doc.summary.length > 150;

          return (
            <Card
              key={doc._id}
              className="bg-white shadow-md hover:shadow-xl transition-all rounded-2xl"
            >
              <CardHeader>
                <CardTitle className="text-indigo-700">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-gray-800 mb-2">Content:</h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{doc.content}</p>

                <h3 className="font-semibold text-gray-800 mb-2">Summary:</h3>
                <p className="text-gray-700 mb-2 whitespace-pre-line">
                  {expanded ? doc.summary : preview}
                </p>
                {showReadMore && (
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => toggleSummary(doc._id)}
                  >
                    {expanded ? "Read Less" : "Read More"}
                  </button>
                )}

                <h3 className="font-semibold text-gray-800 mt-4 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {doc.tags?.map((tag, i) => (
                    <Badge key={i} className="bg-indigo-100 text-indigo-700">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {(doc.createdBy === userId || role === "admin") && (
                  <div className="flex gap-3">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                      onClick={() => handleEdit(doc)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => handleDelete(doc._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      {editDoc && (
        <Dialog open={!!editDoc} onOpenChange={() => setEditDoc(null)}>
          <DialogContent className="bg-white rounded-xl p-6 max-w-xl overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4 flex-wrap">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Content"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Summary
                </label>
                <Textarea
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  placeholder="Summary"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {editTags.map((tag, i) => (
                    <Badge key={i} className="bg-indigo-100 text-indigo-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 flex flex-col gap-4 w-full">
              <div className="flex gap-3 w-full">
                <Button
                  onClick={generateSummary}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex-1 cursor-pointer"
                >
                  {geminisumCall ? "Loading..." : "Summarize"}
                </Button>
                <Button
                  onClick={generateTags}
                  className="bg-pink-600 hover:bg-pink-700 text-white flex-1 cursor-pointer"
                >
                  {geminitagscall ? "Loading..." : "Generate Tags"}
                </Button>
              </div>

              <div className="flex gap-3 w-full">
                <Button
                  onClick={handleSaveEdit}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1 cursor-pointer"
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default GetallDocuments;