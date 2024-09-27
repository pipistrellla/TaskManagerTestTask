import { makeAutoObservable } from 'mobx';

export type TaskProps = {
    className?: string;
    id: number;
    name: string;
    children?: TaskProps[];
    TaskContent?: string;
};

class TaskListStore {
    TaskListData: TaskProps[] = [
        {
            id: 1,
            name: 'Node 1',
            children: [
                {
                    id: 2,
                    name: 'Node 1.1',
                    children: [
                        {
                            id: 3,
                            name: 'Node 1.1.1',
                        },
                        {
                            id: 4,
                            name: 'Node 1.1.2',
                        },
                    ],
                },
                {
                    id: 5,
                    name: 'Node 1.2',
                },
            ],
        },
        {
            id: 6,
            name: 'Node 2',
            children: [
                {
                    id: 7,
                    name: 'Node 2.1',
                },
            ],
        },
    ];

    activeTaskId: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setActiveTask(task: TaskProps) {
        this.activeTaskId = task.id;
        console.log(this.activeTaskId);
    }

    DeleteActiveTask() {
        for (let i = 0; i < this.TaskListData.length; i += 1) {
            if (i === this.activeTaskId) {
                this.TaskListData.splice(i, 1);
            }
        }
    }

    AddTask() {
        this.TaskListData.push({
            id: 123123,
            name: 'Node 2',
            children: [
                {
                    id: 7,
                    name: 'Node 2.1',
                },
            ],
        });
        console.log(this.TaskListData);
    }
}

export default new TaskListStore();
