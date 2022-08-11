import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLField,
    GraphQLString,
} from 'graphql';
import { Client, Project } from '../models';
import { ClientType } from '../types';

export async function getClients(parent: typeof ClientType, args: any) {
    return await Client.find();
}
export async function getClient(parent: typeof ClientType, args: any) {
    return await Client.findById(args.id);
}

export async function addNewClient(parent: typeof ClientType, args: any) {
    const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
    });
    return client.save();
}

//delete the client and their projects
export async function deleteClient(parent: typeof ClientType, args: any) {
    Project.find({ clientId: args.id }).then((projects) => {
        projects.forEach((project) => {
            project.remove();
        });
    });
    return await Client.findByIdAndRemove(args.id);
}

export async function updateClient(parent: typeof ClientType, args: any) {
    return Client.findByIdAndUpdate(
        args.id,
        {
            name: args.name,
            email: args.email,
            phone: args.phone,
        },
        { new: true }
    );
}
