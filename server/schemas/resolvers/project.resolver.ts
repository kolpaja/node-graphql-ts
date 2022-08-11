import { Project } from '../models';

export async function getProjects(parent: any, args: any) {
    return await Project.find();
}
export async function getProject(parent: any, args: any) {
    return await Project.findById(args.id);
}

export async function addProject(parent: any, args: any) {
    const project = new Project({
        name: args.name,
        description: args.description,
        status: args.status,
        clientId: args.clientId,
    });

    return await project.save();
}

export async function deleteProject(parent: any, args: any) {
    return await Project.findByIdAndRemove(args.id);
}

export async function updateProject(parent: any, args: any) {
    return Project.findByIdAndUpdate(
        args.id,
        {
            $set: {
                name: args.name,
                description: args.description,
                status: args.status,
            },
        },
        { new: true }
    );
}
