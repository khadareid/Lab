import { Button } from "@/components/ui/button";

 function Footer() {
  return (
    <footer className="bg-[#2B9B6C] text-white py-10 ">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div>
            <div className="flex items-center mb-4">
              {/* Logo Icon */}
              <div className="bg-white text-[#2B9B6C] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4H9m4 0h1m-2 0v-4m0 4h3m0-4v-4m0 4v4m1-5v-3m1 3v5m0 0v3m1-3v-5m0 0H9m0 4v-5m-1 5v-4"
                  />
                </svg>
              </div>
              <h3 className="ml-2 text-lg font-bold">Talento</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Homepage
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Our Services
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Our Pricing
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Contact Us
                </Button>
              </li>
            </ul>
          </div>

          {/* Our Services Section */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Acquisition and Recruitment
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Executive Search
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Performance Management
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  Learning and Development
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white hover:text-[#F4A261]">
                  HR Consulting
                </Button>
              </li>
            </ul>
          </div>

          {/* Address and Office Details Section */}
          <div>
            <h4 className="text-lg font-bold mb-4">Head Office Address</h4>
            <p className="text-sm mb-4">
              Luribung Hidup St 42B, East Java <br />
              Madiun City Block ABC 123
            </p>
            <p className="text-sm">
              <strong>Days Open:</strong> <br />
              Monday - Friday 08 AM - 10 PM
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© All Rights Reserved - Winstudio Elementor Kit</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button
              variant="link"
              className="text-white hover:text-[#F4A261]"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </Button>
            <Button
              variant="link"
              className="text-white hover:text-[#F4A261]"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </Button>
            <Button
              variant="link"
              className="text-white hover:text-[#F4A261]"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </Button>
            <Button
              variant="link"
              className="text-white hover:text-[#F4A261]"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
