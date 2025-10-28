function SizeChart({ isOpen, onClose, category }) {
  try {
    if (!isOpen) return null;

    const denimSizes = [
      { size: 'XS', chest: '80-84', waist: '60-64', hips: '86-90', length: '158-164' },
      { size: 'S', chest: '84-88', waist: '64-68', hips: '90-94', length: '164-170' },
      { size: 'M', chest: '88-92', waist: '68-72', hips: '94-98', length: '170-176' },
      { size: 'L', chest: '92-96', waist: '72-76', hips: '98-102', length: '176-182' },
      { size: 'XL', chest: '96-100', waist: '76-80', hips: '102-106', length: '182-188' }
    ];

    const lingerieSizes = [
      { size: 'XS', bust: '78-82', underbust: '63-67', waist: '58-62', hips: '84-88' },
      { size: 'S', bust: '82-86', underbust: '67-71', waist: '62-66', hips: '88-92' },
      { size: 'M', bust: '86-90', underbust: '71-75', waist: '66-70', hips: '92-96' },
      { size: 'L', bust: '90-94', underbust: '75-79', waist: '70-74', hips: '96-100' },
      { size: 'XL', bust: '94-98', underbust: '79-83', waist: '74-78', hips: '100-104' }
    ];

    const sizes = category === 'Lingerie' ? lingerieSizes : denimSizes;
    const [selectedSize, setSelectedSize] = React.useState('M');

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4" data-name="size-chart" data-file="components/SizeChart.js">
        <div className="absolute inset-0 bg-black/70 modal-backdrop" onClick={onClose}></div>
        
        <div className="relative bg-white max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-lg">
          <button onClick={onClose} className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 hover:opacity-60 bg-white rounded-full p-1">
            <div className="icon-x text-xl sm:text-2xl"></div>
          </button>

          <div className="p-4 sm:p-6 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-4 sm:mb-8 pr-8">Размерная сетка</h2>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Выберите размер:</h3>
                <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {sizes.map(item => (
                    <button
                      key={item.size}
                      onClick={() => setSelectedSize(item.size)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 border-2 transition-all text-sm sm:text-base ${
                        selectedSize === item.size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>

                <div className="relative aspect-[133/313] bg-white rounded-lg overflow-hidden p-2 sm:p-4 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                      src="https://app.trickle.so/storage/public/images/usr_1703861f58000001/04761d63-7c26-4b96-a313-2001d3c7b1ec.png" 
                      alt="Body measurements guide"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Размер {selectedSize}:</h3>
                <div className="space-y-2 sm:space-y-4">
                  {category === 'Lingerie' ? (
                    <>
                      <MeasurementRow label="Обхват груди" value={sizes.find(s => s.size === selectedSize)?.bust} color="text-red-600" />
                      <MeasurementRow label="Под грудью" value={sizes.find(s => s.size === selectedSize)?.underbust} color="text-blue-600" />
                      <MeasurementRow label="Талия" value={sizes.find(s => s.size === selectedSize)?.waist} color="text-green-600" />
                      <MeasurementRow label="Бёдра" value={sizes.find(s => s.size === selectedSize)?.hips} color="text-orange-600" />
                    </>
                  ) : (
                    <>
                      <MeasurementRow label="Обхват груди" value={sizes.find(s => s.size === selectedSize)?.chest} color="text-red-600" />
                      <MeasurementRow label="Талия" value={sizes.find(s => s.size === selectedSize)?.waist} color="text-green-600" />
                      <MeasurementRow label="Бёдра" value={sizes.find(s => s.size === selectedSize)?.hips} color="text-orange-600" />
                      <MeasurementRow label="Рост" value={sizes.find(s => s.size === selectedSize)?.length} color="text-purple-600" />
                    </>
                  )}
                </div>

                <div className="mt-4 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 flex items-center gap-2">
                    <div className="icon-info text-base sm:text-lg"></div>
                    Как измерить
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Измеряйте в нижнем белье</li>
                    <li>• Используйте сантиметровую ленту</li>
                    <li>• Не затягивайте ленту слишком туго</li>
                    <li>• При сомнениях выбирайте больший размер</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Полная таблица размеров</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Размер</th>
                      {category === 'Lingerie' ? (
                        <>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Грудь</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Под гр.</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Талия</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Бёдра</th>
                        </>
                      ) : (
                        <>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Грудь</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Талия</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Бёдра</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">Рост</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((item, idx) => (
                      <tr key={item.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium">{item.size}</td>
                        {category === 'Lingerie' ? (
                          <>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.bust}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.underbust}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.waist}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.hips}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.chest}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.waist}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.hips}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">{item.length}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SizeChart error:', error);
    return null;
  }
}

function MeasurementRow({ label, value, color }) {
  return (
    <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded text-sm sm:text-base">
      <span className={`font-medium ${color}`}>{label}</span>
      <span className="text-base sm:text-lg font-light">{value} см</span>
    </div>
  );
}