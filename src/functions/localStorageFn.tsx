
import { newTaskProps, storageProps, jsonTask } from "../interfaces/interfaces"

export const saveInStorage = (propsStorage: storageProps) => {
    let { statesValues, states } = propsStorage;

    let { setTaskName, setCreateTask, setShowTaskInfo, setEffectChanger } = states;
    let { taskName, taskDesc , effectChanger} = statesValues;

    let storage = localStorage;
    let arrStorage: string[] = Object.values(storage);

    let organizedItems = new Set<jsonTask>([]);

    arrStorage.forEach(element => {
        organizedItems.add(JSON.parse(element))
    })

    let noDuplicateNames = new Set<string>([]);
    let noDuplicateDesc = new Set<string>([]);
    let noDuplicateID = new Set<string>([]);

    [...organizedItems].forEach(element => {
        noDuplicateNames.add(element.name);
        noDuplicateDesc.add(element.taskDesc);
        noDuplicateID.add(element.id);
    })

    let newItem = {
        name: taskName,
        taskDesc: taskDesc,
        id: crypto.randomUUID(),
        completed: false
    }

    if (taskName && taskDesc) {
        if (!noDuplicateNames.has(newItem.name) && !noDuplicateDesc.has(newItem.taskDesc)
            && !noDuplicateID.has(newItem.id)) {

            storage.setItem(newItem.id, JSON.stringify(newItem));
            setEffectChanger(!effectChanger)

            setCreateTask(false);
            setShowTaskInfo(false);
            setTaskName("")
        }
    }
}

export const cancelTask = ({ states }: newTaskProps) => {
    let { setCreateTask, setShowTaskInfo, setTaskName } = states;

    setCreateTask(false);
    setShowTaskInfo(false);
    setTaskName("");
}

export const modifyTask = (propsStorage: storageProps) => {
    let { statesValues, states } = propsStorage;
    let { taskDesc, taskDescID, taskName, effectChanger } = statesValues
    let { setIsModifying, setShowTaskInfo, setCreateTask, setTaskName, setEffectChanger } = states;

    let storage = localStorage;

    storage.setItem(taskDescID, JSON.stringify(
        {
            name: taskName,
            taskDesc: taskDesc,
            id: taskDescID
        }
    ))

    setIsModifying(false);
    setCreateTask(false);
    setShowTaskInfo(false);
    setTaskName("");
    setEffectChanger(!effectChanger)
}