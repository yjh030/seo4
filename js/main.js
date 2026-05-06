import products from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const category = document.body.dataset.category;
    const isHome = document.body.classList.contains('home');

    // Filter products if on a collection page
    let displayProducts = products;
    if (category) {
        displayProducts = products.filter(p => p.category === category);
    } else if (isHome) {
        displayProducts = products.slice(0, 4); // Show first 4 on home
    }

    if (productGrid) {
        renderProducts(displayProducts, productGrid);
    }

    // Handle Product Detail Page
    const detailContainer = document.getElementById('product-detail');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products.find(p => p.id === productId);

        if (product) {
            renderProductDetail(product, detailContainer);
        } else {
            detailContainer.innerHTML = '<h2>Product not found</h2>';
        }
    }
});

function renderProducts(items, container) {
    container.innerHTML = items.map(product => `
        <a href="product.html?id=${product.id}" class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
            </div>
        </a>
    `).join('');
}

function renderProductDetail(product, container) {
    container.innerHTML = `
        <div class="product-detail-container">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <div class="product-category">${product.category}</div>
                <h1>${product.name}</h1>
                <div class="detail-price">$${product.price}</div>
                <p class="detail-desc">${product.description}</p>
                <button class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    `;
}
