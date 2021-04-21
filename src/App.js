
import './App.css';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
var Markdown = require('react-remarkable');

function App() {

  const [items, setItems] = useState([]);
  const [copyItems, setCopyItems] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);

 useEffect( () => {
    console.log('index cambiado ', actualIndex);
  }, [actualIndex]);

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

    let res = getOrderedNotes(notes);
    
    setItems(res);
    setCopyItems(res);

    let index = res.findIndex(x => x.id == note.id);
    setActualIndex(index);
  }

  function sortByDate(arr, asc = false){

    if(asc) return arr.sort( (a, b) => new Date(b.created) - new Date(a.created) && b.pinned);
    return arr.sort( (a, b) => new Date(a.created) - new Date(b.created));
  }

  function getOrderedNotes(arr){
    let items = [...arr];
    let pinned = items.filter(x => x.pinned === true);
    let rest = items.filter(x => x.pinned === false);

    pinned = sortByDate(pinned, true);
    rest = sortByDate(rest, true);

    return [...pinned, ...rest];
  }


  function handleSelectNote(item, e){
    if(!e.target.classList.contains('note')) return;
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

  function handlePinned(item, i){
    setActualIndex(i);
    let id = item.id;
    let notes = [...items];
    notes[i].pinned = !notes[i].pinned;

    let res = getOrderedNotes(notes);
    
    setItems(res);
    setCopyItems(res);

    let index = res.findIndex(x => x.id == id);
    console.log(i, index);

    setActualIndex(index);
  }

  function handleSearch(e){

    const q = e.target.value;

    if(q === ''){
      setCopyItems([...items]);
    }else{
      setCopyItems([...items]);

      let res = copyItems.filter(x => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0);

      setCopyItems([...res]);
      setActualIndex(0);
    }




  }

  function renderInterface(){
    return(
        <>
          <div className="editor">
            <div>
              <input className="title" onChange={handleTitleChange} value={ items[actualIndex].title } />
            </div>

            <div className="editor-textarea">
              <textarea className="content" onChange={handleTextChange} value={items[actualIndex].text}></textarea>
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
        <div className="menu">
          <input className="search" onChange={ handleSearch } placeholder="buscar..." />
          <button className="btn" onClick={ e => handleNew()}>+ Nueva nota</button>
        </div>
        <div>
          {
            copyItems.map((item, i) => {
              return <div key={item.id} 
                          className={(i == actualIndex)? 'note activeNote': 'note'}
                          onClick={(e) => handleSelectNote(item, e)}>
                            <div>
                            {item.title == ''? '[Sin título]': item.title.substring(0,20)}
                            </div>
                            <div><button className="pinButton" onClick={ () => handlePinned(item, i) }>{item.pinned? 'Pinned': 'Pin'}</button></div>
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
