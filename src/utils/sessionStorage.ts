// Utility functions for managing session storage
export const SESSION_KEYS = {
  SYSTEM: 'roi_system',
  TYPE: 'roi_type',
  DIMENSIONS: 'roi_dimensions',
} as const;

export const setRoiSystem = (system: string): void => {
  sessionStorage.setItem(SESSION_KEYS.SYSTEM, system);
};

export const getRoiSystem = (): string | null => {
  return sessionStorage.getItem(SESSION_KEYS.SYSTEM);
};

export const setRoiType = (type: 'beginner' | 'expert'): void => {
  sessionStorage.setItem(SESSION_KEYS.TYPE, type);
};

export const getRoiType = (): 'beginner' | 'expert' | null => {
  const type = sessionStorage.getItem(SESSION_KEYS.TYPE);
  return type as 'beginner' | 'expert' | null;
};

export const setRoiDimensions = (dimensions: string[]): void => {
  sessionStorage.setItem(SESSION_KEYS.DIMENSIONS, JSON.stringify(dimensions));
};

export const getRoiDimensions = (): string[] => {
  const dimensions = sessionStorage.getItem(SESSION_KEYS.DIMENSIONS);
  return dimensions ? JSON.parse(dimensions) : [];
};

export const clearRoiSession = (): void => {
  Object.values(SESSION_KEYS).forEach(key => {
    sessionStorage.removeItem(key);
  });
};
