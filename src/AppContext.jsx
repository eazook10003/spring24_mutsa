// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrapedData, setScrapedData] = useState({
    news_data: [],
    Average_Score: null,
    news_price: []
  });

  return (
    <AppContext.Provider value={{ searchTerm, setSearchTerm, scrapedData, setScrapedData }}>
      {children}
    </AppContext.Provider>
  );
};
