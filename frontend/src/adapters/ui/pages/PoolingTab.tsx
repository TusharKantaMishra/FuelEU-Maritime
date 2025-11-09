import { useState } from 'react';
import { Users, Plus, Trash2, CheckCircle } from 'lucide-react';
import { poolApi } from '../../infrastructure/api/poolApi';

interface PoolMemberInput {
  shipId: string;
  cbBefore: number;
}

export default function PoolingTab() {
  const [year, setYear] = useState(2024);
  const [members, setMembers] = useState<PoolMemberInput[]>([
    { shipId: 'SHIP-001', cbBefore: -50000 },
    { shipId: 'SHIP-002', cbBefore: 80000 },
  ]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMember = () => {
    setMembers([...members, { shipId: '', cbBefore: 0 }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof PoolMemberInput, value: any) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const totalCB = members.reduce((sum, m) => sum + m.cbBefore, 0);
  const isValid = totalCB >= 0;

  const handleCreatePool = async () => {
    if (!isValid) {
      setError('Total compliance balance must be >= 0');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const pool = await poolApi.create({
        year,
        members: members.map((m) => ({ shipId: m.shipId, cbBefore: m.cbBefore })),
      });
      setResult(pool);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create pool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl border-4 border-pink-300 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-xl shadow-pink-500/70">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Pooling</h2>
            <p className="mt-1 text-sm text-pink-700 font-semibold">
              Manage ship pooling for shared compliance per FuelEU Article 21
            </p>
          </div>
        </div>
      </div>

      {/* Year Selection */}
      <div className="bg-white p-6 rounded-xl shadow-xl border-4 border-purple-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-48 px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
        />
      </div>

      {/* Pool Members */}
      <div className="bg-white p-6 rounded-xl shadow-xl border-4 border-pink-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pool Members</h3>
          </div>
          <button
            onClick={addMember}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 text-sm font-bold shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
              {/* Member Number Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-500 text-white">
                  Member {index + 1}
                </span>
              </div>
              
              {/* Mobile: Stacked, Desktop: 1 row */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                {/* Ship ID Input */}
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 md:hidden">
                    Ship ID
                  </label>
                  <input
                    type="text"
                    value={member.shipId}
                    onChange={(e) => updateMember(index, 'shipId', e.target.value)}
                    placeholder="Ship ID"
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium bg-white"
                  />
                </div>

                {/* CB Before Input */}
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 md:hidden">
                    CB Before (gCO₂eq)
                  </label>
                  <input
                    type="number"
                    value={member.cbBefore}
                    onChange={(e) => updateMember(index, 'cbBefore', parseFloat(e.target.value))}
                    placeholder="CB Before (gCO₂eq)"
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium bg-white"
                  />
                </div>

                {/* Delete Button */}
                <div className="flex items-end md:items-center">
                  <button
                    onClick={() => removeMember(index)}
                    className="w-full md:w-auto px-4 py-3 md:p-3 text-red-600 hover:bg-red-100 rounded-lg border-2 border-red-300 hover:border-red-400 transition-all duration-200 font-semibold text-sm md:text-base flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-red-300"
                    disabled={members.length <= 2}
                    title={members.length <= 2 ? "Minimum 2 members required" : "Remove member"}
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="md:hidden">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total CB Indicator */}
        <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-purple-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-700">Total Pool CB:</span>
            <span
              className={`text-2xl font-black ${
                totalCB >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {totalCB.toFixed(2)} gCO₂eq
            </span>
          </div>
          {!isValid && (
            <p className="mt-3 text-sm text-red-600 font-semibold">
              ⚠️ Total CB must be non-negative to create a valid pool
            </p>
          )}
        </div>

        {/* Create Pool Button */}
        <button
          onClick={handleCreatePool}
          disabled={!isValid || loading || members.length < 2}
          className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {loading ? 'Creating Pool...' : 'Create Pool'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl shadow-2xl border-4 border-emerald-300">
          <h4 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center space-x-2">
            <CheckCircle className="w-6 h-6" />
            <span>Pool Created Successfully</span>
          </h4>
          <div className="space-y-2 mb-6 bg-white p-4 rounded-lg border-2 border-emerald-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Pool ID:</span> {result.id}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Year:</span> {result.year}
            </p>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden" style={{minWidth: '600px'}}>
              <thead className="bg-gradient-to-r from-purple-200 to-pink-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Ship ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    CB Before
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    CB After
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.members.map((member: any, idx: number) => (
                  <tr key={idx} className="hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">
                      {member.shipId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-medium">
                      {member.cbBefore.toFixed(2)} gCO₂eq
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-medium">
                      {member.cbAfter.toFixed(2)} gCO₂eq
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`font-bold ${
                          member.cbAfter > member.cbBefore ? 'text-emerald-600' : 'text-gray-500'
                        }`}
                      >
                        {member.cbAfter > member.cbBefore ? '+' : ''}
                        {(member.cbAfter - member.cbBefore).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-200 rounded-xl p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>Pooling functionality</strong> allows multiple ships to collaborate and share their compliance balances according to FuelEU Article 21.
            This powerful feature is currently under development and will be available soon.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-indigo-200 shadow-sm">
              <p className="font-bold text-indigo-900 mb-2">✓ Create Pools</p>
              <p className="text-sm text-gray-600">Form compliance pools with other vessels</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200 shadow-sm">
              <p className="font-bold text-purple-900 mb-2">✓ Join Pools</p>
              <p className="text-sm text-gray-600">Participate in existing pools</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-pink-200 shadow-sm">
              <p className="font-bold text-pink-900 mb-2">✓ Share Balances</p>
              <p className="text-sm text-gray-600">Collectively meet compliance targets</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
