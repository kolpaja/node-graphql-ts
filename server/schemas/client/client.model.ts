import { Schema, model } from 'mongoose';
import IClient from '../../resources/client/client.interface';

const ClientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<IClient>('Client', ClientSchema);
