import { makeAutoObservable } from 'mobx';

export type TaskProps = {
    className?: string;
    id: string;
    name: string;
    children: TaskProps[];
    TaskContent?: string;
};

class TaskListStore {
    TaskListData: TaskProps[] = [
        {
            id: '1',
            name: 'Node 1',
            children: [
                {
                    id: '1.1',
                    name: 'Node 1.1',
                    children: [
                        {
                            id: '1.1.1',
                            name: 'Node 1.1.1',
                            children: [],
                        },
                        {
                            id: '1.1.2',
                            name: 'Node 1.1.2',
                            children: [],
                        },
                    ],
                },
                {
                    id: '1.2',
                    name: 'Node 1.2',
                    children: [],
                },
                {
                    id: '1.3',
                    name: 'Node 1.3',
                    children: [],
                },
            ],
        },
        {
            id: '2',
            name: 'Node 2',
            children: [
                {
                    id: '2.1',
                    name: 'Node 2.1',
                    children: [],
                },
            ],
        },
    ];

    activeTaskId: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setActiveTask(task: TaskProps) {
        this.activeTaskId = task.id;
        this.generateTaskId();
    }

    private findCurrentTaskId(): number[] {
        const taskId = this.activeTaskId.split('.').map((item) => +item);
        return taskId;
    }

    private findActiveTaskDimension() {
        let currentArray: TaskProps[] = this.TaskListData;
        const indices: number[] = this.findCurrentTaskId();
        for (let i = 0; i < indices.length - 1; i += 1) {
            const index = indices[i] - 1;
            currentArray = currentArray[index].children;
        }
        return currentArray;
    }

    DeleteActiveTask() {
        const id = this.activeTaskId;
        const deleteFrom = this.findActiveTaskDimension();

        deleteFrom.forEach((item, index) => {
            if (item.id === id) {
                deleteFrom.splice(index, 1);
            }
        });
    }

    private generateTaskId() {
        const tempArray = this.findActiveTaskDimension();
        const currentTaskId = +this.activeTaskId[this.activeTaskId.length - 1];

        const currentTaskChildren = tempArray[currentTaskId - 1].children;
        const nextTaskId = `${this.activeTaskId}.${currentTaskChildren.length + 1}`;
        return nextTaskId;
    }

    AddTask() {
        console.log(this.generateTaskId());
    }

    AddNewBigTask() {
        return [this.generateTaskId()];
    }
}

export default new TaskListStore();
