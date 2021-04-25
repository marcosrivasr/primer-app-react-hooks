import { useEffect } from "react";


export default function useDocumentTitle(text, defaultValue){

    useEffect( () => {
        document.title = (text !== '')? text: defaultValue;
    })
}