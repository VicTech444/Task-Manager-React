import { useState } from "react"
import { Button } from "./Button"
import '../styles/OptionTask.css'
import { OpenTaskSVG, CloseTaskSVG } from "./SvgTaskOptions"
import { optionTask, jsonTask } from "../interfaces/interfaces"

export const OptionTask = ({ id, statesValues, states }: optionTask) => {
    let { effectChanger } = statesValues;
    let { setEffectChanger, setShowTaskInfo, setCreateTask,
        setTaskName, setTaskDesc, setIsModifying, setTaskDescID } = states;

    let [showOption, setShowOption] = useState(false);
    let [isCompleted, setIsCompleted] = useState(false);

    let svgComponent = showOption
        ? <CloseTaskSVG closeFunction={() => setShowOption(false)} />
        : <OpenTaskSVG openFunction={() => setShowOption(true)} />

    const deleteTask = () => {
        let storage = localStorage;

        if (id) {
            storage.removeItem(id);
            setEffectChanger(!effectChanger)
            setShowOption(false)
        }
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

    let completeText = isCompleted ? 'Unmark completed task' : 'Mark as complete';

    return (
        <>
            {svgComponent}

            {
                showOption &&
                <div key={id} className="option-tasks">
                    <CloseTaskSVG closeFunction={() => setShowOption(false)} />
                    <article>
                        <section >
                            <Button text={completeText} buttonEvent={() => completeTask()} />
                            <Button text="Delete task" buttonEvent={() => deleteTask()} />
                            <Button text="Modify task" buttonEvent={() => modifyTask()} />
                        </section>
                    </article>
                </div>
            }
        </>
    )
}