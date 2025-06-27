const desserts = [
  {
    image: {
      thumbnail: './assets/images/image-waffle-thumbnail.jpg',
      mobile: './assets/images/image-waffle-mobile.jpg',
      tablet: './assets/images/image-waffle-tablet.jpg',
      desktop: './assets/images/image-waffle-desktop.jpg',
    },
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-creme-brulee-thumbnail.jpg',
      mobile: './assets/images/image-creme-brulee-mobile.jpg',
      tablet: './assets/images/image-creme-brulee-tablet.jpg',
      desktop: './assets/images/image-creme-brulee-desktop.jpg',
    },
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Crème Brûlée',
    price: 7.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-macaron-thumbnail.jpg',
      mobile: './assets/images/image-macaron-mobile.jpg',
      tablet: './assets/images/image-macaron-tablet.jpg',
      desktop: './assets/images/image-macaron-desktop.jpg',
    },
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-tiramisu-thumbnail.jpg',
      mobile: './assets/images/image-tiramisu-mobile.jpg',
      tablet: './assets/images/image-tiramisu-tablet.jpg',
      desktop: './assets/images/image-tiramisu-desktop.jpg',
    },
    name: 'Classic Tiramisu',
    category: 'Tiramisu',
    price: 5.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-baklava-thumbnail.jpg',
      mobile: './assets/images/image-baklava-mobile.jpg',
      tablet: './assets/images/image-baklava-tablet.jpg',
      desktop: './assets/images/image-baklava-desktop.jpg',
    },
    name: 'Pistachio Baklava',
    category: 'Baklava',
    price: 4.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-meringue-thumbnail.jpg',
      mobile: './assets/images/image-meringue-mobile.jpg',
      tablet: './assets/images/image-meringue-tablet.jpg',
      desktop: './assets/images/image-meringue-desktop.jpg',
    },
    name: 'Lemon Meringue Pie',
    category: 'Pie',
    price: 5.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-cake-thumbnail.jpg',
      mobile: './assets/images/image-cake-mobile.jpg',
      tablet: './assets/images/image-cake-tablet.jpg',
      desktop: './assets/images/image-cake-desktop.jpg',
    },
    name: 'Red Velvet Cake',
    category: 'Cake',
    price: 4.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-brownie-thumbnail.jpg',
      mobile: './assets/images/image-brownie-mobile.jpg',
      tablet: './assets/images/image-brownie-tablet.jpg',
      desktop: './assets/images/image-brownie-desktop.jpg',
    },
    name: 'Salted Caramel Brownie',
    category: 'Brownie',
    price: 4.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-panna-cotta-thumbnail.jpg',
      mobile: './assets/images/image-panna-cotta-mobile.jpg',
      tablet: './assets/images/image-panna-cotta-tablet.jpg',
      desktop: './assets/images/image-panna-cotta-desktop.jpg',
    },
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  desserts.forEach((dessert) => {
    const productGrid = document.querySelector('.product-grid');

    const html = ` <div class="product-card " data-id="${dessert.name}">
              <div class="product-media" >
                <img
                  class="product-image"
                  src="${dessert.image.desktop}"
                  alt=""
                />
                <button class="btn-add-to-cart" data-id="${dessert.name}"  >
                  <img src="./assets/images/icon-add-to-cart.svg" alt="" />
                  Add to Cart
                </button>
                <div class="quantity-control hidden">
                  <button class="btn-decrease" data-id="${
                    dessert.name
                  }" ><img src="./assets/images/icon-decrement-quantity.svg" alt=""></button>
                 <span class="quantity">1</span>
                 <button class="btn-increase" data-id="${dessert.name}" >
                  <img src="./assets/images/icon-increment-quantity.svg" alt="">
                  </button>
                 </div>
              </div>
              <p class="product-category">${dessert.category}</p>
              <p class="product-name">${dessert.name}</p>
              <p class="product-price">$${dessert.price.toFixed(2)}</p>
                </div>`;
    productGrid.insertAdjacentHTML('beforeend', html);
  });
});

