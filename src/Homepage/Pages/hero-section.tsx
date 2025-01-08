import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FA]">
      <div className=" mx-auto px-4  bg-cover"
      
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/young-businessman-working-laptop-office_1303-15812.jpg')",
      }}
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
          {/* Left Column - Text Content */}
            {/* Decorative Plant Image */}
            {/* <div className="absolute -left-16 -top-16 w-32 h-32 opacity-10">
              <img
                src="https://img.freepik.com/free-photo/plant-leaf-background_53876-104161.jpg"
                alt="Decorative plant"
                className="w-full h-full object-cover rounded-full"
              />
            </div> */}

            {/* Content Card */}
            <div className="bg-white rounded-2xl p-8 ml-80 -mt-60 shadow-md relative z-20 ">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Start Your Journey To Talent Excellence
              </h1>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
              <Button className="bg-[#F4A261] hover:bg-[#F4A261]/90 text-white rounded-full px-6">
                Get A Quote
              </Button>
          </div>

          {/* Right Column - Background Image */}
          <div
            className=""
         
          >
          
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
