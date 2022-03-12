import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS, PROJECT, RESOURCES } from "./__mocks__";

let connection: PrismaClient | undefined = undefined;

const createConnection = () => {
    return new PrismaClient();
}

const getConnection = () => {
    connection = connection ?? createConnection();
    return connection;
}

export const deliverProject = async (projectId: string) => {
    const prisma = getConnection();
    await prisma.projects.update({
        where: {
            id: projectId
        },
        data: {
            ready: true,
        }
    });
};

export const insertProject = async (project: typeof PROJECT) => {
    const prisma = getConnection();
    const { id: projectExternalId, name } = project;
    const projectId = uuidv4();
    await prisma.projects.create({
        data: {
            id: projectId,
            external_id: projectExternalId,
            name,
            ready: false,
        }
    });
    return projectId;
}

export const insertResource = async (resource: typeof RESOURCES[0], projectId: string) => {
    const prisma = getConnection();
    const { id: resourceExternalId, type, label, description } = resource;
    const resourceId = uuidv4();
    await prisma.resources.create({
        data: {
            id: resourceId,
            external_id: resourceExternalId,
            project_id: projectId,
            type,
            label,
            description,
        }
    });
    return resourceId;
}

export const insertAction = async (action: typeof ACTIONS[0], resourceId: string) => {
    const prisma = getConnection();
    const { type } = action;
    const actionId = uuidv4();
    await prisma.actions.create({
        data: {
            id: actionId,
            external_id: uuidv4(),
            resource_id: resourceId,
            type,
        }
    });
    return actionId;
}