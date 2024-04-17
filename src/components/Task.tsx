import { taskProps } from "../interfaces/interfaces"
import { Button } from "./Button"
import '../styles/Task.css'
import { saveInStorage, cancelTask, modifyTask } from "../functions/localStorageFn"


export const Task = (props: taskProps) => {
    let { title, taskTitle , description,
        create, setName,
        setTaskDesc, states, statesValues, setAmountTask } = props;

    let storageParam = {
        statesValues: statesValues,
        setAmountTask: setAmountTask,
        states: states
    }

    let showTaskCreateDesc = create ? false : true;
    let showTaskCreateTitle = create ? false : true;
    let showTitle = !create ? true : false;
    
    let modifying = statesValues.isModifying 
    ? <Button option="modify" text="Modify task" buttonEvent={() => modifyTask(storageParam)} />
    : <Button option="save" text="Save task" buttonEvent={() => saveInStorage(storageParam)} />

    console.log(statesValues.isModifying);

    return (
        <div className="task-description" id={statesValues.taskDescID}>
            <header>
                {
                    !showTaskCreateTitle &&
                    <textarea className="title" rows={1} value={title} onChange={(ev) => setName(ev)}></textarea>
                }
                {
                    showTitle && <h3>{taskTitle}</h3>
                }
                <div className="separation-line"></div>
            </header>
            <section>
                {showTaskCreateDesc && description}
            </section>
            {create &&
                <>
                    <div className="create-description">
                        <textarea required
                            placeholder="Enter your task description"
                            className="description"
                            rows={5}
                            value={description}
                            onChange={(ev) => setTaskDesc(ev)}>

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