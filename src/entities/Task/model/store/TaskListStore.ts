import { makeAutoObservable } from 'mobx';

export interface TaskProps {
    id: string;
    name: string;
    children: TaskProps[];
    description?: string;
    selected: boolean;
}

class TaskListStore {
    TaskListData: TaskProps[] = [
        {
            id: '1',
            name: 'Node 1',
            selected: false,
            children: [
                {
                    id: '1.1',
                    name: 'Node 1.1',
                    selected: false,
                    children: [
                        {
                            id: '1.1.1',
                            name: 'Node 1.1.1',
                            children: [],
                            selected: true,
                        },
                        {
                            id: '1.1.2',
                            name: 'Node 1.1.2',
                            children: [],
                            selected: false,
                        },
                    ],
                },
                {
                    id: '1.2',
                    name: 'Node 1.2',
                    children: [],
                    selected: false,
                },
                {
                    id: '1.3',
                    name: 'Node 1.3',
                    children: [],
                    selected: false,
                },
            ],
            description: 'выполнить все задачи',
        },
        {
            id: '2',
            name: 'Node 2',
            selected: false,
            children: [
                {
                    id: '2.1',
                    name: 'Node 2.1',
                    children: [],
                    selected: true,
                },
            ],
        },
    ];

    private activeTaskId: string = '';

    activeTask: TaskProps | null = null;

    editedTask: TaskProps | null = null;

    newTask: TaskProps = {
        name: '',
        children: [],
        id: '',
        selected: false,
        description: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setActiveTask(task: TaskProps) {
        this.activeTask = task;
        this.activeTaskId = this.activeTask.id;
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

    AddNewTask() {
        console.log(this.activeTask);
    }

    AddNewBigTask() {
        console.log(this.activeTask);
    }

    SetNewTaskDescription(taskDescription: string) {
        this.newTask = {
            ...this.newTask,
            description: taskDescription,
        };
        console.log(this.newTask);
    }

    SetNewTaskName(taskName: string) {
        this.newTask = {
            ...this.newTask,
            name: taskName,
        };
        console.log(this.newTask);
    }

    EditTask(editedTask: TaskProps) {
        this.activeTask = { ...editedTask };
    }
}

export default new TaskListStore();
