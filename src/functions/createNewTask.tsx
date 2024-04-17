
import { newTaskProps } from "../interfaces/interfaces"

export const createNewTask = ({states}: newTaskProps): void => {

    let {setCreateTask, setShowTaskInfo, setIsModifying, setTaskDesc} = states;

    setCreateTask(true)
    setShowTaskInfo(true)
    setIsModifying(false);
    setTaskDesc("")
}