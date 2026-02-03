import { useState } from 'react';
import { countries, type Country, type City } from '../data/regions';

interface CityFilterProps {
  onCitySelect: (city: string) => void;
  onCountrySelect?: (country: string) => void;
  selectedCity?: string;
  fullWidth?: boolean;
}

export default function CityFilter({ onCitySelect, onCountrySelect, selectedCity, fullWidth = false }: CityFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleCountryClick = (country: Country) => {
    if (onCountrySelect) {
      onCountrySelect(country.nameEn);
      setIsOpen(false);
    }
  };

  const handleCityClick = (city: City) => {
    onCitySelect(city.nameEn);
    setIsOpen(false);
  };

  const renderHotCities = () => {
    if (!selectedCountry.hotCities || selectedCountry.hotCities.length === 0) {
      return null;
    }

    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">热门城市</h3>
        <div className="grid grid-cols-5 gap-3">
          {selectedCountry.hotCities.map((city) => (
            <button
              key={city.nameEn}
              onClick={() => handleCityClick(city)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors focus:outline-none"
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCityList = () => {
    if (selectedCountry.states) {
      // 按州/省分组显示
      return (
        <div className="space-y-4">
          {selectedCountry.states.map((state) => (
            <div key={state.nameEn} data-letter={state.nameEn.charAt(0).toUpperCase()}>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {state.name} ({state.nameEn})
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {state.cities.map((city) => (
                  <button
                    key={city.nameEn}
                    onClick={() => handleCityClick(city)}
                    className="px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors text-left focus:outline-none"
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // 平铺显示所有城市
      return (
        <div className="grid grid-cols-4 gap-2">
          {selectedCountry.cities.map((city) => (
            <button
              key={city.nameEn}
              onClick={() => handleCityClick(city)}
              data-letter={city.nameEn.charAt(0).toUpperCase()}
              className="px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors text-left focus:outline-none"
            >
              {city.name}
            </button>
          ))}
        </div>
      );
    }
  };

  const renderLetterIndex = () => {
    const letters = new Set<string>();
    
    if (selectedCountry.states) {
      selectedCountry.states.forEach(state => {
        const firstLetter = state.nameEn.charAt(0).toUpperCase();
        letters.add(firstLetter);
      });
    } else {
      selectedCountry.cities.forEach(city => {
        const firstLetter = city.nameEn.charAt(0).toUpperCase();
        letters.add(firstLetter);
      });
    }

    const sortedLetters = Array.from(letters).sort();

    return (
      <div className="flex flex-col gap-1">
        {sortedLetters.map((letter) => (
          <button
            key={letter}
            onClick={() => {
              const element = document.querySelector(`[data-letter="${letter}"]`);
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-6 h-6 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors focus:outline-none"
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* 选择城市按钮 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-400 transition-colors focus:outline-none ${
          fullWidth ? 'w-full' : 'w-auto'
        }`}
      >
        <span className="text-gray-700">{selectedCity || '选择城市'}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0"
          style={{ backgroundColor: 'transparent', zIndex: 99998 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 筛选面板 */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: fullWidth ? '100%' : '900px',
            minWidth: '900px',
            maxHeight: '80vh',
            zIndex: 99999
          }}
        >
          <div className="p-6">
            {/* 热门城市 */}
            {renderHotCities()}

            {/* 国家标签 */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
              {countries.map((country) => (
                <div key={country.nameEn} className="relative group">
                  <button
                    onClick={() => handleCountryChange(country)}
                    onDoubleClick={() => handleCountryClick(country)}
                    className={`pb-3 px-2 text-sm font-medium transition-colors relative focus:outline-none ${
                      selectedCountry.nameEn === country.nameEn
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {country.name}
                    {selectedCountry.nameEn === country.nameEn && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                  {onCountrySelect && (
                    <button
                      onClick={() => handleCountryClick(country)}
                      className="absolute -right-1 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-blue-500 hover:text-blue-700"
                      title="查看该国家所有房源"
                    >
                      ↪
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* 城市列表和字母索引 */}
            <div className="flex gap-4">
              <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 250px)' }}>
                {renderCityList()}
              </div>
              <div className="flex-shrink-0">
                {renderLetterIndex()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
