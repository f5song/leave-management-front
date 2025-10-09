export interface IItemRequest {
    id: string;
    item: {
        id: string;
        name: string;
    };
    quantity: number;
    createdAt: string;
    status: string;
    requestedBy: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

export interface IItem {
    id: string;
    name: string;
    image: string;
    description: string;
    quantity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}