
import React, {useContext} from 'react';
import ItemsContext from './items-context';
import StatusContext from './status-context';
import AutoSaveStatus from './autosavesatuts';


export default function Editor({item, onTitleChanged, onTextChanged}){

    const itemsContext = useContext(ItemsContext);
    const statusContext = useContext(StatusContext);

    function handleTitleChange(e){
        onTitleChanged(e);
        itemsContext.autosave();
    }

    function handleTextChange(e){
        onTextChanged(e);
        itemsContext.autosave();
    }

    return (
        <div className="editor">
            <AutoSaveStatus statuscode={statusContext} />
            <div>
              <input className="title" onChange={handleTitleChange} value={ item.title } />
            </div>

            <div className="editor-textarea">
              <textarea className="content" onChange={handleTextChange} value={ item.text }></textarea>
            </div>
        </div>
    );
}