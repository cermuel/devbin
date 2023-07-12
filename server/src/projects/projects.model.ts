import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface IProject {
    projectName: string;
    files: Types.ObjectId[];
    owner: Types.ObjectId;
    collaborators?: Types.ObjectId[];

}

const ProjectSchema = new Schema<IProject>({
    projectName: { type: String, required: true },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model<IProject>('Project', ProjectSchema);