import Homepage from "./HomePage";
import Events from "./Events";
import Blog from "./blog";
import Footer from "./Footer";
import Herosection from "./hero-section";
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Homepage />
      <Events />
      <Blog />
      <Herosection />
      <Footer />
    </main>
  );
}
