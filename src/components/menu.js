import React, {useContext} from 'react';
import ItemsContext from './items-context';


export default function Menu(){

  const itemsContext = useContext(ItemsContext);

  function handleClick(){
    itemsContext.onNew();
  }

  function handleChange(e){
    itemsContext.onSearch(e);
  }

    return (
        <div className="menu">
          <input className="search" onChange={handleChange} placeholder="buscar..." />
          <button className="btn" onClick={ ()=> handleClick()} >+ Nueva nota</button>
        </div>
    );
}