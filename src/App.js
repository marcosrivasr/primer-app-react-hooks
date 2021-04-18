
import './App.css';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
var Markdown = require('react-remarkable');

function App() {

  const [items, setItems] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);

 /*  useEffect( () => {
    console.log('guardando...');
  }, [autoSave]); */

  function handleNew(){
    let notes = [...items];
    const note = {
      id: uuid(),
      title: '',
      text: '',
      pinned: false,
      created:Date.now()
    }

    notes.unshift(note);

    notes = notes.sort( (a, b) => new Date(b.created) - new Date(a.created));
    setItems([...notes]);
    setActualIndex(0);
  }


  function handleSelectNote(item){
    const index = items.findIndex( (note) => note == item);
    
    setActualIndex(index);
  }

  function handleTitleChange(e){
    const title = e.target.value;
    let notes = [...items];

    notes[actualIndex].title = title;

    setItems(notes);
  }

  function handleTextChange(e){
    const text = e.target.value;
    let notes = [...items];

    notes[actualIndex].text = text;

    setItems(notes);
  }

  function handlePinned(index){
    let notes = [...items];
    notes[index].pinned = !notes[index].pinned;
    
    setItems(notes);

  }

  function renderInterface(){
    return(
        <>
          <div className="editor">
            <div>
              <input onChange={handleTitleChange} value={ items[actualIndex].title }  />
            </div>

            <div className="editor-textarea">
              <textarea onChange={handleTextChange} value={items[actualIndex].text}></textarea>
            </div>
        </div>

        <div className="preview ">
          <Markdown source={ items[actualIndex].text } />
            <div></div>
        </div>
      </>
    );
  }



  return (
    <div className="App container">
      <div className="panel">
        <button onClick={ e => handleNew()}>Nueva nota</button>

        <div>
          {
            items.map((item, i) => {
              return <div key={item.id} 
                          className={(i == actualIndex)? 'note activeNote': 'note'}
                          onClick={() => handleSelectNote(item)}>
                            <div>
                            {item.title == ''? '[Sin título]': item.title}
                            </div>
                            <div><button onClick={ () => handlePinned(i) }>{item.pinned? 'Pinned': 'Pin'}</button></div>
                      </div>
            })
          }
        </div>
      </div>
      {actualIndex >= 0? renderInterface(): ''}
    </div>
  );
}

export default App;
