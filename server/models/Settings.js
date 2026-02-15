import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
    {
        catalogUrl: {
            type: String,
            default: "",
        },
        // You can add more global settings here later
    },
    { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
