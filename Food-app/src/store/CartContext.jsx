import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart:() => {}
});

function cartReducer(state, action){
    if (action.type === 'ADD_ITEM'){
        // state.items.push(action.item); Do no update existing state. Create new
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push({...action.item, quantity: 1});  // <== inserted quantity on add to cart
        }

        return { ...state, items: updatedItems };
    } 
    if (action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items]; 


        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex, 1);
        }else{
            const updatedItem = { 
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }
    if (action.type === 'CLEAR_CART'){
        return {...state, items: []};
    }
    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: [] });

    
    function addItem(item){
        dispatchCartAction({item, type: 'ADD_ITEM'});
    }
    function removeItem(id){
        dispatchCartAction({id, type: 'REMOVE_ITEM'});
    }
    
    function clearCart(){
        dispatchCartAction({type: 'CLEAR_CART'})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    console.log(cartContext, " my context");

    // return <CartContext.Provider></CartContext.Provider>  Below React 19
    return <CartContext value={cartContext}>{children}</CartContext>
}

export default CartContext;