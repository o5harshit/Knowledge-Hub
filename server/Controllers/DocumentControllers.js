import gemini from "../Config/gemini.js";
import DocumentModel from "../Models/DocumentModel.js";
import UserModel from "../Models/UserModel.js";

export const AddDocument = async (req, res) => {
  try {
    const { userId } = req;
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(401)
        .json({ success: false, message: "please fill all the feild" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user with given id dont exist" });
    }
    let data = await gemini(title, content);
    let output = JSON.parse(data);
    const doc = new DocumentModel({
      title,
      content,
      summary: output.summary,
      tags: output.tags,
      createdBy: user._id,
    });
    await doc.save();
    return res
      .status(200)
      .json({ success: true, message: "Document Added Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const GetDocument = async (req, res) => {
  try {
    const doc = await DocumentModel.find({isActive : true,isDeleted : false});
    res.status(200).json({ success: true, message: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDocumentOfUser = async (req, res) => {
  try {
    const { userId } = req;
    const doc = await DocumentModel.find({createdBy: userId ,isActive :true,isDeleted :false });
    if (!doc)
      return res
        .status(200)
        .json({ success: true, message: "No doc craeted by the user" });
    return res.status(200).json({ success: true, message: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await DocumentModel.findById(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Document with the given ID does not exist",
      });
    }

    const { title, content, summary, tags } = req.body;

    if (title) doc.title = title;
    if (content) doc.content = content;
    if (summary) doc.summary = summary;
    if (tags) doc.tags = Array.isArray(tags) ? tags : [tags];

    await doc.save();

    res.status(200).json({ success : true, message: "Document updated successfully", doc });
  } catch (err) {
    res.status(500).json({ success : false ,message: err.message });
  }
};


export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await DocumentModel.findById(id);
    if (!doc) {
      return res.status(401).json({
        success: true,
        message: "docuemnt with the given id dont exist",
      });
    }
    doc.isActive = false;
    doc.isDeleted = true;
    doc.save();
    res.status(200).json({ success : true,message : id });
  } catch (err) {
    res.status(500).json({ success : true, message: err.message });
  }
};
