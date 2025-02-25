import {CONFIRM_MESSAGE} from 'constant';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {CART} from 'store/modules/cart';
import {SELECTED_ITEM} from 'store/modules/selectedItem';
import {ERROR_MESSAGE} from 'constant';

import useFetch from './useFetch';

export default function useCartItem(path = null) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const {fetch: fetchCart} = useFetch('get');

  const {fetch: postCart} = useFetch('post');

  const {fetch: deleteCart} = useFetch('delete');

  const deleteCartItem = (payload) => {
    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);
    if (deleteConfirm) {
      deleteCart({
        API_URL: `${process.env.REACT_APP_BASE_SERVER_URL}${process.env.REACT_APP_CUSTOMERS}${process.env.REACT_APP_CART}`,
        body: {productId: payload},

        onSuccess: () => {
          dispatch({type: CART.DELETE, payload});
          dispatch({type: SELECTED_ITEM.DELETE, payload});
        },
      });
      return;
    }

    if (!path) {
      return;
    }
    navigation(path);
  };

  const initializeCart = useCallback(() => {
    const response = JSON.parse(localStorage.getItem('accessToken'));
    if (!response) {
      return;
    }

    fetchCart({
      API_URL: `${process.env.REACT_APP_BASE_SERVER_URL}${process.env.REACT_APP_CUSTOMERS}${process.env.REACT_APP_CART}`,

      onSuccess: (fetchedData) => {
        dispatch({type: CART.INITIALIZE, payload: fetchedData.cart});
      },
    });
  }, [dispatch, fetchCart]);

  const addCartItem = (payload) => {
    const response = JSON.parse(localStorage.getItem('accessToken'));

    if (!response) {
      alert(ERROR_MESSAGE.IS_LOGOUT);
      return;
    }

    postCart({
      API_URL: `${process.env.REACT_APP_BASE_SERVER_URL}${process.env.REACT_APP_CUSTOMERS}${process.env.REACT_APP_CART}`,
      body: {productId: payload.id},

      onSuccess: () => {
        dispatch({type: CART.ADD, payload: {...payload, test: 'test', quantity: 1}});
      },
    });
    if (!path) {
      return;
    }
    navigation(path);
  };

  const deleteSelectedCart = (payload) => {
    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);

    if (deleteConfirm) {
      payload.forEach((id) =>
        deleteCart({
          API_URL: `${process.env.REACT_APP_BASE_SERVER_URL}${process.env.REACT_APP_CUSTOMERS}${process.env.REACT_APP_CART}`,
          body: {productId: id},

          onSuccess: () => {
            dispatch({type: CART.DELETE, payload: id});
            dispatch({type: SELECTED_ITEM.DELETE, payload: id});
          },
        }),
      );
      return;
    }
  };

  return {
    deleteCartItem,
    addCartItem,
    deleteSelectedCart,
    initializeCart,
  };
}
