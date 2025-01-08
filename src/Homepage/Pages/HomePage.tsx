import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div
      className="relative h-[72vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/pair-professional-women-converse-project-specifics-their-desks-varied-female-coworkers_912524-19320.jpg')",
      }}
    >
      {/* Half Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-500/50 to-transparent"></div>

      {/* Content */}
      <div className="container relative z-10 text-white p-40">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
          <Link to="/" className="hover:text-white">HOME</Link>
          <span className="text-white/60">›</span>
          <span>OUR GALLERY</span>
        </div>
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Exploring & Discover
          <br />
          Our Business
        </h1>
      </div>
    </div>
  );
}

export default HeroSection;
