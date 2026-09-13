import Header from './Header';
import HeroSection from './HeroSection';
import Resources from './Resources';
import Footer from './Footer';

const EmployerHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <Resources />
      </main>
      <Footer />
    </div>
  );
};

export default EmployerHome;