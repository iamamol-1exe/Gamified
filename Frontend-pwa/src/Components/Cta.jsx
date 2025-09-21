import React from "react";
import { Link } from "react-router-dom";

const CTA = () => (
  <section className="text-center pb-20">
    <div className="container mx-auto px-6">
      <Link to="/userpage" className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg">
        Get Started
      </Link>
    </div>
  </section>
);

export default CTA;
