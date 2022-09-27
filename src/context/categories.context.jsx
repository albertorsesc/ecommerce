import { useState, useEffect, createContext } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap)
    }
    getCategoriesMap();
  });

  /* Uncomment for creating categories for the first time using SHOP_DATA in Firebase,
    Load app page in browser and comment useEffect again.
  */
  /* useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA);
  }, []) */

  const value = {categoriesMap};
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}