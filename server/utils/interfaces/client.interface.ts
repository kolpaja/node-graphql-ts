import { GraphQLID } from 'graphql';

interface IClient {
    id: typeof GraphQLID;
    name: string;
    email: string;
    phone: string;
}

export default IClient;
