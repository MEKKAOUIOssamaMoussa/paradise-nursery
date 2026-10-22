import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

/** Plant catalogue grouped by category. `cost` is the unit price in USD. */
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    icon: '🌬️',
    blurb: 'Natural filters that refresh the air you breathe.',
    plants: [
      {
        name: 'Snake Plant',
        image: img('snake_plant.jpg'),
        description: 'Produces oxygen at night, improving air quality.',
        cost: 15,
      },
      {
        name: 'Spider Plant',
        image: img('spider_plant.jpg'),
        description: 'Filters formaldehyde and xylene from the air.',
        cost: 12,
      },
      {
        name: 'Peace Lily',
        image: img('peace_lily.jpg'),
        description: 'Removes mold spores and purifies the air.',
        cost: 18,
      },
      {
        name: 'Boston Fern',
        image: img('boston_fern.jpg'),
        description: 'Adds humidity to the air and removes toxins.',
        cost: 20,
      },
      {
        name: 'Rubber Plant',
        image: img('rubber_plant.jpg'),
        description: 'Easy to care for and effective at removing toxins.',
        cost: 17,
      },
      {
        name: 'Chinese Evergreen',
        image: img('aglaonema.jpg'),
        description: 'NASA-listed air purifier with striking variegated leaves.',
        cost: 16,
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    icon: '🌸',
    blurb: 'Fill your home with soothing, natural scents.',
    plants: [
      {
        name: 'Lavender',
        image: img('lavender.jpg'),
        description: 'Calming scent, used in aromatherapy.',
        cost: 20,
      },
      {
        name: 'Jasmine',
        image: img('jasmine.jpg'),
        description: 'Sweet fragrance, promotes relaxation.',
        cost: 18,
      },
      {
        name: 'Rosemary',
        image: img('rosemary.jpg'),
        description: 'Invigorating scent, often used in cooking.',
        cost: 15,
      },
      {
        name: 'Mint',
        image: img('mint.jpg'),
        description: 'Refreshing aroma, used in teas and cooking.',
        cost: 12,
      },
      {
        name: 'Gardenia',
        image: img('gardenia.jpg'),
        description: 'Creamy blooms with an intoxicating perfume.',
        cost: 24,
      },
      {
        name: 'Hyacinth',
        image: img('hyacinth.jpg'),
        description: 'Spring bulb with a rich, sweet fragrance.',
        cost: 22,
      },
    ],
  },
  {
    category: 'Low Maintenance & Medicinal Plants',
    icon: '🪴',
    blurb: 'Hardy and therapeutic houseplants for everyday wellness.',
    plants: [
      {
        name: 'ZZ Plant',
        image: img('zz.jpg'),
        description: 'Thrives in low light and requires minimal watering.',
        cost: 25,
      },
      {
        name: 'Golden Pothos',
        image: img('pothos.jpg'),
        description: 'Tolerates neglect and can grow in various conditions.',
        cost: 10,
      },
      {
        name: 'Cast Iron Plant',
        image: img('castiron.jpg'),
        description: 'Hardy plant that tolerates low light and neglect.',
        cost: 20,
      },
      {
        name: 'Succulent Garden',
        image: img('succulents.jpg'),
        description: 'Drought-tolerant plants with unique shapes and colors.',
        cost: 18,
      },
      {
        name: 'Aloe Vera',
        image: img('aloe_vera.jpg'),
        description: 'Soothing medicinal gel inside and requires little water.',
        cost: 14,
      },
      {
        name: 'Purple Coneflower',
        image: img('echinacea.jpg'),
        description: 'Traditional medicinal bloomer renowned for immune support.',
        cost: 16,
      },
    ],
  },
];

