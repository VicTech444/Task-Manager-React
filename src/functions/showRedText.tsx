import { showRedTextProps, allStates } from "../interfaces/interfaces";

type allProps = allStates & showRedTextProps;

export const showRedText = (redTextProps: allProps): boolean => {
    let {whoRecentlyOpen, taskName, setRecentlyOpen, setValidTaskName, setShowTaskInfo} = redTextProps   
    if (!taskName) {

        setRecentlyOpen(whoRecentlyOpen);
        setValidTaskName(true);
        setShowTaskInfo(false)
        setTimeout(() => {
            setValidTaskName(false)
        }, 3000);
 
    } else if (taskName) {    
       return true;

    }

    return false;
}