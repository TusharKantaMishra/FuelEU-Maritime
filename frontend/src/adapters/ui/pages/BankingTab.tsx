import { useState } from 'react';
import { PiggyBank, PlusCircle, MinusCircle, DollarSign, CheckCircle } from 'lucide-react';
import { bankingApi } from '../../infrastructure/api/bankingApi';
import { complianceApi } from '../../infrastructure/api/complianceApi';

export default function BankingTab() {
  const [shipId, setShipId] = useState('SHIP-002'); // Start with a surplus ship
  const [year, setYear] = useState(2024);
  const [cb, setCb] = useState<number | null>(null);
  const [bankAmount, setBankAmount] = useState('');
  const [applyAmount, setApplyAmount] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCB = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await complianceApi.getCB(shipId, year);
      setCb(data.cbGco2eq);
    } catch (err) {
      setError('Failed to fetch compliance balance');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBank = async () => {
    try {
      setLoading(true);
      setError(null);
      await bankingApi.bank(shipId, year, parseFloat(bankAmount));
      setResult({ action: 'bank', message: 'Successfully banked surplus' });
      setBankAmount('');
      fetchCB();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to bank surplus');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bankingApi.apply(shipId, year, parseFloat(applyAmount));
      setResult(data);
      setApplyAmount('');
      fetchCB();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to apply banked surplus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-6 rounded-xl border-4 border-emerald-300 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-xl shadow-emerald-500/70">
            <PiggyBank className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Banking</h2>
            <p className="mt-1 text-sm text-emerald-700 font-semibold">
              Manage compliance balance banking per FuelEU Article 20
            </p>
          </div>
        </div>
      </div>

      {/* Ship Selection */}
      <div className="bg-white p-6 rounded-xl shadow-xl border-4 border-purple-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ship ID
            </label>
            <select
              value={shipId}
              onChange={(e) => setShipId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
            >
              <option value="SHIP-001">SHIP-001 (Deficit)</option>
              <option value="SHIP-002">SHIP-002 (Surplus) ⭐</option>
              <option value="SHIP-003">SHIP-003 (Deficit)</option>
              <option value="SHIP-004">SHIP-004 (Surplus) ⭐</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchCB}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Fetch CB
            </button>
          </div>
        </div>
      </div>

      {/* Current CB Display */}
      {cb !== null && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-2xl border-4 border-indigo-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Compliance Balance</p>
              <p className={`text-2xl font-bold ${cb >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {cb.toFixed(2)} gCO₂eq
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {cb > 0 ? '✅ Surplus - Available to bank for future use' : '❌ Deficit - Must be offset, cannot bank'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Banking Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bank Surplus */}
        <div className="bg-white p-6 rounded-xl shadow-xl border-4 border-emerald-200 card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Bank Surplus</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Bank positive compliance balance for future use
          </p>
          <div className="space-y-3">
            <input
              type="number"
              value={bankAmount}
              onChange={(e) => setBankAmount(e.target.value)}
              placeholder="Amount (gCO₂eq)"
              className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
            />
            <button
              onClick={handleBank}
              disabled={!cb || cb <= 0 || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
            >
              Bank Surplus
            </button>
          </div>
        </div>

        {/* Apply Banked */}
        <div className="bg-white p-6 rounded-xl shadow-xl border-4 border-pink-200 card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
              <MinusCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Apply Banked</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Apply previously banked surplus to offset deficit
          </p>
          <div className="space-y-3">
            <input
              type="number"
              value={applyAmount}
              onChange={(e) => setApplyAmount(e.target.value)}
              placeholder="Amount (gCO₂eq)"
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-medium"
            />
            <button
              onClick={handleApply}
              disabled={!cb || loading}
              className="w-full px-5 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl hover:from-pink-700 hover:to-rose-700 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
            >
              Apply Banked
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl p-6 shadow-lg">
          <h4 className="font-bold text-emerald-900 mb-3 text-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Operation Successful</span>
          </h4>
          {result.cbBefore !== undefined && (
            <div className="text-sm text-emerald-800 space-y-2 font-medium">
              <p>CB Before: <span className="font-bold">{result.cbBefore.toFixed(2)} gCO₂eq</span></p>
              <p>Applied: <span className="font-bold">{result.applied.toFixed(2)} gCO₂eq</span></p>
              <p>CB After: <span className="font-bold">{result.cbAfter.toFixed(2)} gCO₂eq</span></p>
            </div>
          )}
          {result.message && <p className="text-sm text-emerald-800 font-medium">{result.message}</p>}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 rounded-xl p-6 shadow-lg">
          <p className="text-sm text-red-800 font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}
