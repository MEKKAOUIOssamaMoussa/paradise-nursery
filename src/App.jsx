import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

/**
 * Root component. Shows the Paradise Nursery landing page until the user
 * clicks "Get Started", then switches to the product listing page.
 */
function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    window.scrollTo({ top: 0 });
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <main className="landing-page">
          <div className="background-image" aria-hidden="true"></div>

          <div className="landing-content">
            <div className="landing-hero">
              <span className="landing-eyebrow">🌿 Houseplants delivered with love</span>
              <h1 className="landing-title">
                Welcome to <span>Paradise Nursery</span>
              </h1>
              <div className="landing-divider" aria-hidden="true"></div>
              <p className="landing-tagline">Where Green Meets Serenity</p>

              <button
                id="get-started-button"
                className="btn btn-primary get-started-button"
                onClick={handleGetStartedClick}
              >
                Get Started
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="aboutus-container">
              <AboutUs />
            </div>
          </div>
        </main>
      ) : (
        <div className="product-list-container">
          <ProductList onHomeClick={handleHomeClick} />
        </div>
      )}
    </div>
  );
}

export default App;
