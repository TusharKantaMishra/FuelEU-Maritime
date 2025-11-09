import { useState, useEffect } from 'react';
import { Filter, Check, Ship } from 'lucide-react';
import { routeApi } from '../../infrastructure/api/routeApi';
import type { Route } from '../../../core/domain/types';

export default function RoutesTab() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    vesselType: '',
    fuelType: '',
    year: '',
  });

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const data = await routeApi.getAll(
        filters.vesselType || filters.fuelType || filters.year
          ? {
              vesselType: filters.vesselType || undefined,
              fuelType: filters.fuelType || undefined,
              year: filters.year ? parseInt(filters.year) : undefined,
            }
          : undefined
      );
      setRoutes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load routes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSetBaseline = async (routeId: string) => {
    try {
      await routeApi.setBaseline(routeId);
      fetchRoutes(); // Refresh data
    } catch (err) {
      alert('Failed to set baseline');
      console.error(err);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchRoutes();
  };

  const clearFilters = () => {
    setFilters({ vesselType: '', fuelType: '', year: '' });
    setTimeout(fetchRoutes, 0);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl border-4 border-purple-300 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-xl shadow-indigo-500/70">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Maritime Routes</h2>
            <p className="mt-1 text-sm text-purple-700 font-semibold">
              View and manage all routes with comprehensive emissions data
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-xl border-4 border-pink-200 card-hover hover:border-pink-400 transition-all duration-200">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg shadow-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-black text-slate-900 text-xl">Filter Routes</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vessel Type
            </label>
            <input
              type="text"
              value={filters.vesselType}
              onChange={(e) => handleFilterChange('vesselType', e.target.value)}
              placeholder="e.g., Container"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <input
              type="text"
              value={filters.fuelType}
              onChange={(e) => handleFilterChange('fuelType', e.target.value)}
              placeholder="e.g., HFO"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="number"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              placeholder="e.g., 2024"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={applyFilters}
              className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-110 border-2 border-purple-400"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="px-5 py-3 bg-gradient-to-r from-slate-200 to-gray-200 text-slate-800 rounded-xl font-bold hover:from-slate-300 hover:to-gray-300 transition-all duration-200 shadow-lg border-2 border-slate-300"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-xl shadow-2xl border-4 border-indigo-200 overflow-hidden animate-slideIn">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading routes...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : routes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No routes found</div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="min-w-full divide-y divide-gray-200" style={{minWidth: '1000px'}}>
              <thead className="bg-gradient-to-r from-indigo-200 to-purple-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vessel Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fuel Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GHG Intensity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fuel (t)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance (km)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emissions (t)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Baseline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routes.map((route, index) => (
                  <tr key={route.id} className="hover:bg-purple-50 transition-colors duration-150 group" style={{ animationDelay: `${index * 50}ms` }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {route.routeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.vesselType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.fuelType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.ghgIntensity.toFixed(2)} gCO₂e/MJ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.fuelConsumption}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.distance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.totalEmissions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {route.isBaseline && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-black bg-gradient-to-r from-emerald-400 to-green-400 text-white border-2 border-emerald-500 shadow-xl">
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Baseline
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!route.isBaseline && (
                        <button
                          onClick={() => handleSetBaseline(route.routeId)}
                          className="inline-flex items-center px-4 py-2 text-sm font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-lg transition-all duration-200 border-2 border-indigo-400 hover:border-purple-400 shadow-lg hover:shadow-2xl transform hover:scale-110"
                        >
                          Set Baseline
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