document.addEventListener('click', (e) => {
  addToCartBtn = e.target.closest('.btn-add-to-cart');
  if (addToCartBtn) {
    const controls = e.target.closest('.product-card');
    const img = controls.querySelector('.product-image');
    controls.querySelector('.btn-add-to-cart').classList.add('hidden');
    img.classList.add('outline');
    controls.querySelector('.quantity-control').classList.remove('hidden');
  }
  const increaseBtn = e.target.closest('.btn-increase');
  if (increaseBtn) {
    const wrapper = increaseBtn.closest('.quantity-control');
    const q = wrapper.querySelector('.quantity');
    q.textContent = +q.textContent + 1;
  }
  const decreaseBtn = e.target.closest('.btn-decrease');
  if (decreaseBtn) {
    const wrapper = decreaseBtn.closest('.quantity-control');
    const q = wrapper.querySelector('.quantity');
    const current = +q.textContent;
    if (current > 1) {
      q.textContent = current - 1;
    } else if (current === 1) {
      wrapper.classList.add('hidden');
      wrapper
        .closest('.product-card')
        .querySelector('.btn-add-to-cart')
        .classList.remove('hidden');

      wrapper
        .closest('.product-card')
        .querySelector('.product-image')
        .classList.remove('outline');
    }
  }
});

const cart = {};

document.addEventListener('click', (e) => {
  const addToCartBtn = e.target.closest('.btn-add-to-cart');
  const increaseBtn = e.target.closest('.btn-increase');
  const decreaseBtn = e.target.closest('.btn-decrease');
  if (increaseBtn) {
    const id = increaseBtn.dataset.id;
    updateCart(id, +1);
    renderCart();
  }
  if (decreaseBtn) {
    const id = decreaseBtn.dataset.id;
    updateCart(id, -1);
    renderCart();
  }
  if (addToCartBtn) {
    const id = addToCartBtn.dataset.id;
    updateCart(id, 1);
    renderCart();
  }
});

function updateCart(id, delta) {
  if (!cart[id]) {
    cart[id] = 0;
  }
  cart[id] += delta;
  if (cart[id] <= 0) {
    delete cart[id];
  }

  renderCart();
}

function renderCart() {
  console.log(cart);
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartEmpty = document.querySelector('.cart-empty');
  const cartElements = document.querySelectorAll('.cart-element');
  const cartCount = document.querySelector('.cart-count');
  const summaryPrice = document.querySelector('.summary-price');

  cartItemsContainer.innerHTML = '';

  const ids = Object.keys(cart);
  if (ids.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartElements.forEach((el) => el.classList.add('hidden'));
    cartCount.textContent = 0;
    return;
  }

  let total = 0;
  let totalCount = 0;

  ids.forEach((id) => {
    const quantity = cart[id];
    const product = desserts.find((item) => item.name === id);
    if (!product) return;

    const itemHTML = `
      <div class="cart-item">
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <div class="cart-item-pricing">
            <span class="cart-qty">${quantity}x</span>
            <p class="cart-unit-price">$${product.price.toFixed(2)}</p>
            <p class="cart-total-price">$${(product.price * quantity).toFixed(
              2
            )}</p>
          </div>
        </div>
        <button class="btn-remove-item" data-id="${product.name}">
          <img src="./assets/images/icon-remove-item.svg" alt="" />
        </button>
      </div>
    `;

    cartItemsContainer.innerHTML += itemHTML;
    total += product.price * quantity;
    totalCount += quantity;
  });

  cartEmpty.classList.add('hidden');
  cartElements.forEach((el) => el.classList.remove('hidden'));
  cartCount.textContent = totalCount;
  summaryPrice.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('click', (e) => {
  const btnRemoveItem = e.target.closest('.btn-remove-item');
  if (btnRemoveItem) {
    const id = btnRemoveItem.dataset.id;
    delete cart[id];
    renderCart();

    const card = document.querySelector(`.product-card[data-id='${id}']`);
    if (card) {
      card.querySelector('.quantity-control').classList.add('hidden');
      card.querySelector('.btn-add-to-cart').classList.remove('hidden');
      card.querySelector('.quantity').textContent = '1';
      card.querySelector('.product-card img').classList.remove('outline');
    }
  }
});

document.querySelector('.btn-confirm-order').addEventListener('click', () => {
  document.querySelector('.modal-overlay').classList.remove('hidden');
});

// const modalContent = document.querySelector('modal-box');

// document.querySelector('.btn-new-order').addEventListener('click', () => {
//   document.querySelector('.modal-overlay').classList.add('hidden');

//   renderCart();
// });
