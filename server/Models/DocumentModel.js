import mongoose from "mongoose"


const DocumentSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true,
    },
    summary : {
        type : String,
        required : true,
    },
    tags : {
        type : [String],
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    isActive : {
        type : Boolean,
        default : true
    },
    isDeleted : {
        type : Boolean,
        default : false,
    }
},{timestamps : true})

const DocumentModel = mongoose.model("Document",DocumentSchema);

export default DocumentModel;