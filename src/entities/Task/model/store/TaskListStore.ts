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
            selected: true,
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

    tempTask: TaskProps | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    SetActiveTask(task: TaskProps): void {
        this.activeTask = task;
        this.activeTaskId = this.activeTask.id;
    }

    private FindTaskDimension(id: string): TaskProps[] {
        let currentArray: TaskProps[] = this.TaskListData;
        const indices: number[] = id.split('.').map((item) => +item);
        for (let i = 0; i < indices.length - 1; i += 1) {
            const index = indices[i] - 1;
            currentArray = currentArray[index].children;
        }
        return currentArray;
    }

    DeleteActiveTask(): void {
        const id = this.activeTaskId;
        const deleteFrom = this.FindTaskDimension(this.activeTaskId);

        deleteFrom.forEach((item, index) => {
            if (item.id === id) {
                deleteFrom.splice(index, 1);
            }
        });

        this.UpdateIds(this.TaskListData);
        this.activeTask = null;
    }

    private UpdateIds(tasks: TaskProps[], parentID = '') {
        tasks.forEach((task, index) => {
            task.id = parentID ? `${parentID}.${index + 1}` : `${index + 1}`;
            if (task.children.length > 0) {
                this.UpdateIds(task.children, task.id);
            }
        });
    }

    private GenerateTaskId(): string {
        const tempArray = this.FindTaskDimension(this.activeTaskId);
        const currentTaskId = +this.activeTaskId[this.activeTaskId.length - 1];

        const currentTaskChildren = tempArray[currentTaskId - 1].children;
        const nextTaskId = `${this.activeTaskId}.${currentTaskChildren.length + 1}`;
        return nextTaskId;
    }

    AddNewTask(): void {
        if (this.tempTask) {
            const pushTo = this.findTaskChild(this.activeTaskId);

            this.tempTask = { ...this.tempTask, id: this.GenerateTaskId() };
            pushTo.push(this.tempTask);
        }

        // todo попытаться вынести функции
        this.UpdateSelectedStatus(this.GenerateTaskId());
    }

    private findTaskChild(id: string): TaskProps[] {
        let currentArray: TaskProps[] = this.TaskListData;
        const indices: number[] = id.split('.').map((item) => +item);
        for (let i = 0; i < indices.length; i += 1) {
            const index = indices[i] - 1;
            currentArray = currentArray[index].children;
        }
        return currentArray;
    }

    AddNewBigTask(): void {
        if (this.tempTask) {
            this.tempTask = {
                ...this.tempTask,
                id: this.GenerateBigTaskId(),
            };

            this.TaskListData.push(this.tempTask);
        }
    }

    private GenerateBigTaskId(): string {
        return `${this.TaskListData.length + 1}`;
    }

    SetTempTaskDescription(taskDescription: string): void {
        if (this.tempTask) {
            this.tempTask = {
                ...this.tempTask,
                description: taskDescription,
            };
        }
    }

    SetTempTaskName(taskName: string): void {
        if (this.tempTask) {
            this.tempTask = {
                ...this.tempTask,
                name: taskName,
            };
        }
    }

    SetTempTask(): void {
        this.tempTask = {
            name: '',
            children: [],
            id: '',
            selected: false,
            description: '',
        };
    }

    SetEditTask(): void {
        if (this.activeTask) {
            this.tempTask = { ...this.activeTask };
        }
    }
    // todo переделать генератор task id

    SaveEditTask(): void {
        const indices: number[] = this.activeTaskId
            .split('.')
            .map((item) => +item);
        let tempArray: TaskProps[] = this.TaskListData;

        for (let i = 0; i < indices.length - 1; i += 1) {
            const index = indices[i] - 1;
            tempArray = tempArray[index].children;
        }

        // tempArray[indices[indices.length - 1] - 1] = { ...this.tempTask };
        if (tempArray) {
            let parent: TaskProps = tempArray[indices[indices.length - 1] - 1];
            console.log(this.tempTask);

            parent = { ...parent, ...this.tempTask };
        }
    }

    InvertSelected(id: string): void {
        const changeHere = this.FindTaskDimension(id);
        changeHere.forEach((item, index) => {
            if (item.id === id) {
                changeHere[index].selected = !changeHere[index].selected;
                this.SetSelectedForAllChildren(id, changeHere[index].selected);
            }
        });
        if (id.length > 1) {
            this.UpdateSelectedStatus(id);
        }
    }

    SetSelectedForAllChildren(id: string, value: boolean): void {
        this.TaskListData.forEach((task) => {
            this.setSelectedRecursive(task, id, value);
        });
    }

    private setSelectedRecursive(
        task: TaskProps,
        targetId: string,
        value: boolean,
    ): void {
        if (task.id === targetId) {
            task.selected = value;
            task.children.forEach((child) => {
                this.setSelectedRecursive(child, child.id, value);
            });
        } else {
            task.children.forEach((child) => {
                this.setSelectedRecursive(child, targetId, value);
            });
        }
    }

    UpdateSelectedStatus(id: string): void {
        const whereToCheck = this.FindTaskDimension(id);
        const indices: number[] = id.split('.').map((item) => +item);
        let tempArray: TaskProps[] = this.TaskListData;

        for (let i = 0; i < indices.length - 2; i += 1) {
            const index = indices[i] - 1;
            tempArray = tempArray[index].children;
        }

        const parent = tempArray[indices[indices.length - 2] - 1];
        parent.selected = whereToCheck.every((task) => task.selected);

        if (parent.id.split('.').length !== 1) {
            this.UpdateSelectedStatus(parent.id);
        }
    }
}

export default new TaskListStore();
