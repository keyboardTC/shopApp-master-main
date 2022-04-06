import { createContext, useState } from "react";


export const CartContext = createContext({
    items: [],
    totalPrice: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    toggleChange: () => {},
    isChanged: false
})

function CartContextProvider({children}) {
    const [items, setItems] = useState([]);
    const [ishanged, setIsChanged] = useState(false);

    function addItem(item) {
        setItems((currentItem) => [...currentItem, item]);
    }

    function deleteItem(itemInCartIndex) {
        // setItems((currentItems) => 
        //     currentItems.filter((id) => id !== item.Id)
        // );
      items.splice(itemInCartIndex,1);
        setItems(items);
    }

    function toggleChange() {
        setIsChanged(!ishanged);
    }

    const value = {
        items: items,
        addItem: addItem,
        deleteItem: deleteItem,
        toggleChange:toggleChange,
        isChanged: ishanged
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContextProvider