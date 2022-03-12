import { PROJECT, RESOURCES, ACTIONS } from './__mocks__';
import { sendMessage } from './queue';
import { deliverProject, insertAction, insertProject, insertResource } from './repository';
import { sleep } from './utils';

const crawl = async () => {
    await sleep(5000);
    const projectId = await insertProject(PROJECT);
    await sendMessage(projectId);

    for (const resource of RESOURCES) {
        await sleep(5000);
        const resourceId = await insertResource(resource, projectId);

        for (const action of ACTIONS) {
            await sleep(5000);
            await insertAction(action, resourceId);
        }
    }

    await deliverProject(projectId);
};

crawl().catch((err) => console.error(err));