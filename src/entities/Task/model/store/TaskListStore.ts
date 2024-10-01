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

    setActiveTask(task: TaskProps) {
        this.activeTask = task;
        this.activeTaskId = this.activeTask.id;
        this.generateTaskId();
    }

    private findTaskDimension(id: string) {
        let currentArray: TaskProps[] = this.TaskListData;
        const indices: number[] = id.split('.').map((item) => +item);
        for (let i = 0; i < indices.length - 1; i += 1) {
            const index = indices[i] - 1;
            currentArray = currentArray[index].children;
        }
        return currentArray;
    }

    // todo почему крашиться если удалить не последний элемент
    DeleteActiveTask() {
        const id = this.activeTaskId;
        const deleteFrom = this.findTaskDimension(this.activeTaskId);

        deleteFrom.forEach((item, index) => {
            if (item.id === id) {
                deleteFrom.splice(index, 1);
            }
        });

        this.activeTask = null;
    }

    private generateTaskId() {
        const tempArray = this.findTaskDimension(this.activeTaskId);
        const currentTaskId = +this.activeTaskId[this.activeTaskId.length - 1];

        const currentTaskChildren = tempArray[currentTaskId - 1].children;
        const nextTaskId = `${this.activeTaskId}.${currentTaskChildren.length + 1}`;
        return nextTaskId;
    }

    AddNewTask() {
        if (this.tempTask) {
            const pushTo = this.findTaskChild(this.activeTaskId);

            this.tempTask = { ...this.tempTask, id: this.generateTaskId() };
            pushTo.push(this.tempTask);
        }
    }

    private findTaskChild(id: string) {
        let currentArray: TaskProps[] = this.TaskListData;
        const indices: number[] = id.split('.').map((item) => +item);
        for (let i = 0; i < indices.length; i += 1) {
            const index = indices[i] - 1;
            currentArray = currentArray[index].children;
        }
        return currentArray;
    }

    AddNewBigTask() {
        if (this.tempTask) {
            this.tempTask = {
                ...this.tempTask,
                id: this.GenerateBigTaskId(),
            };

            this.TaskListData.push(this.tempTask);
        }
    }

    private GenerateBigTaskId() {
        return `${this.TaskListData.length + 1}`;
    }

    SetTempTaskDescription(taskDescription: string) {
        if (this.tempTask) {
            this.tempTask = {
                ...this.tempTask,
                description: taskDescription,
            };
        }
    }

    SetTempTaskName(taskName: string) {
        if (this.tempTask) {
            this.tempTask = {
                ...this.tempTask,
                name: taskName,
            };
        }
    }

    setTempTask() {
        this.tempTask = {
            name: '',
            children: [],
            id: '',
            selected: false,
            description: '',
        };
    }

    SetEditTask() {
        if (this.activeTask) {
            this.tempTask = { ...this.activeTask };
        }
    }

    // todo разобраться почему не сохраняет внутри
    SaveEditTask() {
        if (this.tempTask) {
            const whereToUpdate = this.findTaskDimension(this.tempTask.id);
        }

        console.log(this.TaskListData);
    }

    InvertSelected(id: string) {
        const changeHere = this.findTaskDimension(id);
        changeHere.forEach((item, index) => {
            if (item.id === id) {
                changeHere[index].selected = !changeHere[index].selected;
                this.changeSelectedForAllTasks(changeHere[index].selected);
            }
        });
    }

    changeSelectedForAllTasks(newValue: boolean) {
        this.TaskListData = this.TaskListData.map((task) => ({
            ...task,
            selected: newValue,
            children: this.changeSelectedForAllTasksRecursive(
                task.children,
                newValue,
            ),
        }));
    }

    private changeSelectedForAllTasksRecursive(
        tasks: TaskProps[],
        newValue: boolean,
    ): TaskProps[] {
        return tasks.map((task) => ({
            ...task,
            selected: newValue,
            children: this.changeSelectedForAllTasksRecursive(
                task.children,
                newValue,
            ),
        }));
    }

    // private setLocalStorageData() {
    //     this.TaskListData = JSON.parse(
    //         localStorage.getItem(TASK_LIST_LOCALSTORAGE),
    //     );
    // }

    // private takeLocalStorageData() {
    //     localStorage.setItem(
    //         TASK_LIST_LOCALSTORAGE,
    //         JSON.stringify(this.TaskListData),
    //     );
    // }
}

export default new TaskListStore();
