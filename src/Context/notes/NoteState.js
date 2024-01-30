import { useState } from "react"
import NoteContext from "./NoteContext"

const NoteState = (props) => {
    const s1 = {
        "name": "Uday",
        "class": "56b"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Uday Singh",
                "class": "10b"
            })
        }, 1000)
    }
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;