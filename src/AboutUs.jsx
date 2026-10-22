import React from 'react';
import './AboutUs.css';

/** Short company story shown on the Paradise Nursery landing page. */
function AboutUs() {
  return (
    <div className="about-us-container about-us" id="about-us" aria-labelledby="about-us-heading">
      <h2 id="about-us-heading" className="about-us__title">
        About Paradise Nursery
      </h2>

      <p className="about-us__lead">
        Welcome to Paradise Nursery, where green meets serenity!
      </p>

      <p className="about-us__text">
        At Paradise Nursery, our mission is to provide high-quality houseplants—including
        air-purifying, aromatic, and medicinal selections—that effortlessly bring nature
        indoors. We believe that living among vibrant greenery promotes tranquility, wellness,
        and everyday serenity in your home or workplace.
      </p>

      <p className="about-us__text">
        Whether you are seeking low-maintenance succulents, soothing fragrant herbs, or lush
        air-filtering greenery, our curated collection is grown with utmost care and delivered
        straight to your doorstep.
      </p>

      <p className="about-us__text">
        Our team of experts is dedicated to ensuring that each plant meets our strict
        standards of quality and care. Whether you are a seasoned gardener or just
        starting your green journey, we are here to support you every step of the way.
        Feel free to explore our collection, ask questions, and let us help you find the
        perfect plant for your home or office.
      </p>

      <p className="about-us__text">
        Join us in our mission to create a greener, healthier world. Visit Paradise
        Nursery today and experience the beauty of nature right at your doorstep.
      </p>

      <ul className="about-us__stats" aria-label="Paradise Nursery highlights">
        <li>
          <strong>19+</strong>
          <span>Curated plants</span>
        </li>
        <li>
          <strong>3</strong>
          <span>Collections</span>
        </li>
        <li>
          <strong>100%</strong>
          <span>Healthy guarantee</span>
        </li>
      </ul>
    </div>
  );
}

export default AboutUs;
