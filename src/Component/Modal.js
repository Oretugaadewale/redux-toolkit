import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/CartSlice';
import { closeModal } from '../features/cart/modal/ModalSlice';



const Modal = () => {
  const dispatch = useDispatch()
    return (
      <aside className='modal-container'>
        <div className='modal'>
          <h4>Remove all items from your shopping cart?</h4>
          <div className='btn-container'>
            <button type='button'
              className='btn confirm-btn'
              onClick={() => {
                //close modal & clear cart
                dispatch(clearCart());
                dispatch(closeModal());
              }}
            >
              confirm
            </button>
            <button type='button'
              className='btn clear-btn'
              //close modal
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </aside>
    );
  };
  export default Modal;