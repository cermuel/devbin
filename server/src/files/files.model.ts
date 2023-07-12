import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IFile {
    fileName: string;
    text: string;

}

const FileSchema = new Schema<IFile>({
    fileName: { type: String, required: true },
    text: { type: String, required: true },
    
});

mongoose.model<IFile>('File', FileSchema);