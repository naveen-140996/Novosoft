let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            allProducts = data.filter(product => product.category === "men's clothing" || product.category === "women's clothing" || product.category === "jewelery");
            displayProducts(allProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
    products.forEach(product => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('product-wrapper');

        const card = document.createElement('div');
        card.classList.add('product-card');
        if (product.category === "men's clothing" || product.category === "women's clothing") {
            card.classList.add('big-card');
        } else if (product.category === "jewelery") {
            card.classList.add('medium-card');
        }

        const info = document.createElement('div');
        info.classList.add('product-info');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
        `;

        info.innerHTML = `
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
        `;

        wrapper.appendChild(card);
        wrapper.appendChild(info);
        container.appendChild(wrapper);
    });
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}
