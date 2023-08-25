import { createContext, useContext, ReactNode } from 'react';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

type ContextType = {
  getCache: (key: string) => IPodcast | undefined;
  setCache: (key: string, value: any, ttl?: number) => void;
  clearCache: () => void;
  deleteCache: (key: string) => void;
};

type cacheBody = {
  expiry: Date;
  data: IPodcast;
};

const CacheContext = createContext<ContextType | null>(null);

export function useCache() {
  return useContext(CacheContext) as ContextType;
}

export default function CacheProvider({ children }: { children: ReactNode }) {
  const cache = new Map<string, cacheBody>();

  function getCache(key: string) {
    const cacheValue = cache.get(key);
    if (!cacheValue) return undefined;
    if (
      cacheValue.expiry &&
      new Date().getTime() > cacheValue.expiry.getTime()
    ) {
      cache.delete(key);
      return undefined;
    }
    return cacheValue.data;
  }

  // TTL set to one hour by default
  function setCache(key: string, value: any, ttl: number = 3600) {
    var t = new Date();
    t.setSeconds(t.getSeconds() + ttl);
    cache.set(key, {
      expiry: t,
      data: value,
    });
  }

  function clearCache() {
    cache.clear();
  }

  function deleteCache(key: string) {
    cache.delete(key);
  }

  const contextValue = {
    getCache,
    setCache,
    clearCache,
    deleteCache,
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
}
