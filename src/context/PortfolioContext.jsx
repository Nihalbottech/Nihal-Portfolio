import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import defaultContent from '../data/content.json';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let fallbackTimeout;

    // Attempt to connect to Firestore
    try {
      if (!db) {
        // Silently fallback to local data if Firebase isn't configured
        if (isMounted) setLoading(false);
        return;
      }
      
      const docRef = doc(db, 'portfolio', 'content');
      
      // Fallback timeout: if Firebase takes more than 2 seconds, use local fallback
      fallbackTimeout = setTimeout(() => {
        if (isMounted) {
          console.warn("Firebase timeout (using local fallback).");
          setLoading(false);
        }
      }, 2000);

      // Use onSnapshot for live real-time updates!
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        clearTimeout(fallbackTimeout);
        if (isMounted) {
          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.warn("No data found in Firebase, using local fallback.");
          }
          setLoading(false);
        }
      }, (err) => {
        clearTimeout(fallbackTimeout);
        if (isMounted) {
          console.error("Firebase connection error (using local fallback): ", err.message);
          setError(err.message);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
        clearTimeout(fallbackTimeout);
        unsubscribe();
      };
    } catch (err) {
      if (isMounted) {
        console.warn("Firebase not configured correctly, using local fallback.", err);
        setLoading(false);
      }
    }
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};
