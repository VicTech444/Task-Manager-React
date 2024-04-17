export interface buttonProps {
    option?: 'filter' | 'add-task' | 'save' | 'cancel' | "modify";
    text: string;
    buttonEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface firstClickTime {
    filter: boolean,
    newTask: boolean
}

export interface taskProps {
    title: string;
    taskTitle: string;
    description: string;
    create?: boolean;
    setName: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    setTaskDesc: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    states: allStates;
    statesValues: allStatesValues;
    amountTask: number;
    setAmountTask: React.Dispatch<React.SetStateAction<number>>
}

export interface errorMessage {
    filterValue: boolean;
    newTaskValue: boolean;
    code: 1 | 2
}

export interface showRedTextProps {
    whoRecentlyOpen: boolean;
    taskName: string;
}

export interface newTaskProps {
    states: allStates
}

export interface storageProps {
    statesValues: allStatesValues
    setAmountTask: React.Dispatch<React.SetStateAction<number>>
    states: allStates
}

export interface allStates {
    setPlaceholder: React.Dispatch<React.SetStateAction<string>>;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
    setValidTaskName: React.Dispatch<React.SetStateAction<boolean>>;
    setFirstButtonClick: React.Dispatch<React.SetStateAction<firstClickTime>>;
    setRecentlyOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
    setShowTaskInfo: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskDesc: React.Dispatch<React.SetStateAction<string>>;
    setTaskDescID: React.Dispatch<React.SetStateAction<string>>;
    setTaskList: React.Dispatch<React.SetStateAction<string[]>>;
    setTaskListNames: React.Dispatch<React.SetStateAction<string[]>>;
    setAmountOfTasks: React.Dispatch<React.SetStateAction<number>>;
    setFiltering: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
    setEffectChanger: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModifying: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface allStatesValues {
    currentHolder: string;
    taskName: string;
    taskTitle: string;
    validTaskName: boolean;
    firstButtonClick: string;
    recentlyOpen: boolean;
    createTaskOptions: boolean;
    showTaskInfo: boolean;
    taskDesc: string;
    taskDescID: string;
    taskList: string[];
    taskListNames: string[];
    amountOfTasks: number;
    filtering: boolean;
    searchFilter: string;
    effectChanger: boolean;
    isModifying: boolean;
}

export interface jsonTask {
    name: string;
    taskDesc: string;
    id: string;
    completed: boolean;
}

export interface optionTask {
    setAmountTasks: React.Dispatch<React.SetStateAction<number>>;
    id: string;
    statesValues: allStatesValues;
    states: allStates
}

export interface completeOption {
    isCompleted: boolean,
    divToModify: HTMLElement | null
}

