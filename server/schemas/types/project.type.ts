import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { Client } from '../models';
import { ClientType } from './client.type';

// Project Type
export const ProjectType = new GraphQLObjectType({
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
