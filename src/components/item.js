


export default function Item({item, actualIndex, index, onHandlePinned, onHandleSelectNote}){


    function handleSelectNote(item, e){
        onHandleSelectNote(item, e);
    }

    function handlePinned(item, index){
        onHandlePinned(item, index);
    }

    return (
        <div key={item.id} 
            className={(index === actualIndex)? 'note activeNote': 'note'}
            onClick={(e) => handleSelectNote(item, e)}>
            <div>
                {item.title === ''? '[Sin título]': item.title.substring(0,20)}
            </div>
            <div>
                <button className="pinButton" onClick={ () => handlePinned(item, index) }>
                    {item.pinned? 'Pinned': 'Pin'}
                </button>
            </div>
        </div>
    )
}