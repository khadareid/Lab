import { Check } from 'lucide-react';

const features = [
  "Lorem ipsum dolor sit amet",
  "Dolor sit amet consectetur",
  "Amet consectetur adipiscing",
];

export function EmployeeDevelopment() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-10">
            <img
              src="https://img.freepik.com/premium-photo/woman-learn-teach-tutor-concept-education-helping-each-other-sitting-table-class-room_1423-3503.jpg?semt=ais_hybrid"
              alt="Team meeting"
              className="w-56 h-28 rounded-lg object-cover"
            />
          <div className="text-center md:text-left">
            <span className="text-sm uppercase tracking-wider text-[#2B9B6C] mb-2 block">
              DEVELOPMENT DISCUSSION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold max-w-2xl leading-tight">
              Nurture And Develop Your Employees To Drive Organizational Success
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
             
            <h3 className="text-lg font-semibold">Good Team Search</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>

          {/* Middle Column */}
          <div className="bg-[#2B9B6C] rounded-lg p-8 text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Our Key Features</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20qqZf8gAP8ZyHzlku7gDTqNzIbmFAo3moQGy3aUoWw-IN6SBXye3AJdAx8Sp7HB_GsY&usqp=CAU"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <button
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                aria-label="Play Video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-8 h-8 text-[#2B9B6C]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-5.197-3.043A1 1 0 008 9.045v5.91a1 1 0 001.555.832l5.197-3.043a1 1 0 000-1.664z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeDevelopment;

