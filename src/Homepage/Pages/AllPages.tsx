import Homepage from "./HomePage";
import Events from "./Events";
import Blog from "./blog";
import Footer from "./Footer";
import Herosection from "./hero-section";
import SiteHeader from "./Nav";
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader/>
      <Homepage />
      <Events />
      <Blog />
      <Herosection />
      <Footer />
    </main>
  );
}
