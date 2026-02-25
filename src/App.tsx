/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  AlertCircle, 
  Droplets, 
  Search, 
  Thermometer, 
  Wrench, 
  Hammer,
  ShieldCheck,
  Zap,
  Award,
  ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SERVICES } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IconMap: Record<string, React.ElementType> = {
  AlertCircle,
  Droplets,
  Search,
  Thermometer,
  Wrench,
  Hammer,
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        (isScrolled || isMenuOpen) ? "glass-header py-3" : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-accent p-2 rounded-lg">
              <Wrench className="text-white w-6 h-6" />
            </div>
            <span className={cn(
              "font-bold text-xl tracking-tight text-accent"
            )}>
              Nova Durham Plumbing
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'Why Us', 'About'].map((item) => {
              const id = item.toLowerCase().replace(' ', '-');
              return (
                <a 
                  key={item} 
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={cn(
                    "font-medium hover:text-accent transition-colors",
                    (isScrolled || isMenuOpen) ? "text-primary" : "text-white"
                  )}
                >
                  {item}
                </a>
              );
            })}
            <a href="tel:+19196555864" target="_top" className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
              <Phone size={16} />
              (919) 655-5864
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={cn("md:hidden p-2", (isScrolled || isMenuOpen) ? "text-primary" : "text-white")}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {['Services', 'Why Us', 'About'].map((item) => {
                  const id = item.toLowerCase().replace(' ', '-');
                  return (
                    <a 
                      key={item} 
                      href={`#${id}`}
                      className="text-accent font-bold py-2 border-b border-gray-50"
                      onClick={(e) => handleNavClick(e, id)}
                    >
                      {item}
                    </a>
                  );
                })}
                <a href="tel:+19196555864" target="_top" className="text-accent font-bold flex items-center justify-center gap-2 py-2">
                  <Phone size={18} />
                  Call Now: (919) 655-5864
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 pb-32 overflow-hidden bg-primary text-white">
        <div className="section-padding relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Reliable Plumbing Services in Durham, NC
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-2xl font-medium">
              Fast, affordable, and professional plumbing—available when you need it. From emergency repairs to full installations, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+19196555864" target="_top" className="btn-primary text-lg flex items-center justify-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 border-none">
                <Phone size={24} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-24">
        <div className="section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Professional Services</h2>
            <div className="w-24 h-1.5 bg-accent mx-auto mb-6"></div>
            <p className="text-primary/80 max-w-2xl mx-auto text-lg">
              We offer a comprehensive range of plumbing solutions for residential and commercial properties in Durham and the surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const Icon = IconMap[service.icon];
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-md card-hover border border-gray-100"
                >
                  <div className="bg-primary/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-primary/80 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <a href="tel:+19196555864" target="_top" className="text-accent font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      Call Now <ChevronRight size={18} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-24 overflow-hidden">
        <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Why Us?</h2>
            <div className="space-y-8">
              {[
                { 
                  icon: Clock, 
                  title: "Fast Response Times", 
                  desc: "We know plumbing emergencies can't wait. Our local team is strategically positioned to reach you quickly." 
                },
                { 
                  icon: ThumbsUp, 
                  title: "Transparent Pricing", 
                  desc: "No hidden fees or surprise charges. We provide clear, upfront estimates before any work begins." 
                },
                { 
                  icon: Award, 
                  title: "Experienced Technicians", 
                  desc: "Our plumbers are highly trained, licensed, and equipped with the latest tools to solve any issue." 
                },
                { 
                  icon: ShieldCheck, 
                  title: "Satisfaction Guarantee", 
                  desc: "We stand behind our work. If you're not happy, we'll make it right. Your peace of mind is our priority." 
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 bg-accent w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-accent/20">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-primary/80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-accent/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-accent/20"
          >
            <Wrench size={80} className="text-accent mb-6" />
            <h3 className="text-3xl font-bold mb-4">Expert Service</h3>
            <p className="text-primary/70 text-lg">Durham's most trusted plumbing professionals, ready to help 24/7.</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Locally Rooted in Durham</h2>
            <p className="text-2xl text-primary/80 mb-10 leading-relaxed">
              Nova Durham Plumbing Experts offers comprehensive solutions for all your plumbing needs. From routine maintenance to emergency repairs, our skilled professionals deliver reliable service with precision and care.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="text-4xl font-bold text-accent mb-2">15+</h4>
                <p className="text-primary/60 font-bold uppercase text-xs tracking-widest">Years Experience</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="text-4xl font-bold text-accent mb-2">24/7</h4>
                <p className="text-primary/60 font-bold uppercase text-xs tracking-widest">Emergency Support</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="text-4xl font-bold text-accent mb-2">100%</h4>
                <p className="text-primary/60 font-bold uppercase text-xs tracking-widest">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden bg-accent text-white">
        <div className="section-padding relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need a plumber now? We're ready to help.</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-medium opacity-90">
            Don't let a small leak turn into a big disaster. Our experts are standing by for all your plumbing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+19196555864" target="_top" className="bg-white text-accent hover:bg-gray-100 text-xl px-10 py-5 rounded-full font-bold transition-all flex items-center justify-center gap-3">
              <Phone size={28} />
              (919) 655-5864
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="section-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-accent p-2 rounded-lg">
                <Wrench className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-accent">
                Nova Durham Plumbing
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Nova Durham Plumbing Experts offers comprehensive solutions for all your plumbing needs. We are committed to providing the Durham community with exceptional plumbing services.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <ThumbsUp size={18} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {['Why Us', 'About'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-accent transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Our Services</h4>
            <ul className="space-y-4 text-gray-400">
              {SERVICES.slice(0, 5).map(service => (
                <li key={service.title}>
                  <a href="#services" className="hover:text-accent transition-colors">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Service Areas</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Durham, NC</li>
              <li>Chapel Hill, NC</li>
              <li>Raleigh, NC</li>
              <li>Cary, NC</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Nova Durham Plumbing Experts. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Call Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <a 
          href="tel:+19196555864" 
          target="_top"
          className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse"
        >
          <Phone size={32} />
        </a>
      </div>
    </div>
  );
}
