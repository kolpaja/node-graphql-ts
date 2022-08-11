import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';
import { getClient, getClients, getProject, getProjects } from './resolvers';
import { ClientType, ProjectType } from './types';

//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve: getClients,
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve: getClient,
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: getProjects,
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve: getProject,
        },
    },
});

// Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {},
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation,
});
