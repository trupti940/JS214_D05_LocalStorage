const cartContainer = document.getElementById('cart-container');

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartContainer.innerHTML = '';
  cart.forEach(user => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <button onclick="removeFromCart(${user.id})">Delete</button>
    `;
    cartContainer.appendChild(cartItem);
  });
}

function removeFromCart(userId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(user => user.id !== userId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

renderCart();
