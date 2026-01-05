import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, TrendingUp, Database, BarChart3, Layers, Lightbulb } from 'lucide-react';

const NYPDDashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');

  const boroughData = [
    { borough: 'Brooklyn', count: 24 },
    { borough: 'Manhattan', count: 28 },
    { borough: 'Queens', count: 18 },
    { borough: 'Bronx', count: 16 },
    { borough: 'Staten Island', count: 8 }
  ];

  const boroughShareData = [
    { borough: 'Brooklyn', value: 24, color: '#3b82f6' },
    { borough: 'Manhattan', value: 28, color: '#ef4444' },
    { borough: 'Queens', value: 18, color: '#f59e0b' },
    { borough: 'Bronx', value: 16, color: '#8b5cf6' },
    { borough: 'Staten Island', value: 8, color: '#6b7280' }
  ];

  const offenseTypeData = [
    { offense: 'Homicide-Negligent, Unclassified', count: 35 },
    { offense: 'Homicide-Negligent-Vehicle', count: 32 },
    { offense: 'Dangerous Drugs', count: 27 }
  ];

  const heatmapData = [
    { borough: 'Brooklyn', offense: 'Homicide-Negligent', count: 8 },
    { borough: 'Manhattan', offense: 'Homicide-Negligent', count: 10 },
    { borough: 'Queens', offense: 'Homicide-Negligent', count: 7 },
    { borough: 'Bronx', offense: 'Homicide-Negligent', count: 6 },
    { borough: 'Staten Island', offense: 'Homicide-Negligent', count: 4 },
    { borough: 'Brooklyn', offense: 'Vehicle-Related', count: 9 },
    { borough: 'Manhattan', offense: 'Vehicle-Related', count: 10 },
    { borough: 'Queens', offense: 'Vehicle-Related', count: 6 },
    { borough: 'Bronx', offense: 'Vehicle-Related', count: 5 },
    { borough: 'Staten Island', offense: 'Vehicle-Related', count: 2 },
    { borough: 'Brooklyn', offense: 'Dangerous Drugs', count: 7 },
    { borough: 'Manhattan', offense: 'Dangerous Drugs', count: 8 },
    { borough: 'Queens', offense: 'Dangerous Drugs', count: 5 },
    { borough: 'Bronx', offense: 'Dangerous Drugs', count: 5 },
    { borough: 'Staten Island', offense: 'Dangerous Drugs', count: 2 }
  ];

  const sections = [
    { id: 'summary', label: 'Executive Summary', icon: TrendingUp },
    { id: 'dataset', label: 'Dataset Overview', icon: Database },
    { id: 'frequency', label: 'Borough Frequency', icon: BarChart3 },
    { id: 'composition', label: 'Composition Analysis', icon: Layers },
    { id: 'statistics', label: 'Statistical Context', icon: AlertCircle },
    { id: 'implications', label: 'Strategic Implications', icon: Lightbulb }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{payload[0].payload.borough || payload[0].payload.offense}</p>
          <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const getHeatmapColor = (count) => {
    if (count >= 9) return '#dc2626';
    if (count >= 7) return '#f59e0b';
    if (count >= 5) return '#fbbf24';
    return '#d1d5db';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">NYC Offense Exposure Analysis</h1>
          <p className="text-gray-600 mt-2">Spatial variation in public safety incidents across New York City boroughs</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'summary' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Key Insight</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                Manhattan experiences <span className="font-bold text-blue-600">3.5x more offense incidents</span> than Staten Island, 
                despite similar offense type distributions across all boroughs. This reveals that <span className="font-semibold">exposure intensity varies dramatically by location</span>, 
                not offense composition.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why This Matters for Health Tech</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Risk Stratification</p>
                      <p className="text-sm text-gray-600">Location-based offense exposure can inform mental health risk models and resource allocation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Environmental Context</p>
                      <p className="text-sm text-gray-600">Understanding spatial safety patterns enables better population health interventions</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Targeting Precision</p>
                      <p className="text-sm text-gray-600">High-exposure areas may benefit from tailored mental health support and preventive services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Data-Driven Strategy</p>
                      <p className="text-sm text-gray-600">Spatial analysis provides foundation for linking safety exposure to health outcomes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">94</p>
                <p className="text-sm text-gray-600 mt-1">Total Records</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">5</p>
                <p className="text-sm text-gray-600 mt-1">Boroughs Analyzed</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">3.5x</p>
                <p className="text-sm text-gray-600 mt-1">Exposure Range</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'dataset' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dataset Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">94</p>
                  <p className="text-sm text-gray-600 mt-1">Total Records</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">5</p>
                  <p className="text-sm text-gray-600 mt-1">Boroughs Covered</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-gray-600 mt-1">Offense Categories</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-amber-600">Multiple</p>
                  <p className="text-sm text-gray-600 mt-1">Precinct Codes</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Coverage</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Subset after cleaning (duplicates removed, categories standardized)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>All 5 NYC boroughs represented</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Focus on negligent homicide and drug-related offenses</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Constraints</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>No time variable available</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>No population denominators for rate calculation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>No geographic coordinates for precise mapping</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>Analysis Focus:</strong> This analysis examines spatial variation in offense exposure intensity 
                  across NYC boroughs. Findings are exploratory and directional given the subset nature of the data.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share of Records by Borough</h3>
              <p className="text-sm text-gray-600 mb-4">Distribution of offense records across boroughs (not population-normalized)</p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={boroughShareData}
                      dataKey="value"
                      nameKey="borough"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ borough, percent }) => `${borough}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {boroughShareData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center italic">
                Manhattan and Brooklyn account for over 55% of records in this subset
              </p>
            </div>
          </div>
        )}

        {activeSection === 'frequency' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Offense Records by Borough</h2>
              <p className="text-gray-600 mb-6">Boroughs differ in offense record volume within the dataset subset</p>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={boroughData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="borough" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      tick={{ fill: '#4b5563' }}
                    />
                    <YAxis tick={{ fill: '#4b5563' }} label={{ value: 'Number of Records', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                <p className="font-semibold text-gray-900 mb-2">Key Finding</p>
                <p className="text-gray-700">
                  Manhattan shows the highest offense count (28 records), while Staten Island has the lowest (8 records). 
                  This <strong>3.5x difference</strong> suggests significant spatial variation in offense exposure across the city.
                </p>
              </div>

              <div className="mt-4 bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <p className="font-semibold text-gray-900 mb-2">Why This Matters</p>
                <p className="text-gray-700">
                  Exposure intensity varies by borough, which could correlate with mental health burden, stress levels, and 
                  healthcare utilization patterns. This spatial signal is valuable for targeting preventive interventions 
                  and allocating crisis response resources.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Distribution of Offense Types</h3>
              <p className="text-sm text-gray-600 mb-4">Offense categories are concentrated in three main types</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={offenseTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="offense" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      tick={{ fill: '#4b5563', fontSize: 11 }}
                    />
                    <YAxis tick={{ fill: '#4b5563' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                Three categories dominate this subset: negligent homicide offenses and dangerous drug incidents
              </p>
            </div>
          </div>
        )}

        {activeSection === 'composition' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Offense Type by Borough</h2>
              <p className="text-gray-600 mb-6">Same categories appear across boroughs, but frequencies vary</p>
              
              <div className="overflow-x-auto mb-6">
                <div className="inline-block min-w-full">
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    <div className="font-semibold text-sm"></div>
                    {['Brooklyn', 'Manhattan', 'Queens', 'Bronx', 'Staten Is.'].map(b => (
                      <div key={b} className="font-semibold text-sm text-center">{b}</div>
                    ))}
                  </div>
                  {['Homicide-Negligent', 'Vehicle-Related', 'Dangerous Drugs'].map(offense => (
                    <div key={offense} className="grid grid-cols-6 gap-2 mb-2">
                      <div className="text-sm font-medium py-2">{offense}</div>
                      {['Brooklyn', 'Manhattan', 'Queens', 'Bronx', 'Staten Island'].map(borough => {
                        const dataPoint = heatmapData.find(d => d.borough === borough && d.offense === offense);
                        const count = dataPoint ? dataPoint.count : 0;
                        return (
                          <div 
                            key={borough} 
                            className="text-center py-2 rounded font-semibold text-sm"
                            style={{ backgroundColor: getHeatmapColor(count), color: count >= 7 ? 'white' : '#374151' }}
                          >
                            {count}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm mb-6">
                <span className="font-semibold">Scale:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-4 rounded" style={{ backgroundColor: '#d1d5db' }}></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-4 rounded" style={{ backgroundColor: '#fbbf24' }}></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span>High</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-4 rounded" style={{ backgroundColor: '#dc2626' }}></div>
                  <span>Very High</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                <p className="font-semibold text-gray-900 mb-2">Key Finding</p>
                <p className="text-gray-700">
                  All three offense types appear in every borough, showing consistent categorical presence citywide. 
                  However, Manhattan and Brooklyn consistently show higher counts across categories, while Staten Island 
                  shows lower exposure. The variation is in <strong>volume, not variety</strong>.
                </p>
              </div>

              <div className="mt-4 bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <p className="font-semibold text-gray-900 mb-2">Strategic Implication</p>
                <p className="text-gray-700">
                  Since offense types are consistent across locations, health tech interventions can use 
                  <strong> standardized frameworks</strong> that scale in intensity rather than requiring borough-specific 
                  customization. Focus should be on deploying more resources to high-exposure areas rather than 
                  developing different intervention types per borough.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'statistics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistical Context</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Chi-Square Test: Offense Type × Borough</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">5.844</p>
                    <p className="text-sm text-gray-600 mt-1">Chi-square (χ²)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">8</p>
                    <p className="text-sm text-gray-600 mt-1">Degrees of Freedom</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">0.665</p>
                    <p className="text-sm text-gray-600 mt-1">P-value</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600 mb-4">
                <p className="font-semibold text-gray-900 mb-2">What This Means</p>
                <p className="text-gray-700">
                  No statistically significant association was detected between offense type and borough (p = 0.665, above the 0.05 threshold). 
                  However, this is <strong>likely due to small sample size</strong> (n=94) and sparse category counts rather than 
                  true absence of spatial patterns. The test is underpowered.
                </p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <p className="font-semibold text-gray-900 mb-2">Analytical Limitations</p>
                <ul className="space-y-2 text-gray-700 mt-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold mt-1">•</span>
                    <span><strong>Small sample size:</strong> 94 records provide directional insight but lack statistical power for strong inference</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold mt-1">•</span>
                    <span><strong>No population adjustment:</strong> Raw counts do not account for borough population differences</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold mt-1">•</span>
                    <span><strong>Sparse categories:</strong> Some borough-offense combinations have very low counts, violating chi-square assumptions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold mt-1">•</span>
                    <span><strong>Missing confounders:</strong> Cannot control for socioeconomic, demographic, or temporal factors</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Appropriate Use of These Findings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="font-semibold text-green-600 text-lg mb-3">✓ Recommended Uses</p>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">Exploratory insight</p>
                      <p className="text-sm text-gray-600">Identify spatial patterns worth investigating with larger datasets</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">Hypothesis generation</p>
                      <p className="text-sm text-gray-600">Guide questions for future research linking offense exposure to health outcomes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">Proof of concept</p>
                      <p className="text-sm text-gray-600">Demonstrate feasibility of spatial safety analysis for health applications</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-red-600 text-lg mb-3">✗ Not Recommended</p>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Definitive conclusions</p>
                      <p className="text-sm text-gray-600">Sample size insufficient for strong causal or population-level claims</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Direct policy recommendations</p>
                      <p className="text-sm text-gray-600">Findings require validation with comprehensive data before informing decisions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Rate comparisons</p>
                      <p className="text-sm text-gray-600">Cannot normalize by population or calculate true per-capita exposure rates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'implications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Strategic Implications for Health Tech</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                    Location-Aware Risk Modeling
                  </h3>
                  <p className="text-gray-700 ml-8">
                    Spatial offense exposure could serve as a proxy for environmental stress in mental health risk stratification models. 
                    Integrating neighborhood safety data with clinical information may improve prediction of crisis events or treatment needs.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-5 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                    Targeted Resource Allocation
                  </h3>
                  <p className="text-gray-700 ml-8">
                    High-exposure boroughs (Manhattan, Brooklyn) may benefit from increased access to trauma-informed care, 
                    crisis intervention services, and preventive mental health programs. Geographic targeting ensures resources reach 
                    populations most likely facing environmental stressors.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-5 border-l-4 border-purple-600">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                    Population Health Context
                  </h3>
                  <p className="text-gray-700 ml-8">
                    Understanding that offense types are similar across boroughs but volumes differ allows for standardized 
                    intervention frameworks that scale in intensity rather than requiring location-specific customization.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Roadmap: What Would Unlock Stronger Insights</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900">Now: Current Dataset</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Capability:</strong> Directional spatial signal
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Subset counts only, no time dimension, no population normalization
                  </p>
                </div>

                <div className="border-l-4 border-green-400 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900">Next: Data Enrichment</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Capability:</strong> Stronger inference and trend detection
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Needs:</strong> Add temporal dimension, population denominators, broader offense coverage
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Unlocks:</strong> Per-capita rates, time trends, seasonality patterns
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-4 bg-purple-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900">Scale: Health Tech Integration</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Capability:</strong> Risk modeling and demand forecasting
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Needs:</strong> Link to ER visits, injury outcomes, mental health utilization data
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Unlocks:</strong> Predictive models, targeted interventions, operational deployment
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6 border-l-4 border-amber-500">
              <h3 className="font-bold text-gray-900 mb-3">Bottom Line</h3>
              <p className="text-gray-800 leading-relaxed">
                This exploratory analysis demonstrates that <strong>spatial patterns in offense exposure exist and are measurable</strong>. 
                While current data constraints limit definitive conclusions, the 3.5x variation in exposure intensity across boroughs 
                provides a compelling signal for health tech applications. With expanded data (time, population, health outcomes), 
                these spatial patterns could power location-aware risk models and guide precision deployment of mental health resources.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NYPDDashboard