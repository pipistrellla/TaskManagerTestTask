import { makeAutoObservable } from 'mobx';
import { TASK_LIST_LOCALSTORAGE } from 'src/shared/const/localStorage';

export interface TaskProps {
    id: string;
    name: string;
    children: TaskProps[];
    description?: string;
    selected: boolean;
}

class TaskListStore {
    TaskListData: TaskProps[] = [];

    private activeTaskId: string = '';

    activeTask: TaskProps | null = null;

    tempTask: TaskProps | null = null;

    constructor() {
        makeAutoObservable(this);

        this.LoadFromLocalStorage();
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

        this.SaveToLocalStorage();
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

    SaveEditTask(): void {
        if (this.activeTask && this.tempTask) {
            const whereToSave = this.FindTaskDimension(this.activeTaskId);
            const index = +this.activeTaskId.slice(-1) - 1;

            this.activeTask = { ...this.activeTask, ...this.tempTask };

            whereToSave[index] = { ...this.activeTask };
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

        this.SaveToLocalStorage();
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

    SaveToLocalStorage() {
        localStorage.setItem(
            TASK_LIST_LOCALSTORAGE,
            JSON.stringify(this.TaskListData),
        );
    }

    LoadFromLocalStorage() {
        const data = localStorage.getItem(TASK_LIST_LOCALSTORAGE);

        if (data) {
            this.TaskListData = JSON.parse(data);
        }
    }
}

export default new TaskListStore();
