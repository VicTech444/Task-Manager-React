import { ChangeEventHandler, MouseEventHandler, useState, ChangeEvent, useEffect } from 'react'
import '../styles/TaskManager.css'
import { Button } from './Button'
import { Task } from './Task'
import { errorMessage, jsonTask } from '../interfaces/interfaces'
import { showRedText } from '../functions/showRedText'
import { createNewTask } from '../functions/createNewTask'
import { OptionTask } from './OptionTask'

const placeholderMessages = {
    filter: `Search the task by it's name`,
    newTask: `New task name`
}

const firstClickTime = {
    filter: false,
    newTask: true
}

export const TaskManager = () => {
    let storage = localStorage;

    let [currentHolder, setPlaceholder] = useState(placeholderMessages.filter);
    let [taskName, setTaskName] = useState('');
    let [taskTitle, setTaskTitle] = useState('')
    let [validTaskName, setValidTaskName] = useState(false);
    let [firstClick, setFirstClick] = useState(firstClickTime);
    let [recentlyOpen, setRecentlyOpen] = useState(true)
    let [createTaskOptions, setCreateTask] = useState(false);
    let [showTaskInfo, setShowTaskInfo] = useState(false);

    let [taskDesc, setTaskDesc] = useState('')
    let [taskDescID, setTaskDescID] = useState("undefined")
    let [taskList, setTaskList] = useState<string[]>([]);
    let [taskListNames, setTaskListNames] = useState<string[]>([])
    let [amountOfTaks, setAmountOfTasks] = useState(storage.length);

    let [filtering, setFiltering] = useState(true)
    let [searchFilter, setSearchFilter] = useState('');
    let [effectChanger, setEffectChanger] = useState(false)
    let [isModifying, setIsModifying] = useState(false);

    let states = {
        setPlaceholder: setPlaceholder,
        setTaskName: setTaskName,
        setTaskDesc: setTaskDesc,
        setValidTaskName: setValidTaskName,
        setFirstClick: setFirstClick,
        setRecentlyOpen: setRecentlyOpen,
        setCreateTask: setCreateTask,
        setShowTaskInfo: setShowTaskInfo,
        setEffectChanger: setEffectChanger,
        setIsModifying: setIsModifying,
        setTaskDescID: setTaskDescID
    }

    let statesValues = {
        currentHolder: currentHolder,
        taskName: taskName,
        taskDesc: taskDesc,
        validTaskName: validTaskName,
        firstClick: firstClick,
        recentlyOpen: recentlyOpen,
        createTaskOptions: createTaskOptions,
        showTaskInfo: showTaskInfo,
        taskDescID: taskDescID,
        effectChanger: effectChanger,
        isModifying: isModifying
    }

    const placeholderFilter: MouseEventHandler<HTMLButtonElement> = (option) => {
        changePlaceholderMsg(option);
        setFiltering(true);
        setCreateTask(false);
        setShowTaskInfo(false);

        let { filter, newTask } = firstClick;
        errorMessage({
            filterValue: filter,
            newTaskValue: newTask,
            code: 1
        })
    }

    const placeholderAddTask: MouseEventHandler<HTMLButtonElement> = (option) => {
        changePlaceholderMsg(option);
        
        setFiltering(false);
        setSearchFilter("");

        let { filter, newTask } = firstClick;

        errorMessage({
            filterValue: filter,
            newTaskValue: newTask,
            code: 2
        })
    }
    const changePlaceholderMsg: MouseEventHandler<HTMLButtonElement> = (option) => {
        let target = (option.target as HTMLButtonElement);

        switch (target.name) {
            case 'add-task':
                setPlaceholder(placeholderMessages.newTask);
                break;
            case 'filter':
                setPlaceholder(placeholderMessages.filter);
                break;
        }
    }

    const errorMessage = ({ filterValue, newTaskValue, code }: errorMessage) => {

        setValidTaskName(false);

        let props = {
            whoRecentlyOpen: false,
            taskName: taskName,
            ...states
        }

        if (code === 1) {
            if (filterValue) {
                let newFirstClick = {
                    filter: false,
                    newTask: true
                }
                setTaskName("")
                setFirstClick(newFirstClick)
                return
            }

            showRedText(props);

        } else if (code === 2) {
            if (newTaskValue) {
                let newFirstClick = {
                    filter: true,
                    newTask: false
                }
                setTaskName("")
                setFirstClick(newFirstClick)
                return
            }

            if (showRedText(props)) {
                createNewTask({ states })
                return
            }
        }
    }



    const inputChanges: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        let target = event.target.value;
        setTaskName(target);

        if (!target) {
            setShowTaskInfo(false);
            setCreateTask(false)
        }
    }

    const saveTaskDesc: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        let description = event.target.value;
        setTaskDesc(description);
    }

    useEffect(() => {
        let arrFromStorage = Object.values(storage);
        let newTaskListNames = taskListNames.slice();
        setTaskList(arrFromStorage);

        arrFromStorage.forEach(element => {

            let json: jsonTask = JSON.parse(element);

            newTaskListNames.push(json.name);
            setTaskListNames(newTaskListNames)

        })

    }, [amountOfTaks, effectChanger])

    let taskNameDisabled = taskName && showTaskInfo && createTaskOptions ? true : false;


    const showTask: MouseEventHandler<HTMLDivElement> = (ev) => {
        let target = (ev.target as HTMLElement);

        let id = target.id;
        
        if (id !== taskDescID) {
            let taskWithInfo = storage.getItem(id);
            if (taskWithInfo) {

                let taskJSON: jsonTask = JSON.parse(taskWithInfo);


                setShowTaskInfo(true);
                setCreateTask(false);
                setTaskName("");
                setTaskTitle(taskJSON.name)
                setTaskDesc(taskJSON.taskDesc);
                setTaskDescID(id)
            }

        } else {

            setShowTaskInfo(false);
            setTaskDescID("undefined")
        }
    }


    const handleFilter: ChangeEventHandler<HTMLInputElement> = (ev) => {
        setTaskName(ev.target.value);

        let newSearchFilter = ev.target.value;
        setSearchFilter(newSearchFilter);

    }

    let handleInput = filtering ? (ev: ChangeEvent<HTMLInputElement>) => handleFilter(ev) : (ev: ChangeEvent<HTMLInputElement>) => inputChanges(ev);

    let filter = !searchFilter
        ? taskList
        : taskList.filter(element => {
            let json: jsonTask = JSON.parse(element);
            let nameLowerCase = json.name.toLocaleLowerCase();
            let filterLowerCase = searchFilter.toLocaleLowerCase();

            if (nameLowerCase.includes(filterLowerCase)){
                return element
            }

        })
        
    return (
        <>
            <div className="taskManager">
                <div className="options">
                    <Button
                        option='filter'
                        text='Search task'
                        buttonEvent={(ev) => placeholderFilter(ev)} />

                    <Button
                        option='add-task'
                        text='Add new task'
                        buttonEvent={(ev) => placeholderAddTask(ev)} />
                </div>
                <input type='text'
                    required
                    role='textbox'
                    className={`input-manager ${validTaskName && !recentlyOpen && 'error-filter'}`}
                    placeholder={currentHolder}
                    disabled={taskNameDisabled}
                    onChange={handleInput}
                    value={taskName}

                />
                <div className={`task-list `}>
                    {filter.map((element, index) => {
                        if (element) {
                            let item = JSON.parse(element);

                            return (
                                <div
                                    className={`task ${item.completed ? 'completed' : ""}`}
                                    id={item.id}
                                    key={item.id}
                                    onClick={(ev) => showTask(ev)}>
                                    {item.name}

                                    <OptionTask setAmountTasks={setAmountOfTasks}
                                        id={item.id}
                                        statesValues={statesValues}
                                        states={states}/>
                                </div>
                            )
                        } else if (filter.every(element => element === undefined)) {
                            if (index === filter.length - 1) {
                                return (
                                    <>
                                        <label key={index}>No matches found</label>
                                    </>
                                )
                            }
                        }
                    })}
                </div>
            </div>
            {
                showTaskInfo &&
                <Task
                    title={taskName}
                    taskTitle={taskTitle}
                    description={taskDesc}
                    create={createTaskOptions}
                    setName={(ev: ChangeEvent<HTMLTextAreaElement>) => inputChanges(ev)}
                    setTaskDesc={(ev: ChangeEvent<HTMLTextAreaElement>) => saveTaskDesc(ev)}
                    states={states}
                    statesValues={statesValues}
                    setAmountTask={setAmountOfTasks}
                    amountTask={amountOfTaks} />
            }
        </>
    )
}