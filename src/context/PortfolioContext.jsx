import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
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
    let channel;

    // Attempt to connect to Supabase
    try {
      if (!supabase) {
        // Silently fallback to local data if Supabase isn't configured
        if (isMounted) setLoading(false);
        return;
      }

      // Fallback timeout: if Supabase takes more than 2 seconds, use local fallback
      fallbackTimeout = setTimeout(() => {
        if (isMounted) {
          console.warn("Supabase timeout (using local fallback).");
          setLoading(false);
        }
      }, 2000);

      // Fetch the initial portfolio data
      const fetchInitialData = async () => {
        try {
          const { data: row, error: fetchError } = await supabase
            .from('portfolio')
            .select('data')
            .eq('id', 'content')
            .maybeSingle();

          clearTimeout(fallbackTimeout);

          if (fetchError) throw fetchError;

          if (isMounted) {
            if (row && row.data) {
              setData(row.data);
            } else {
              console.warn("No data found in Supabase, using local fallback.");
            }
            setLoading(false);
          }
        } catch (err) {
          clearTimeout(fallbackTimeout);
          if (isMounted) {
            console.error("Supabase connection error (using local fallback): ", err.message);
            setError(err.message);
            setLoading(false);
          }
        }
      };

      fetchInitialData();

      // Subscribe to real-time changes
      channel = supabase
        .channel('portfolio-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'portfolio', filter: 'id=eq.content' },
          (payload) => {
            if (isMounted && payload.new && payload.new.data) {
              setData(payload.new.data);
            }
          }
        )
        .subscribe();

      return () => {
        isMounted = false;
        clearTimeout(fallbackTimeout);
        if (channel) {
          supabase.removeChannel(channel);
        }
      };
    } catch (err) {
      if (isMounted) {
        console.warn("Supabase not configured correctly, using local fallback.", err);
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
