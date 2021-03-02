import INote from './Interfaces';

type NoteLineProps = {
    note: INote,
    onRemoveText(id: number): void
}
function NoteLine(props: NoteLineProps){
    const date: string = `${props.note.date.getDate()}.${props.note.date.getMonth() + 1}.${props.note.date.getFullYear()}`;
    const time: string = `${props.note.date.getHours()}:${props.note.date.getMinutes()}:${props.note.date.getSeconds()}`;
    
    return(
        <li className="note-list__item">
            <p className="note-list__note">{props.note.text}</p>
            <div className="note-list__side-bar">
                <button 
                    className="note-list__button button" 
                    onClick={() => props.onRemoveText(props.note.id)}
                >
                    Удалить
                </button>
                <div className="note-list__note-date">
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
            </div>
        </li>
    )
}

type NoteListProps = {
    notes: INote[],
    onRemoveText(id: number): void
}
export default function NoteList(props: NoteListProps){
    return(
        <ul className="note-list">
            {props.notes.map(note => 
                <NoteLine key={note.id} note={note} onRemoveText={props.onRemoveText}/>)
            }
        </ul>
    )
}
