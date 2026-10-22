import React from 'react';
import './AboutUs.css';

/** Short company story shown on the Paradise Nursery landing page. */
function AboutUs() {
  return (
    <section className="about-us" id="about-us" aria-labelledby="about-us-heading">
      <h2 id="about-us-heading" className="about-us__title">
        About Paradise Nursery
      </h2>

      <p className="about-us__lead">
        Welcome to Paradise Nursery, where green meets serenity!
      </p>

      <p className="about-us__text">
        At Paradise Nursery, we are passionate about bringing nature closer to you. Our
        mission is to provide a wide range of high-quality houseplants that not only
        enhance the beauty of your surroundings but also contribute to a healthier and
        more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones,
        we have something for every plant enthusiast.
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
    </section>
  );
}

export default AboutUs;
