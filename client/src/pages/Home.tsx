import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import DoctorCard from "../components/DoctorCard";
import DoctorModal from "../components/DoctorModal";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";
import HospitalCard from "../components/HospitalCard";
import HospitalModal from "../components/HospitalModal";

interface Doctor {
  _id: string;
  name: string;
  age: number;
  specialization: string;
  experienceYears: number;
  qualifications: string[];
  availableDays: string[];
  timings: { day: string; from: string; to: string }[];
  isAvailable: boolean;
  profileImage?: string;
  hospitals: { name: string }[];
}

interface Hospital {
  _id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  phone: string;
  timetable: string;
  medicationsOffered: string[];
  doctors: { name: string }[];
  specialists: string[];
}

// Define types for feature items
interface Feature {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const year: number = new Date().getFullYear();

  {
    /*Doctor vala part*/
  }
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors/getAllDoctors")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Fetch error", err));
  }, []);

  {
    /*Hospital vala part*/
  }
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  useEffect(() => {
    fetch("http://localhost:5000/api/hospitals/getAllHospitals")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setHospitals(data))
      .catch((err) => console.error("Fetch error", err));
  }, []);

  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // Define features array with type
  const features: Feature[] = [
    {
      icon: "🔍",
      title: "Real-time Availability",
      desc: "Instantly see which doctors and hospitals are available now.",
      color: "text-teal-500",
    },
    {
      icon: "📍",
      title: "Smart Maps",
      desc: "Locate nearby facilities with interactive, user-friendly maps.",
      color: "text-teal-500",
    },
    {
      icon: "🧠",
      title: "AI-Powered Filters",
      desc: "Filter by specialization, distance, and verified reviews.",
      color: "text-teal-500",
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      desc: "Book appointments seamlessly with a single click.",
      color: "text-teal-500",
    },
    {
      icon: "📊",
      title: "Health Insights",
      desc: "Access analytics on hospital load and specialist trends.",
      color: "text-teal-500",
    },
    {
      icon: "🛡️",
      title: "Trusted Profiles",
      desc: "Only verified doctors and hospitals in your search results.",
      color: "text-teal-500",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Header */}
      <>
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Brand */}
              <div className="flex-shrink-0 flex items-center">
                <h1
                  className="text-2xl md:text-4xl font-bold text-blue-900 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  ChikitsaMap
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => navigate("/doctors")}
                  className="text-gray-700 hover:text-teal-500 font-medium transition-colors"
                >
                  Doctors
                </button>
                <button
                  onClick={() => navigate("/hospitals")}
                  className="text-gray-700 hover:text-teal-500 font-medium transition-colors"
                >
                  Hospitals
                </button>
                <button
                  onClick={() => navigate("/features")}
                  className="text-gray-700 hover:text-teal-500 font-medium transition-colors"
                >
                  Services
                </button>

                <div className="flex items-center space-x-1 ml-4">
                  <button
                    onClick={() => navigate("/user/auth")}
                    className="px-4 py-2.5 border border-teal-500 text-teal-600 rounded-l-3xl hover:bg-teal-200 transition-colors"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/user/auth?mode=register")}
                    className="px-3 py-2.5 bg-teal-500 text-white rounded-r-3xl hover:bg-teal-600 transition-colors shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-500 focus:outline-none"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={28} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Drawer */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: drawerOpen ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl"
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-blue-900">Menu</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-600 hover:text-teal-500" />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
              <button
                onClick={() => {
                  navigate("/doctors");
                  setDrawerOpen(false);
                }}
                className="w-full px-4 py-3 text-left rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                Doctors
              </button>
              <button
                onClick={() => {
                  navigate("/hospitals");
                  setDrawerOpen(false);
                }}
                className="w-full px-4 py-3 text-left rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                Hospitals
              </button>
              <button
                onClick={() => {
                  navigate("/features");
                  setDrawerOpen(false);
                }}
                className="w-full px-4 py-3 text-left rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                Services
              </button>
            </nav>

            {/* Drawer Footer (Auth buttons) */}
            <div className="px-6 py-4 border-t border-gray-200 space-y-3">
              <button
                onClick={() => {
                  navigate("/user/auth");
                  setDrawerOpen(false);
                }}
                className="w-full px-4 py-2 border border-teal-500 text-teal-500 rounded-full hover:bg-teal-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/user/auth?mode=register");
                  setDrawerOpen(false);
                }}
                className="w-full px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>

        {/* Overlay */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </>
      {/* Hero Section */}
      <section className="relative text-center py-32 px-6 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 tracking-tight"
          >
            Your Health, <span className="text-teal-500">Simplified</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed"
          >
            Discover trusted doctors and hospitals with real-time availability
            and AI-powered insights, all in one place.
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(45, 212, 191, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("doctors-section")}
            className="px-8 py-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition font-semibold"
            aria-label="Navigate to doctors section"
          >
            Find a Doctor
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-teal-100 opacity-20 blur-3xl rounded-full z-0"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white text-center">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-blue-900 tracking-tight cursor-pointer"
          onClick={() => scrollToSection("features")}
        >
          Why Choose ChikitsaMap?
        </motion.h3>
        <div
          id={"features"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6"
        >
          {features.map((feature: Feature, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-teal-500"
            >
              <h4 className={`text-4xl mb-4 ${feature.color}`}>
                {feature.icon}
              </h4>
              <h5 className="text-xl font-semibold mb-2 text-blue-900">
                {feature.title}
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors-section" className="py-20 bg-gray-50 px-6">
        <motion.h3
          initial={{ opacity: 0, y: 3 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-4xl font-bold text-center mb-12 text-blue-900 tracking-tight"
        >
          Know Doctors
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {doctors.slice(0, 3).map((doc) => (
            <DoctorCard
              key={doc._id}
              doctor={doc}
              onClick={() => setSelectedDoctor(doc)}
            />
          ))}
          {selectedDoctor && (
            <DoctorModal
              isOpen={selectedDoctor !== null}
              doctor={selectedDoctor}
              onClose={() => setSelectedDoctor(null)}
            />
          )}
          <div></div>
          <motion.div
            className="text-center mt-10 text-gray-700 text-base sm:text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-4 bg-white rounded-xl shadow-sm border border-teal-100 hover:shadow-md transtion duration-300">
              <FaInfoCircle className="text-teal-500 text-xl" />
              <span>
                Want to explore more ?{" "}
                <button
                  onClick={() => navigate("/doctors")}
                  className="text-teal-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Visit the Doctors Page
                  <FaArrowRight className="ml-1" />
                </button>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section id="hospitals-section" className="py-20 bg-gray-50 px-6">
        <motion.h3
          initial={{ opacity: 0, y: 3 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-4xl font-bold text-center mb-12 text-blue-900 tracking-tight"
        >
          Hospitals
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 max-w-7xl mx-auto">
          {hospitals.slice(0, 4).map((hosp) => (
            <HospitalCard
              key={hosp._id}
              hospital={hosp}
              onClick={() => setSelectedHospital(hosp)}
            />
          ))}
          {selectedHospital && (
            <HospitalModal
              isOpen={selectedHospital !== null}
              hospital={selectedHospital}
              onClose={() => setSelectedHospital(null)}
            />
          )}
           <div className="items-center">
          <motion.div
            className="text-center mt-10 text-gray-700 text-base sm:text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-4 bg-white rounded-xl shadow-sm border border-teal-100 hover:shadow-md transtion duration-300">
              <FaInfoCircle className="text-teal-500 text-xl" />
              <span>
                Want to explore more ?{" "}
                <button
                  onClick={() => navigate("/doctors")}
                  className="text-teal-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Visit the Doctors Page
                  <FaArrowRight className="ml-1" />
                </button>
              </span>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">ChikitsaMap</h2>
            <p className="text-gray-400 text-sm mb-4">
              Connecting you to trusted healthcare solutions across India.
            </p>
            <a
              href="/support"
              className="text-teal-400 hover:text-teal-300 transition text-sm"
              aria-label="Contact support"
            >
              Contact Support →
            </a>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-teal-400 transition"
                  aria-label="About us"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-teal-400 transition"
                  aria-label="Services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/partners"
                  className="hover:text-teal-400 transition"
                  aria-label="Partners"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-teal-400 transition"
                  aria-label="Contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-teal-400 transition"
                  aria-label="Privacy policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-teal-400 transition"
                  aria-label="Terms of service"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-teal-400 transition"
                  aria-label="Help and FAQ"
                >
                  Help & FAQ
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-teal-400 transition"
                  aria-label="Blog"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                e.preventDefault()
              }
              className="space-y-3"
              aria-label="Newsletter Subscription"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-full font-medium text-sm transition"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-400 text-xs mt-3">
              Get occasional updates, no spam.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 px-6 py-6 text-center text-xs text-gray-400">
          <span>
            © {year}{" "}
            <span className="text-white font-semibold">ChikitsaMap</span>. All
            rights reserved.
          </span>
          <span className="block sm:inline sm:ml-4">
            Crafted for India’s healthcare future.
          </span>
          <span className="block sm:inline sm:ml-4">
            <a
              href="/live-chat"
              className="text-teal-400 hover:text-teal-300 transition"
              aria-label="Live chat support"
            >
              Live Chat Support
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
