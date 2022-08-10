import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import ClientType from '@/schemas/client/client.type';
import Client from '../client/client.model';

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            },
        },
    }),
});

export default ProjectType;
