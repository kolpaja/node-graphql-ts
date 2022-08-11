import { Client } from '../models';

export async function getClients(parent: any, args: any) {
    return await Client.find();
}
export async function getClient(parent: any, args: any) {
    return await Client.findById(args.id);
}
