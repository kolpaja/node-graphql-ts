import { Document } from 'mongoose';

interface IClient extends Document {
    name: string;
    email: string;
    phone: string;
}

export default IClient;
