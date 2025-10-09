export interface ILeaveBalance {
    id: string;
    name: string;
    used_days: number;
    max_days: number;
}

export interface ILeave {
    id: string;
    userId: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    leaveTypeId: string;
    leaveType: {
        id: string;
        name: string;
    };
    status: string;
    createdAt: string;
    userInfo: {
        id: string;
        firstName: string;
        lastName: string;
        color:string
    };
}