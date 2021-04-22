import React from 'react'
const ItemsContext = React.createContext({
    items: [], 
    onNew: ()=>{},
    onSearch: ()=>{}
});

export default ItemsContext;