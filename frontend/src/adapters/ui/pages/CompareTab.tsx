import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, GitCompare } from 'lucide-react';
import { RouteComparison, TARGET_INTENSITY_2025 } from '../../../core/domain/types';
import { routeApi } from '../../infrastructure/api/routeApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CompareTab() {
  const [comparisons, setComparisons] = useState<RouteComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    try {
      setLoading(true);
      const data = await routeApi.getComparison();
      setComparisons(data);
      setError(null);
    } catch (err) {
      setError('Failed to load comparisons. Ensure a baseline route is set.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = comparisons.map((comp) => ({
    routeId: comp.comparison.routeId,
    baseline: comp.baseline.ghgIntensity,
    comparison: comp.comparison.ghgIntensity,
    target: TARGET_INTENSITY_2025,
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-4 border-pink-300 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-xl shadow-purple-500/70">
            <GitCompare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Compare Routes</h2>
            <p className="mt-1 text-sm text-purple-700 font-semibold">
              Compare route emissions against baseline (Target: {TARGET_INTENSITY_2025.toFixed(4)} gCO₂e/MJ)
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-indigo-200 text-center text-gray-500">
          Loading comparisons...
        </div>
      ) : error ? (
        <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-red-200 text-center text-red-500">
          {error}
        </div>
      ) : comparisons.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-indigo-200 text-center text-gray-500">
          No comparison data available. Set a baseline route first.
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="bg-white p-6 rounded-xl shadow-2xl border-4 border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <span>GHG Intensity Comparison</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="routeId" />
                <YAxis label={{ value: 'gCO₂e/MJ', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="baseline" fill="#a78bfa" name="Baseline" />
                <Bar dataKey="comparison" fill="#ec4899" name="Route" />
                <Bar dataKey="target" fill="#10b981" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-2xl border-4 border-indigo-200 overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full table-fixed divide-y divide-gray-200" style={{minWidth: '800px'}}>
                <thead className="bg-gradient-to-r from-purple-200 to-pink-200">
                  <tr>
                    <th className="w-1/5 px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Route ID
                    </th>
                    <th className="w-1/5 px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Baseline Intensity
                    </th>
                    <th className="w-1/5 px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Route Intensity
                    </th>
                    <th className="w-1/5 px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Difference (%)
                    </th>
                    <th className="w-1/5 px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Compliant
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisons.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-purple-50 transition-colors duration-150">
                      <td className="w-1/5 px-6 py-4 text-sm font-bold text-gray-900">
                        {comp.comparison.routeId}
                      </td>
                      <td className="w-1/5 px-6 py-4 text-sm font-medium text-gray-700">
                        {comp.baseline.ghgIntensity.toFixed(2)} gCO₂e/MJ
                      </td>
                      <td className="w-1/5 px-6 py-4 text-sm font-medium text-gray-700">
                        {comp.comparison.ghgIntensity.toFixed(2)} gCO₂e/MJ
                      </td>
                      <td className="w-1/5 px-6 py-4 text-sm">
                        <span
                          className={`font-bold text-base ${
                            comp.percentDiff < 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {comp.percentDiff > 0 ? '+' : ''}
                          {comp.percentDiff.toFixed(2)}%
                        </span>
                      </td>
                      <td className="w-1/5 px-6 py-4 text-center">
                        {comp.compliant ? (
                          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-black bg-gradient-to-r from-emerald-400 to-green-400 text-white border-2 border-emerald-500 shadow-lg">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Compliant
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-black bg-gradient-to-r from-red-400 to-rose-400 text-white border-2 border-red-500 shadow-lg">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Non-Compliant
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
