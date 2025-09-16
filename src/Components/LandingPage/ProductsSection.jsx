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
            <h3> Twin | Scan </h3>
            <p>
              Capture real-world spaces with precision. Using advanced scanning 
              and photogrammetry, Twin | Scan generates accurate digital 
              twins—perfect for site analysis, renovation planning, and 
              seamless collaboration between stakeholders.
            </p>
          </div>
          <div className="product-card">
            <h3> Twin | Model </h3>
            <p>
              Transform ideas into intelligent 3D models. Twin | Model enables 
              customizable layouts, structural simulations, and sustainable 
              design solutions, making it easier to visualize and optimize 
              projects before construction even begins.
            </p>
          </div>
          <div className="product-card">
            <h3> Twin | Show </h3>
            <p>
              Bring projects to life with immersive presentations. Twin | Show 
              combines interactive walkthroughs, blueprint integration, and 
              real-time updates—ensuring clients and teams stay aligned at 
              every stage of development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
