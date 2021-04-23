
import React, {useContext} from 'react';
import ItemsContext from './items-context';


export default function Editor({item, onTitleChanged, onTextChanged}){

    const itemsContext = useContext(ItemsContext);

    function handleTitleChange(e){
        onTitleChanged(e);
        itemsContext.autosave();
    }

    function handleTextChange(e){
        onTextChanged(e);
    }

    return (
        <div className="editor">
            <div>
              <input className="title" onChange={handleTitleChange} value={ item.title } />
            </div>

            <div className="editor-textarea">
              <textarea className="content" onChange={handleTextChange} value={ item.text }></textarea>
            </div>
        </div>
    );
}