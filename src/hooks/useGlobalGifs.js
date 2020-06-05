import { useContext } from "react";
import GifsContextt from '../context/GifsContext';

// this is a read only custom hooks, only return the gifs 
export default function useGlobalGifs() {
    const {gifs} = useContext(GifsContextt); // this return an object  like { gifs: [] , setGif: ()} we only need the gifs
    return gifs;
}