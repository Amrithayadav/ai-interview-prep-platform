import Navbar from "./landing/navbar/Navbar";
import Steps from "./landing/steps/Steps";
import BrandsBar from "./landing/brands/BrandsBar";
import TechBar from "./landing/tech/TechBar";
import Testimonial from "./landing/testimonial/Testimonial";
import CTA from "./landing/cta/CTA";
import Hero from "./landing/hero/Hero";

import "./style/Allinterviewprep.scss";
export default function LandingPage() {
  return (
    <div className="aip-root">
      <Navbar />
      <Hero />
      <BrandsBar />
      <Steps />
      <TechBar />
      <Testimonial />
      <CTA />
    </div>
  );
}