import { usePopupStore } from '@/stores/popup';
import { useOrderStore } from '@/stores/order';

const orderStore = useOrderStore();
const popupStore = usePopupStore();

export const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

export const addToCart = (productId, variant = null) => {
  const added = orderStore.addProduct({
    product: productId,
    quantity: 1,
    variant: variant
  });

  if (!added) {
    popupStore.setPopup('Quantità massima raggiunta per questo prodotto', 'error');
    return;
  }
  popupStore.setPopup('Aggiunto al carrello!', 'success');
};

export const getPrice = (product) => {
  if(product.discount)
    return `${parseFloat((product.discount) / 100).toFixed(2)}€ - <s style='color: red;'>${parseFloat((product.price) / 100).toFixed(2)}€</s>`;
  else if (product.price)
    return parseFloat((product.price) / 100).toFixed(2) + ' €';
  else
    return 'Non disponibile';
}
