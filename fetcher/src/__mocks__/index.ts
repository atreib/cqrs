import { v4 as uuidv4 } from "uuid";

export const PROJECT = {
    id: uuidv4(),
    name: "My Sweet Project"
};

enum Services {
    DELIVERY = "delivery",
    SALES = "sales",
}

export const RESOURCES = [
    {
        id: uuidv4(),
        type: Services.DELIVERY,
        label: "Food delivery",
        description: undefined
    },
    {
        id: uuidv4(),
        type: Services.SALES,
        label: "Sales",
        description: "Brief description"
    }
];

enum ActionType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
    MANAGE = "manage",
}

export const ACTIONS = [
    {
        id: uuidv4(),
        type: ActionType.DEPOSIT,
    },
    {
        id: uuidv4(),
        type: ActionType.WITHDRAW,
    },
    {
        id: uuidv4(),
        type: ActionType.MANAGE,
    }
];