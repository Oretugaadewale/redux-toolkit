import NavBar from "./Component/NavBar";
import CartContainer from "./Component/CartContainer";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals, getCartItems} from './features/cart/CartSlice';
import { useEffect } from 'react';
import Modal from "./Component/Modal";
// import CartItem from "./Component/CartItem";


function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
   const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems]);


  useEffect(() => {
    dispatch(getCartItems('random'))
  }, []);
  
  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }



  return (
    <h2>
      <main>
        {isOpen &&  <Modal/>}
        <NavBar />
        <CartContainer/>
      </main>
    </h2>
  );
}
export default App;
