import { actions } from "@prisma/client";
import { insertProject } from "./mongodb";
import { consumeMessages } from "./queue";
import { getProjectData, getProjectResources, getProjectStatus, getResourceActions } from "./repository";

const mirror = async (projectId: string) => {
    const ready = await getProjectStatus(projectId);
    if (ready === undefined) return;
    if (ready === false) {
        setTimeout(() => mirror(projectId), 5000);
        return;
    }

    const project = await getProjectData(projectId);
    const projectResources = await getProjectResources(projectId);
    const projectActions: actions[] = [];
    for (const resource of projectResources) {
        const resourceActions = await getResourceActions(resource.id);
        projectActions.push(...resourceActions);
    }

    const document = {
        ...project,
        resources: [
            ...projectResources.map(r => ({
                ...r,
                actions: [...projectActions.filter(a => a.resource_id === r.id)]
            }))
        ]
    };
    await insertProject(document);
}

const consume = async () => {
    await consumeMessages(mirror);
};

consume().catch((err) => console.error(err));