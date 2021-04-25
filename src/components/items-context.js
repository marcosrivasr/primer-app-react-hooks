import React from 'react'
const ItemsContext = React.createContext({
    onNew: ()=>{},
    onSearch: ()=>{}
});

export default ItemsContext;