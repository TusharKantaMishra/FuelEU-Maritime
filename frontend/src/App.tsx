import { useState } from 'react';
import { Ship, GitCompare, PiggyBank, Users, Anchor, Home, Mail, Phone, Github } from 'lucide-react';
import HomePage from './adapters/ui/pages/HomePage';
import RoutesTab from './adapters/ui/pages/RoutesTab';
import CompareTab from './adapters/ui/pages/CompareTab';
import BankingTab from './adapters/ui/pages/BankingTab';
import PoolingTab from './adapters/ui/pages/PoolingTab';

type TabId = 'home' | 'routes' | 'compare' | 'banking' | 'pooling';

interface Tab {
  id: TabId;
  label: string;
  icon: any;
  component: () => JSX.Element;
}

const tabs: Tab[] = [
  { id: 'home', label: 'Home', icon: Home, component: HomePage },
  { id: 'routes', label: 'Routes', icon: Ship, component: RoutesTab },
  { id: 'compare', label: 'Compare', icon: GitCompare, component: CompareTab },
  { id: 'banking', label: 'Banking', icon: PiggyBank, component: BankingTab },
  { id: 'pooling', label: 'Pooling', icon: Users, component: PoolingTab },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || RoutesTab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header with Glassmorphism - Combined with Navigation on Desktop */}
      <header className="sticky top-0 z-50">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-purple-900/40 backdrop-blur-xl border-b border-purple-400/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Single Row Layout */}
          <div className="hidden lg:flex items-center justify-between py-4">
            {/* Left: Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-pink-400 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity animate-pulse"></div>
                <div className="relative p-2 bg-purple-600/30 backdrop-blur-sm rounded-xl border border-purple-400/50 shadow-lg">
                  <Anchor className="w-8 h-8 text-pink-300" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white drop-shadow-lg">
                  FuelEU Maritime
                </h1>
                <p className="text-xs text-gray-100 font-semibold">EU Regulation 2023/1805 • Compliance Dashboard</p>
              </div>
            </div>

            {/* Center: Navigation Tabs */}
            <nav className="flex space-x-1" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm
                      transition-all duration-200 ease-in-out transform
                      ${
                        isActive
                          ? 'bg-purple-500/40 backdrop-blur-md text-white border border-pink-400/50 shadow-lg shadow-pink-500/30 scale-105'
                          : 'text-gray-100 hover:text-white hover:bg-purple-500/20 backdrop-blur-sm border border-transparent hover:border-purple-400/30'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Target Badge */}
            <div className="flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-400/50 shadow-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400"></div>
              <span className="text-xs font-bold text-white">Target: 89.34 gCO₂e/MJ</span>
            </div>
          </div>

          {/* Mobile & Tablet: Two Row Layout */}
          <div className="lg:hidden">
            {/* Row 1: Brand and Target */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-400 rounded-lg blur-md opacity-50 animate-pulse"></div>
                  <div className="relative p-2 bg-purple-600/30 backdrop-blur-sm rounded-lg border border-purple-400/50">
                    <Anchor className="w-7 h-7 text-pink-300" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-black text-white drop-shadow-lg">
                    FuelEU Maritime
                  </h1>
                  <p className="text-xs text-gray-100">EU Regulation 2023/1805</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/50">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-white">89.34</span>
              </div>
            </div>

            {/* Row 2: Navigation Tabs */}
            <nav className="flex space-x-1 overflow-x-auto scrollbar-hide pb-3" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap
                      transition-all duration-200 ease-in-out
                      ${
                        isActive
                          ? 'bg-purple-500/40 backdrop-blur-md text-white border border-pink-400/50 shadow-lg'
                          : 'text-gray-100 hover:text-white hover:bg-purple-500/20 backdrop-blur-sm border border-transparent'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : ''}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <ActiveComponent />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white mt-20 border-t-4 border-pink-400 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-xl shadow-pink-500/70">
                  <Anchor className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    FuelEU Maritime
                  </h3>
                  <p className="text-xs text-gray-400">Compliance Platform</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Comprehensive EU maritime fuel compliance management system implementing 
                Regulation 2023/1805 standards.
              </p>
            </div>

            {/* Compliance Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-pink-300 uppercase tracking-wider flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
                <span>Compliance Standards</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-md shadow-indigo-400"></div>
                  <span>EU Regulation 2023/1805</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-md shadow-emerald-400"></div>
                  <span>Article 20 - Banking Mechanism</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full shadow-md shadow-purple-400"></div>
                  <span>Article 21 - Pooling Mechanism</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full shadow-md shadow-pink-400"></div>
                  <span>Target: 89.3368 gCO₂e/MJ (2025)</span>
                </li>
              </ul>
            </div>

            {/* Important Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
                <span>Important Links</span>
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://eur-lex.europa.eu/eli/reg/2023/1805/oj" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-300 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span>→</span>
                    <span className="group-hover:underline">EU Regulation 2023/1805</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ec.europa.eu/clima/eu-action/transport/reducing-emissions-shipping-sector_en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-300 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span>→</span>
                    <span className="group-hover:underline">EU Climate Action</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.imo.org/en/OurWork/Environment/Pages/GHG-Emissions.aspx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-300 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span>→</span>
                    <span className="group-hover:underline">IMO GHG Strategy</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/TusharKantaMishra" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span>→</span>
                    <span className="group-hover:underline">GitHub Repository</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Developer Contact - Second Row */}
          <div className="mb-8 pt-8 border-t border-gray-700">
            <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-2 mb-6">
              <div className="w-6 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
              <span>Developer Contact</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Developer Name */}
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/10 backdrop-blur-sm rounded-lg p-4 border-2 border-pink-400/40 hover:border-pink-400 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/30">
                <p className="text-base font-bold text-white mb-1">Tushar Kanta Mishra</p>
                <p className="text-xs text-gray-400">Full Stack Developer</p>
              </div>

              {/* Email */}
              <a 
                href="mailto:tusharmishra262004@gmail.com"
                className="flex items-center space-x-3 bg-gradient-to-br from-pink-500/20 to-purple-500/10 backdrop-blur-sm rounded-lg p-3 border-2 border-pink-400/40 hover:border-pink-400 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/30 group"
              >
                <div className="p-2 bg-pink-500/30 rounded-lg group-hover:bg-pink-500/50 transition-all">
                  <Mail className="w-4 h-4 text-pink-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-white truncate">tusharmishra262004@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="tel:+918117054773"
                className="flex items-center space-x-3 bg-gradient-to-br from-pink-500/20 to-purple-500/10 backdrop-blur-sm rounded-lg p-3 border-2 border-pink-400/40 hover:border-pink-400 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/30 group"
              >
                <div className="p-2 bg-purple-500/30 rounded-lg group-hover:bg-purple-500/50 transition-all">
                  <Phone className="w-4 h-4 text-purple-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-white">+91 8117054773</p>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/TusharKantaMishra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-gradient-to-br from-pink-500/20 to-purple-500/10 backdrop-blur-sm rounded-lg p-3 border-2 border-pink-400/40 hover:border-pink-400 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/30 group"
              >
                <div className="p-2 bg-indigo-500/30 rounded-lg group-hover:bg-indigo-500/50 transition-all">
                  <Github className="w-4 h-4 text-indigo-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">GitHub</p>
                  <p className="text-sm font-medium text-white truncate">TusharKantaMishra</p>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400"></div>
                  <span>System Active</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span>2024 © FuelEU Maritime</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-xs">Developed by <span className="font-bold text-pink-300">Tushar Kanta Mishra</span></span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 px-4 py-2 rounded-full border-2 border-pink-400 backdrop-blur-sm hover:border-pink-300 transition-all duration-200 shadow-lg shadow-pink-500/30">
                  <span className="text-xs text-gray-400">Powered by</span>
                  <span className="text-xs font-bold text-white">
                    Varuna Marines
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Line */}
        <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 shadow-xl shadow-pink-500/60"></div>
      </footer>
    </div>
  );
}

export default App;
