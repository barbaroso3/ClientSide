import React, { useState, useEffect }from 'react';
import InputBar from './inputBar';
import NoteList from './NoteList';
import INote from './Interfaces';

export default function App(){

  const [notesIsLoaded, setNotesIsLoaded]: [boolean, any] = useState(false);
  const [notes , setNotes]: [INote[], any] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:7000`).then(res => res.json())
    .then(serverNotes => {
      setNotesIsLoaded(true);
      const newNotes: INote[] = [];
      serverNotes.forEach((serverNote: any) => {
        const newNote: INote = {
          date: new Date(serverNote.Date),
          text: serverNote.Text,
          id: serverNote.id
        }
        newNotes.push(newNote);
      })
      setNotes(newNotes.reverse());
    })
    .catch(error => console.log(error));
  }, []);

  function handleRemoveText(id: number){
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`http://localhost:7000/${id}`, requestOptions).then(res => {
        if(res.ok){
          const newNotes = notes.filter(note => note.id !== id);
          setNotes(newNotes);
        }
      }
    ).catch(error => console.log(error));
  }

  function handleTextChange(newNote: INote){
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(newNote)
    };
    fetch(`http://localhost:7000`, requestOptions).then( res => {
          if(res.ok){
            const oldNotes = notes;
            setNotes([newNote, ...oldNotes]);
          }
      }
    ).catch(error => console.log(error));
  }

  let notesContent;
  if(notes.length > 0) notesContent = <NoteList notes={notes} onRemoveText={handleRemoveText}/>;
  else notesContent = <p className="content__notes-title">У вас нет заметок</p>;

  return(
    <div className="wrapper">
      <div className="main-title">Приложение заметок</div>
      <div className="content">
        <InputBar onTextChange={handleTextChange}/>
        {notesIsLoaded ? notesContent : 
          <p className="content__notes-title">Загрузка заметок...</p>
        }
      </div>
    </div>
  )
}