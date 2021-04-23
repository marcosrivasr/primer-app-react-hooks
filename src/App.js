
import './App.css';
import Item from './components/item';
import List from './components/list';
import Editor from './components/editor';
import Preview from './components/preview';
import useDocumentTitle from './components/documentitle';
import Panel  from './components/panel';
import Menu from './components/menu';
import { useEffect, useState, React } from 'react';
import uuid from 'react-uuid';
import ItemsContext from './components/items-context';
import {get, post} from './libs/http';



function App() {

  const [items, setItems] = useState([]);
  const [copyItems, setCopyItems] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);

  const URL = 'http://localhost:3010/'

  useDocumentTitle(items[actualIndex]?.title, 'Notes');

  useEffect( async ()  => {
    await getItems();
  }, []);

  async function getItems(){
    const data = await get(`${URL}`);
    setItems(data);
    setCopyItems(data);
    if(items.length > 0) setActualIndex(0);
  }

  async function handleNew(){
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

    const data = await post('http://localhost:3010/new', note);
    console.log(data); 
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

    setCopyItems(...pinned, ...rest);
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

  function autosave(){
    console.log('cambio documento');
  }

  function save(){

  }

  function renderInterface(){
    return(
        <>
          <Editor item={items[actualIndex]} onTitleChanged={ handleTitleChange } onTextChanged={ handleTextChange } />
          <Preview text={ items[actualIndex].text } />
        </>
    );
  }

  return (
    <div className="App container">
      <ItemsContext.Provider value={{items:items, onNew: handleNew, onSearch: handleSearch, autosave:autosave}}>
        <Panel>
          <Menu />
          <List>
          {
            copyItems.map((item, i) => {
              return <Item key={i} 
                          actualIndex={actualIndex} 
                          item={item} 
                          index={i} 
                          onHandlePinned={handlePinned} 
                          onHandleSelectNote={handleSelectNote} />
            })
          }
        </List>
        </Panel>
        {actualIndex >= 0? renderInterface(): ''}
      </ItemsContext.Provider>
       
    </div>
  );
}

export default App;
