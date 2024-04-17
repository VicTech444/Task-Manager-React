import '../styles/Button.css'
import { buttonProps } from '../interfaces/interfaces';

export const Button = ({ option, text, buttonEvent}: buttonProps) => {

    return (
        <button className={option} onClick={buttonEvent} name={option}>
            {text}
        </button>
    )
}