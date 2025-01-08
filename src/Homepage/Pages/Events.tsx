import { Play } from "lucide-react";

const events = [
  {
    title: "Recruitment Events",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: "https://via.placeholder.com/400x300",
  },
  {
    title: "Development Talents",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: "https://via.placeholder.com/400x300",
  },
  {
    title: "Executive Search Process",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: "https://via.placeholder.com/400x300",
  },
  {
    title: "Leadership Events",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: "https://via.placeholder.com/400x300",
  },
];

function EventHighlights() {
  return (
    <section
      className="py-16 px-4"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #d7f3e3)",
      }}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-[#2B9B6C] mb-2 block">
            EVENT HIGHLIGHTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight">
            Energy And Excitement Of Our Past Events And Engagements
          </h2>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Reduced gap */}
          {events.map((event, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden group cursor-pointer shadow-md"
              style={{ height: "230px", width: "500px", margin: "0 auto" }} // Adjusted size
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://img.freepik.com/free-photo/people-working-while-respecting-social-distancing-restriction_23-2148961749.jpg?semt=ais_hybrid)`,
                }}
              ></div>

              {/* Green Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-500/50 to-transparen" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="relative z-10 text-white">
                  <h3 className="text-base font-semibold mb-1">{event.title}</h3>
                  <p className="text-white/80 text-xs">{event.description}</p>
                </div>
              </div>

              {/* Play Button */}
              <div className="absolute top-4 left-4">
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-md">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventHighlights;
