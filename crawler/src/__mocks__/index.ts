import { v4 as uuidv4 } from "uuid";

export const PROJECT = {
    id: uuidv4(),
    name: "My Sweet Project"
};

enum Services {
    S3 = "s3",
    CLOUDWATCH = "cloudwatch",
}

export const RESOURCES = [
    {
        id: uuidv4(),
        type: Services.S3,
        label: "My S3",
        description: undefined
    },
    {
        id: uuidv4(),
        type: Services.CLOUDWATCH,
        label: "My Cloudwatch",
        description: "Brief description"
    }
];

enum ActionType {
    WRITE = "write",
    READ = "read",
    MANAGE = "manage",
}

export const ACTIONS = [
    {
        id: uuidv4(),
        type: ActionType.WRITE,
    },
    {
        id: uuidv4(),
        type: ActionType.READ,
    },
    {
        id: uuidv4(),
        type: ActionType.MANAGE,
    }
];