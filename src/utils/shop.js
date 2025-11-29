import { useOrderStore } from '@/stores/order';
const orderStore = useOrderStore();

export const getImageForProduct = (product) => {
  return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

export const addToCart = (productId, variant = null) => {
  try {
    orderStore.addProduct({
      product: productId,
      quantity: 1,
      variant: variant
    });
    popupStore.setPopup('Aggiunto al carrello!', 'success');
  } catch (error) {
    popupStore.setPopup('Impossibile aggiungere al carrello!', 'error');
  }
};

export const getPrice = (product) => {
  if(product.discount)
    return `${parseFloat((product.discount) / 100).toFixed(2)}€ - <s style='color: red;'>${parseFloat((product.price) / 100).toFixed(2)}€</s>`;
  else if (product.price)
    return parseFloat((product.price) / 100).toFixed(2) + ' €';
  else
    return 'Non disponibile';
}