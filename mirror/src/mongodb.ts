import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const projectSchema = new mongoose.Schema({
    _id: {
        type: String, default: function genUUID() {
            return uuidv4
        }
    },
}, { "strict": false });
const ProjectModel = mongoose.model('Project', projectSchema);

export const insertProject = async (document: any) => {
    await mongoose.connect(
        'mongodb://crawler:123456@localhost:27017/projects',
        { authSource: "admin" }
    );

    const { id, ...data } = document;
    const record = await ProjectModel.findById(id);

    if (!record) {
        const newRecord = new ProjectModel({
            _id: id,
            ...data
        });
        await newRecord.save();
        return;
    }

    await ProjectModel.findByIdAndUpdate(id, data, { new: true });
}