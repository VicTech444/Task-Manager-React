import { useState, MouseEventHandler } from "react"
import { Button } from "./Button"
import '../styles/OptionTask.css'
import { OpenTaskSVG, CloseTaskSVG } from "./SvgTaskOptions"
import { optionTask, jsonTask } from "../interfaces/interfaces"

export const OptionTask = ({ setAmountTasks, id, statesValues, states }: optionTask) => {
    let { effectChanger } = statesValues;
    let { setEffectChanger, setShowTaskInfo, setCreateTask,
        setTaskName, setTaskDesc, setIsModifying, setTaskDescID } = states;

    let [showOption, setShowOption] = useState(false);
    let [isCompleted, setIsCompleted] = useState(false);

    let svgComponent = showOption
        ? <CloseTaskSVG closeFunction={() => setShowOption(false)} />
        : <OpenTaskSVG openFunction={() => setShowOption(true)} />

    const deleteTask: MouseEventHandler<HTMLButtonElement> = (ev) => {
        let storage = localStorage;
        let target = ev.target as HTMLButtonElement;

        let id = target.offsetParent?.parentElement?.id;

        if (id) storage.removeItem(id)
        setAmountTasks(storage.length);
        setShowOption(false)
    }

    const completeTask = () => {
        let storage = localStorage;

        let item = storage.getItem(id);

        if (item) {
            let newItem: jsonTask = JSON.parse(item);

            if (newItem.completed) {
                let bol = false;
                setIsCompleted(bol);
                newItem.completed = bol;

                storage.setItem(newItem.id, JSON.stringify(newItem));

            } else {
                let bol = true;
                setIsCompleted(bol);
                newItem.completed = bol;

                storage.setItem(newItem.id, JSON.stringify(newItem));
            }

            setEffectChanger(!effectChanger);
            setShowOption(false)
        }
    }

    const modifyTask = () => {
        let storage = localStorage;

        let taskToModify = storage.getItem(id);

        if (taskToModify) {

            let task: jsonTask = JSON.parse(taskToModify);

            setTaskName(task.name);
            setTaskDesc(task.taskDesc);
            setShowTaskInfo(true);
            setCreateTask(true);
            setIsModifying(true)
            setShowOption(false);
            setTaskDescID(id)
        }
    }

    let text = isCompleted ? 'Unmark completed task' : 'Mark as complete';

    return (
        <>
            {svgComponent}

            {
                showOption &&
                <div className="option-tasks" key={id}>
                    <CloseTaskSVG closeFunction={() => setShowOption(false)} />
                    <article>
                        <section>
                            <Button text={text} buttonEvent={() => completeTask()} />
                            <Button text="Delete task" buttonEvent={(ev) => deleteTask(ev)} />
                            <Button text="Modify task" buttonEvent={() => modifyTask()} />
                        </section>
                    </article>
                </div>
            }
        </>
    )
}