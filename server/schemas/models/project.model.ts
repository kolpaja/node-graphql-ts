import IProject from '@/resources/interfaces/project.interface';
import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Not started', 'In Progress', 'Completed'],
        },
        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
        },
    },
    { timestamps: true }
);

export default model<IProject>('Project', ProjectSchema);
