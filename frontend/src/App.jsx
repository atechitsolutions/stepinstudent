import {
  Routes,
  Route,
} from 'react-router-dom';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedAdminRoute from './admin/ProtectedAdminRoute';

import FloatingContact from './components/FloatingContact';
import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import IntroSection from './components/IntroSection';
import Services from './components/Services';
import RequirementSelector from './components/RequirementSelector';
import Solutions from './components/Solutions';
import TechnologyStack from './components/TechnologyStack';
import Projects from './components/Projects';
import WhyAtech from './components/WhyAtech';
import Process from './components/Process';
import BusinessCTA from './components/BusinessCTA';
import LeadForm from './components/LeadForm';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';


function Reveal({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.55,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}


function HomePage() {
  const [selectedServices, setSelectedServices] = useState([]);

  const continueToForm = (services) => {
    setSelectedServices(services);

    document
      .getElementById('contact')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />

      <main>
        <Hero />

        <TrustStrip />

        <Reveal>
          <IntroSection />
        </Reveal>

        <Reveal>
          <Services />
        </Reveal>

        <Reveal>
          <RequirementSelector
            onContinue={continueToForm}
          />
        </Reveal>

        <Reveal>
          <Solutions />
        </Reveal>

        <Reveal>
          <TechnologyStack />
        </Reveal>

        <Reveal>
          <Projects />
        </Reveal>

        <Reveal>
          <WhyAtech />
        </Reveal>

        <Reveal>
          <Process />
        </Reveal>

        <Reveal>
          <BusinessCTA />
        </Reveal>

        <LeadForm
          selectedServices={selectedServices}
        />

        <Reveal>
          <FAQ />
        </Reveal>

        <Reveal>
          <FinalCTA />
        </Reveal>
      </main>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </MotionConfig>
  );
}


export default function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* ADMIN LOGIN */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* PROTECTED ADMIN AREA */}
      <Route element={<ProtectedAdminRoute />}>
        <Route
          path="/admin/projects"
          element={<AdminDashboard />}
        />
      </Route>

    </Routes>
  );
}