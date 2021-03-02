import {useState} from 'react';
import INote from './Interfaces';

type InputBarProps = {
    onTextChange(text: INote): void
}

export default function InputBar(props: InputBarProps){

    const [curText, setCurText] = useState("");

    function handleClick(){
        if(curText !== ""){
            const newNote : INote = {
                text: curText,
                date: new Date(),
                id: Date.now()
            };
            props.onTextChange(newNote);
            setCurText("");
        }
    }

    function handleKeyDown(event:any){
        if((event.key === 'Enter')&&(curText !== ""))
            handleClick();
    }

    return (
        <div className="input-bar">
            <p className="input-bar__text">Напишите заметку:</p>
            <div className="input-bar__input">
                <input className="input-bar__write"
                    type="text" 
                    onKeyDown={(event:any) => handleKeyDown(event)}
                    value={curText} 
                    onChange={(event:any) => setCurText(event.target.value)}
                    placeholder = "Новая заметка"/>
                <button className="input-bar__button button" onClick = {() => handleClick()}>
                    Сохранить
                </button>
            </div>
        </div>
    )
}