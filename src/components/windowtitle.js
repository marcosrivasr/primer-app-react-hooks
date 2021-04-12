import { useEffect } from "react";


export default function useWindowTitle(text){

    useEffect( () => {
        document.title = text;
    });
}