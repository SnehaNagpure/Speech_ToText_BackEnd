const mongoose = require("mongoose");
const AudioSchema = new mongoose.Schema({
    filename:String,
    transcription:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    timestamp: {
    type: Date,
    default: Date.now  // ✅ Auto-fill with current time
  }
}) ;

module.exports = mongoose.model("Audio", AudioSchema);