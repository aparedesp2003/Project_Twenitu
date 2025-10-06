import React from 'react';
import './ProductsSection.css';

const ProductsSection = () => {
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        {/* Page header (kept) */}
        <h2 className="products-h2">Our Products</h2>
        <p className="products-intro">
          Twenitú designs and delivers high-quality, innovative products to elevate and transform any space.
        </p>

        {/* Split layout */}
        <div className="products-split">
          {/* LEFT: Digital products list */}
          <div className="products-col left">
            <h3 className="split-title">TWENITÚ DIGITAL<br />PRODUCTS</h3>

            <div className="product-pill">
              <div className="pill-title">Twin | Scan</div>
              <p className="pill-text">
                Capture real-world spaces with precision. Using advanced scanning
                and photogrammetry, Twin | Scan generates accurate digital
                twins—perfect for site analysis, renovation planning, and
                seamless collaboration between stakeholders.
              </p>
            </div>

            <div className="product-pill">
              <div className="pill-title">Twin | Model</div>
              <p className="pill-text">
                Transform ideas into intelligent 3D models. Twin | Model enables
                customizable layouts, structural simulations, and sustainable
                design solutions, making it easier to visualize and optimize
                projects before construction even begins.
              </p>
            </div>

            <div className="product-pill">
              <div className="pill-title">Twin | Show</div>
              <p className="pill-text">
                Bring projects to life with immersive presentations. Twin | Show
                combines interactive walkthroughs, blueprint integration, and
                real-time updates—ensuring clients and teams stay aligned at
                every stage of development.
              </p>
            </div>
          </div>

          {/* RIGHT: Large services panel (uses your existing intro text) */}
          <div className="products-col right">
            <h3 className="split-title">TWENITÚ BUILD<br />SERVICES</h3>

            <div className="services-panel">
              <p className="services-text">
                {/* Reuse of intro text to avoid adding new content */}
                Twenitú designs and delivers high-quality, innovative products to elevate and transform any space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
