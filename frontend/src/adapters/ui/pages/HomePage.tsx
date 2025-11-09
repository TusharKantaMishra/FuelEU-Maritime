import { Ship, Anchor, TrendingDown, PiggyBank, Users, CheckCircle, ArrowRight, Scale, FileText } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
            <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl">
              <Anchor className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">FuelEU Maritime</h1>
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-purple-100 font-semibold">Compliance Management Platform</p>
            </div>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-medium mb-4 md:mb-6 leading-relaxed">
            Your comprehensive solution for EU Regulation 2023/1805 compliance tracking, 
            banking, and pooling mechanisms for maritime fuel emissions.
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="px-3 py-1.5 md:px-5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-bold border-2 border-white/40">
              EU Regulation 2023/1805
            </span>
            <span className="px-3 py-1.5 md:px-5 md:py-2 bg-emerald-500/30 backdrop-blur-sm rounded-full text-xs md:text-sm font-bold border-2 border-emerald-300">
              Target: 89.34 gCO₂e/MJ (2025)
            </span>
          </div>
        </div>
      </div>

      {/* What is FuelEU Maritime */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 border-2 md:border-4 border-indigo-100">
        <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
          <div className="p-1.5 md:p-2 bg-indigo-500 rounded-lg">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">What is FuelEU Maritime?</h2>
        </div>
        <div className="prose max-w-none text-gray-700 space-y-3 md:space-y-4">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <strong>FuelEU Maritime</strong> is an EU regulation (2023/1805) that establishes a framework to 
            increase the share of renewable and low-carbon fuels in the maritime sector and to stimulate 
            demand for such fuels.
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            The regulation sets <strong>maximum limits for the yearly average greenhouse gas (GHG) intensity</strong> 
            of the energy used on board ships. These limits become progressively stricter from 2025 onwards, 
            encouraging ship operators to adopt cleaner fuels and technologies.
          </p>
          <div className="bg-indigo-50 p-4 md:p-6 rounded-lg md:rounded-xl border-2 border-indigo-200">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-indigo-900 mb-2 md:mb-3">Key Target for 2025:</h3>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-600">89.3368</p>
              <p className="text-sm sm:text-base md:text-xl text-gray-600 font-semibold">gCO₂e/MJ Maximum Intensity</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 border-2 md:border-4 border-purple-200">
        <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-8">
          <div className="p-1.5 md:p-2 bg-purple-500 rounded-lg">
            <Scale className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">How the Platform Works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Compliance Balance Calculation */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-2 border-purple-200">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <TrendingDown className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">1. Compliance Balance (CB)</h3>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
              We calculate your compliance balance using the FuelEU formula:
            </p>
            <div className="bg-purple-100 p-3 md:p-4 rounded-lg font-mono text-xs md:text-sm border-2 border-purple-300">
              <p className="font-bold text-purple-900">CB = (Target - Actual) × Energy</p>
              <p className="text-xs md:text-sm text-purple-700 mt-2">
                Where:
                <br />• Target = 89.3368 gCO₂e/MJ (2025)
                <br />• Actual = Your ship's GHG intensity
                <br />• Energy = Fuel consumption × 41,000 MJ/t
              </p>
            </div>
            <div className="mt-3 md:mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <span className="text-xs md:text-sm font-semibold">Positive CB = Surplus (better than target)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-xs md:text-sm font-semibold">Negative CB = Deficit (must be offset)</span>
              </div>
            </div>
          </div>

          {/* Banking Mechanism */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-2 border-emerald-200">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <PiggyBank className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">2. Banking (Article 20)</h3>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
              <strong>Save your surplus</strong> for future use when you exceed compliance targets.
            </p>
            <div className="space-y-3">
              <div className="bg-emerald-50 p-2 md:p-3 rounded-lg border border-emerald-200">
                <p className="text-xs md:text-sm font-bold text-emerald-900 mb-1">✓ Bank Surplus</p>
                <p className="text-xs md:text-sm text-gray-600">
                  When CB &gt; 0, store it for up to 2 years for future deficits
                </p>
              </div>
              <div className="bg-blue-50 p-2 md:p-3 rounded-lg border border-blue-200">
                <p className="text-xs md:text-sm font-bold text-blue-900 mb-1">✓ Apply Banked</p>
                <p className="text-xs md:text-sm text-gray-600">
                  Use stored surplus to offset current year deficits
                </p>
              </div>
            </div>
            <div className="mt-3 md:mt-4 bg-yellow-50 p-2 md:p-3 rounded-lg border-2 border-yellow-200">
              <p className="text-xs md:text-sm font-bold text-yellow-900">
                ⚠️ Only positive CB can be banked. Time limit: 2 years.
              </p>
            </div>
          </div>

          {/* Pooling Mechanism */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-2 border-pink-200">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-pink-600" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">3. Pooling (Article 21)</h3>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
              <strong>Collaborate with other ships</strong> to share compliance balances.
            </p>
            <div className="space-y-3">
              <div className="bg-pink-50 p-2 md:p-3 rounded-lg border border-pink-200">
                <p className="text-xs md:text-sm font-bold text-pink-900 mb-1">✓ Create Pool</p>
                <p className="text-xs md:text-sm text-gray-600">
                  Form a group of ships to aggregate CB
                </p>
              </div>
              <div className="bg-purple-50 p-2 md:p-3 rounded-lg border border-purple-200">
                <p className="text-xs md:text-sm font-bold text-purple-900 mb-1">✓ Join Pool</p>
                <p className="text-xs md:text-sm text-gray-600">
                  Add your ship to an existing pool
                </p>
              </div>
              <div className="bg-indigo-50 p-2 md:p-3 rounded-lg border border-indigo-200">
                <p className="text-xs md:text-sm font-bold text-indigo-900 mb-1">✓ Share Balance</p>
                <p className="text-xs md:text-sm text-gray-600">
                  Pool members collectively meet targets
                </p>
              </div>
            </div>
          </div>

          {/* Routes Management */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-2 border-indigo-200">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <Ship className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">4. Routes & Comparison</h3>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
              Track and compare different routes to optimize emissions.
            </p>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start space-x-2 md:space-x-3">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">View All Routes</p>
                  <p className="text-xs md:text-sm text-gray-600">Filter by vessel type, fuel type, year</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 md:space-x-3">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">Set Baseline</p>
                  <p className="text-xs md:text-sm text-gray-600">Mark reference routes for comparison</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 md:space-x-3">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">Compare Performance</p>
                  <p className="text-xs md:text-sm text-gray-600">Analyze emissions across routes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 md:mb-6">Quick Start Guide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl md:text-2xl font-black">
              1
            </div>
            <h3 className="text-base md:text-lg font-bold">View Routes</h3>
            <p className="text-purple-100 text-xs md:text-sm">
              Navigate to Routes tab to see all maritime routes and their emissions data
            </p>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl md:text-2xl font-black">
              2
            </div>
            <h3 className="text-base md:text-lg font-bold">Check Compliance</h3>
            <p className="text-purple-100 text-xs md:text-sm">
              Use Compare tab to calculate compliance balance for any ship/year
            </p>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl md:text-2xl font-black">
              3
            </div>
            <h3 className="text-base md:text-lg font-bold">Manage Surplus</h3>
            <p className="text-purple-100 text-xs md:text-sm">
              Go to Banking tab to bank surplus or apply banked amounts to deficits
            </p>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl md:text-2xl font-black">
              4
            </div>
            <h3 className="text-base md:text-lg font-bold">Create Pools</h3>
            <p className="text-purple-100 text-xs md:text-sm">
              Visit Pooling tab to collaborate with other ships for shared compliance
            </p>
          </div>
        </div>
        <div className="mt-6 md:mt-8 flex items-center space-x-4">
          <button className="px-4 md:px-6 py-2 md:py-3 bg-white text-indigo-600 rounded-lg md:rounded-xl text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Get Started
            <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-200">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Real-time Calculations</h3>
          <p className="text-sm md:text-base text-gray-600">
            Instant compliance balance calculations using official FuelEU formulas
          </p>
        </div>
        <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-200">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Multi-year Tracking</h3>
          <p className="text-sm md:text-base text-gray-600">
            Track compliance across years with banking and pooling mechanisms
          </p>
        </div>
        <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-2 border-pink-200 hover:border-pink-400 transition-all duration-200">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Comprehensive Reports</h3>
          <p className="text-sm md:text-base text-gray-600">
            Detailed analysis and comparison tools for informed decision-making
          </p>
        </div>
      </div>
    </div>
  );
}
