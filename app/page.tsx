import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import FourPillars from './components/FourPillars';
import Statistics from './components/Statistics';
import HowItWorks from './components/HowItWorks';
import Technology from './components/Technology';
import WhyWeWin from './components/WhyWeWin';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F1]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FourPillars />
      <Statistics />
      <HowItWorks />
      <Technology />
      <WhyWeWin />
      <CTASection />
      <Footer />
    </main>
  );
}
