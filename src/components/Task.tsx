import { taskProps } from "../interfaces/interfaces"
import { Button } from "./Button"
import '../styles/Task.css'
import { saveInStorage, cancelTask, modifyTask } from "../functions/localStorageFn"


export const Task = (props: taskProps) => {
    let {setName, states, statesValues} = props;

    let {taskName, taskTitle, taskDesc, createTaskOptions, taskDescID, isModifying} = statesValues;
    let {setAmountOfTasks, setTaskDesc} = states

    let storageParam = {
        statesValues: statesValues,
        setAmountTask: setAmountOfTasks,
        states: states
    }

    let showTaskCreateDesc = createTaskOptions ? false : true;
    let showTaskCreateTitle = createTaskOptions ? false : true;
    let showTitle = createTaskOptions ? false : true;
    
    let modifying = isModifying
    ? <Button option="modify" text="Modify task" buttonEvent={() => modifyTask(storageParam)} />
    : <Button option="save" text="Save task" buttonEvent={() => saveInStorage(storageParam)} />
    return (
        <div className="task-description" id={taskDescID}>
            <header>
                {
                    !showTaskCreateTitle &&
                    <textarea className="title" rows={1} value={taskName} onChange={(ev) => setName(ev)}></textarea>
                }
                {
                    showTitle && <h3>{taskTitle}</h3>
                }
                <div className="separation-line"></div>
            </header>
            <section>
                {showTaskCreateDesc && taskDesc}
            </section>
            {createTaskOptions &&
                <>
                    <div className="create-description">
                        <textarea required
                            placeholder="Enter your task description"
                            className="description"
                            rows={5}
                            value={taskDesc}
                            onChange={(ev) => setTaskDesc(ev.target.value)}>

                        </textarea>
                    </div>
                    <div className="create-options">
                        {modifying}
                        <Button option="cancel" text="Cancel task" buttonEvent={() => cancelTask({states})} />
                    </div>
                </>
            }
        </div>
    )
}