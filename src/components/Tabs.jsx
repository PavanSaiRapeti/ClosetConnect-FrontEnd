import React, { useState } from 'react';

function Tabs({tabs ,isLogin}) {
  const tabValue = isLogin ? 0 : 1;
  const [activeTab, setActiveTab] = useState(tabValue ? 0 : 1);

  

  return (
    <div className="flex flex-col w-full h-full">
      <div className="tabs-nav flex justify-center mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 border-b-2 ${
              activeTab === index ? 'border-b-ccPink border-b-8 text-ccBlack ' : 'border-b-transparent border-b-8 text-gray-600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default Tabs;