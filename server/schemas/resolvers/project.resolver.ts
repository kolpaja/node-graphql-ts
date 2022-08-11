import { Project } from '../models';

export async function getProjects(parent: any, args: any) {
    return await Project.find();
}
export async function getProject(parent: any, args: any) {
    return await Project.findById(args.id);
}
