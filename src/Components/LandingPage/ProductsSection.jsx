import React from 'react';
import './ProductsSection.css';

const ProductsSection = () => {
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        <h2>Our Products</h2>
        <p className="products-intro">
          Twenitú designs and delivers high-quality, innovative products to elevate and transform any space.
        </p>
        <div className="products-grid">
          <div className="product-card">
            <h3>Smart Design Suite</h3>
            <p>All-in-one digital toolkit for space visualization, including 3D renderings, layout simulations, and material previews.</p>
          </div>
          <div className="product-card">
            <h3>Modular Build Kits</h3>
            <p>Customizable construction modules tailored for fast, efficient, and sustainable building solutions.</p>
          </div>
          <div className="product-card">
            <h3>Interactive Client Portal</h3>
            <p>A streamlined platform for tracking project progress, accessing blueprints, and direct communication with our team.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
