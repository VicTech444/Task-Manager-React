export const OpenTaskSVG = ({openFunction}: {openFunction : (boolean: boolean) => void}) => {

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => openFunction(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={"20px"} height={"20px"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </>
    )
}

export const CloseTaskSVG = ({closeFunction} : {closeFunction: (boolean: boolean) => void}) => {

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" className="open-close" onClick={() => closeFunction(false)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={"20px"} height={"20px"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </>
    )
}