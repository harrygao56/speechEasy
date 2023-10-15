import React, { createContext, useContext, useState } from 'react';

const PointsArray = createContext();

export const PointsContextProvider = ({ children }) => {
  const [myPoints, setMyPoints] = useState(['Item 1', 'Item 2', 'Item 3']);

  return (
    <PointsArray.Provider value={[ myPoints, setMyPoints ]}>
      {children}
    </PointsArray.Provider>
  );
};

export const useMyPointsContext = () => {
  return useContext(PointsArray);
};