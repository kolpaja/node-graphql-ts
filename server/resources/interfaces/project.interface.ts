import { Schema, Document } from 'mongoose';

interface IProject extends Document {
    name: string;
    description: string;
    status: 'Not started' | 'In Progress' | 'Completed';
    clientId: Schema.Types.ObjectId;
}

export default IProject;
