import { PrismaClient } from "@prisma/client";

let connection: PrismaClient | undefined = undefined;

const createConnection = () => {
    return new PrismaClient();
}

const getConnection = () => {
    connection = connection ?? createConnection();
    return connection;
}

export const getProjectStatus = async (projectId: string) => {
    const client = getConnection();
    const { ready } = (await client.projects.findUnique({ where: { id: projectId } })) ?? { ready: undefined };
    return ready;
}

export const getProjectData = async (projectId: string) => {
    const client = getConnection();
    const project = await client.projects.findUnique({
        where: {
            id: projectId
        }
    });
    return project;
}

export const getProjectResources = async (projectId: string) => {
    const client = getConnection();
    const resources = await client.resources.findMany({
        where: {
            project_id: projectId
        }
    });
    return resources;
}

export const getResourceActions = async (resourceId: string) => {
    const client = getConnection();
    const actions = await client.actions.findMany({
        where: {
            resource_id: resourceId
        }
    });
    return actions;
}