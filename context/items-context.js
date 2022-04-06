import {createContext, useState} from 'react'
import Item from '../model/Item'

export const ItemsContext = createContext({
    items: [],
    addItem: (item) => {},
    toggleChange: () => {},
    isChanged: false
});

function ItemsContextProvider({children}) {
    const [items, setItems] = useState([]);
    const [ishanged, setIsChanged] = useState(false);

    function addItem(item) {
        setItems((currentItem) => [...currentItem, item]);
    }

    function toggleChange() {
        setIsChanged(!ishanged);
    }

    const value = {
        items: items,
        addItem: addItem,
        toggleChange: toggleChange,
        isChanged: ishanged
    };

    return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}

export default ItemsContextProvider