const categoryId = (category) => category.toLowerCase().replace(/\s+/g, '-');
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Shopping cart icon with a live badge showing the total number of items. */
function CartIcon({ count }) {
  return (
    <span className="cart-icon">
      <svg viewBox="0 0 256 256" width="34" height="34" aria-hidden="true">
        <rect width="156" height="156" fill="none"></rect>
        <circle cx="80" cy="216" r="12"></circle>
        <circle cx="184" cy="216" r="12"></circle>
        <path
          d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></path>
      </svg>
      <span key={count} className="cart-count" aria-live="polite">
        {count}
      </span>
    </span>
  );
}

/**
 * Product listing page. Includes the shared navbar (Home / Plants / Cart)
 * and switches to the shopping cart page when the cart is opened.
 */
function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  // Total number of plants in the cart (drives the cart icon badge).
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // A plant is "added" while it is in the cart; its button is disabled.
  const addedToCart = cartItems.reduce((acc, item) => {
    acc[item.name] = true;
    return acc;
  }, {});

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    window.scrollTo({ top: 0 });
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    setShowCart(false);
    window.scrollTo({ top: 0 });
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setToast(`${plant.name} added to your cart`);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2200);
  };

  return (
    <div className="product-page">
      {/* ---------- Navbar (shared by Product Listing and Cart pages) ---------- */}
      <header className="navbar">
        <a href="#" className="navbar__brand" onClick={handleHomeClick} id="nav-brand">
          <span className="navbar__logo" aria-hidden="true">
            🌿
          </span>
          <span className="navbar__brand-text">
            <span className="navbar__name">Paradise Nursery</span>
            <span className="navbar__tagline">Where Green Meets Serenity</span>
          </span>
        </a>

        <nav className="navbar__links" aria-label="Main navigation">
          <a href="#" id="nav-home" className="navbar__link" onClick={handleHomeClick}>
            Home
          </a>
          <a
            href="#"
            id="nav-plants"
            className={`navbar__link ${!showCart ? 'is-active' : ''}`}
            onClick={handlePlantsClick}
          >
            Plants
          </a>
          <a
            href="#"
            id="nav-cart"
            className={`navbar__link navbar__cart ${showCart ? 'is-active' : ''}`}
            onClick={handleCartClick}
            aria-label={`Cart with ${totalQuantity} items`}
          >
            <CartIcon count={totalQuantity} />
          </a>
        </nav>
      </header>

      {!showCart ? (
        <main className="product-grid" id="product-list">
          <section className="catalog-hero">
            <h1 className="catalog-hero__title">Our Plant Collection</h1>
            <p className="catalog-hero__text">
              Hand-picked houseplants, grown with care and delivered to your door.
            </p>
            <div className="category-chips">
              {plantsArray.map((group) => (
                <a
                  key={group.category}
                  href={`#${categoryId(group.category)}`}
                  className="category-chip"
                  id={`chip-${categoryId(group.category)}`}
                >
                  <span aria-hidden="true">{group.icon}</span> {group.category}
                </a>
              ))}
            </div>
          </section>

          {plantsArray.map((group) => (
            <section
              key={group.category}
              className="category-section"
              id={categoryId(group.category)}
            >
              <div className="category-header">
                <h2 className="category-title">
                  <span aria-hidden="true">{group.icon}</span> {group.category}
                </h2>
                <p className="category-blurb">{group.blurb}</p>
              </div>

              <div className="product-list">
                {group.plants.map((plant, index) => {
                  const isAdded = !!addedToCart[plant.name];
                  return (
                    <article
                      className="product-card"
                      key={plant.name}
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <div className="product-image-wrap">
                        <img
                          className="product-image"
                          src={plant.image}
                          alt={plant.name}
                          loading="lazy"
                        />
                        <span className="product-price">${plant.cost}</span>
                      </div>
                      <div className="product-body">
                        <h3 className="product-title">{plant.name}</h3>
                        <p className="product-description">{plant.description}</p>
                        <button
                          id={`add-to-cart-${slug(plant.name)}`}
                          className={`btn product-button ${isAdded ? 'added-to-cart' : 'btn-dark'}`}
                          onClick={() => handleAddToCart(plant)}
                          disabled={isAdded}
                        >
                          {isAdded ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}

      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  );
}

export default ProductList;
