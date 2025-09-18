"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GEMINI_ANS, GET_ALL_DOC, GET_USER_DOCUMENT } from "@/utils/constants";

const TeamQA = () =>  {
  const [docs, setDocs] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all docs and tags
    useEffect(() => {
      const fetchDocs = async () => {
        try {
          const res = await apiClient.get(GET_ALL_DOC, {
            withCredentials: true,
          });
          setTags([...new Set(res.data.message.flatMap(d => d.tags || []))]);
          setDocs(res.data.message || []);
        } catch (error) {
          console.error("Failed to fetch documents:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDocs();
    }, []);

  // Filter docs by selected tags
  const filteredDocs = selectedTags.length
    ? docs.filter(d => d.tags?.some(tag => selectedTags.includes(tag)))
    : docs;

  useEffect(() => {
    setSelectedDocs(filteredDocs.map(d => d._id));
  }, [selectedTags, docs]);

  const handleAsk = async () => {
    if (!filteredDocs.length) {
      setAnswer("No documents available. Please add documents first.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post(GEMINI_ANS,
        { question, docIds: selectedDocs },
        { withCredentials: true }
      );
      console.log(res);
      setAnswer(res.data.message);
    } catch (err) {
      console.error(err);
      setAnswer("Failed to generate answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Team Q&A</h1>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full border cursor-pointer ${
              selectedTags.includes(tag)
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-gray-200 text-gray-700 border-gray-200"
            }`}
            onClick={() =>
              setSelectedTags(prev =>
                prev.includes(tag)
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              )
            }
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Question Input */}
      <textarea
        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Ask a question..."
        value={question}
        onChange={e => setQuestion(e.target.value)}
        rows={3}
      />

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 cursor-pointer"
        onClick={handleAsk}
        disabled={!filteredDocs.length || !question.trim() || loading}
      >
        {loading ? "Generating Answer..." : "Ask Gemini"}
      </button>

      {/* Answer */}
      {answer && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Answer:</h3>
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      )}

      {/* Empty Docs */}
      {!docs.length && (
        <p className="text-gray-500 mt-6 text-center">
          No documents available. Please add documents to use Team Q&A.
        </p>
      )}
    </div>
  );
}

export default TeamQA;
