
import './App.css';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
var Markdown = require('react-remarkable');

function App() {

  const [items, setItems] = useState([]);
  const [actual, setActual] = useState({});
  const [actualIndex, setActualIndex] = useState(-1);

  useEffect( () => {
    
  }, [actualIndex]);

  function handleNew(){
    const note = {
      id: uuid(),
      title: '',
      text: ''
    }

    setItems([note,...items]);
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

  function renderInterface(){
    return(
        <>
          <div className="editor">
            <div>
              <input onChange={handleTitleChange} value={ items[actualIndex].title }  />
            </div>

            <div>
              <textarea onChange={handleTextChange}>{items[actualIndex].text}</textarea>
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
                          onClick={() => handleSelectNote(item)}>{item.title == ''? '[Sin título]': item.title}</div>
            })
          }
        </div>
      </div>
      {actualIndex >= 0? renderInterface(): ''}
    </div>
  );
}

export default App;
