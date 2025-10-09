// Utility functions for managing session storage
export const SESSION_KEYS = {
  SYSTEM: 'roi_system',
  TYPE: 'roi_type',
  DIMENSIONS: 'roi_dimensions',
  COMPANY_INFO: 'companyInfo',
  COLLECTED_DATA: 'collectedData',
  CALCULATION_DATA: 'calculationData',
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

/**
 * Guardar datos recolectados en sessionStorage
 */
export const setCollectedData = (data: any): void => {
  try {
    sessionStorage.setItem(SESSION_KEYS.COLLECTED_DATA, JSON.stringify(data));
    console.log('💾 Collected data saved to sessionStorage');
  } catch (error) {
    console.error('Error saving collected data:', error);
  }
};

/**
 * Obtener datos recolectados desde sessionStorage
 */
export const getCollectedData = (): any | null => {
  try {
    const data = sessionStorage.getItem(SESSION_KEYS.COLLECTED_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting collected data:', error);
    return null;
  }
};

/**
 * Guardar resultados de cálculo ROI en sessionStorage
 */
export const setCalculationData = (data: any): void => {
  try {
    sessionStorage.setItem(SESSION_KEYS.CALCULATION_DATA, JSON.stringify(data));
    console.log('💾 Calculation data saved to sessionStorage');
  } catch (error) {
    console.error('Error saving calculation data:', error);
  }
};

/**
 * Obtener resultados de cálculo ROI desde sessionStorage
 */
export const getCalculationData = (): any | null => {
  try {
    const data = sessionStorage.getItem(SESSION_KEYS.CALCULATION_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting calculation data:', error);
    return null;
  }
};

/**
 * Limpiar datos de cálculo (útil para nuevo caso de uso)
 */
export const clearCalculationData = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEYS.CALCULATION_DATA);
    sessionStorage.removeItem(SESSION_KEYS.COLLECTED_DATA);
    console.log('🧹 Calculation data cleared from sessionStorage');
  } catch (error) {
    console.error('Error clearing calculation data:', error);
  }
};

/**
 * Verificar si hay resultados de cálculo disponibles
 */
export const hasCalculationData = (): boolean => {
  return sessionStorage.getItem(SESSION_KEYS.CALCULATION_DATA) !== null;
};

/**
 * Verificar si hay datos recolectados disponibles
 */
export const hasCollectedData = (): boolean => {
  return sessionStorage.getItem(SESSION_KEYS.COLLECTED_DATA) !== null;
};

/**
 * Guardar información de la empresa
 */
export const setCompanyInfo = (info: { name: string; size: string; sector: string; secondarySectors?: string[] }): void => {
  try {
    sessionStorage.setItem(SESSION_KEYS.COMPANY_INFO, JSON.stringify(info));
    console.log('💼 Company info saved to sessionStorage');
  } catch (error) {
    console.error('Error saving company info:', error);
  }
};

/**
 * Obtener información de la empresa
 */
export const getCompanyInfo = (): { name: string; size: string; sector: string; secondarySectors?: string[] } | null => {
  try {
    const info = sessionStorage.getItem(SESSION_KEYS.COMPANY_INFO);
    return info ? JSON.parse(info) : null;
  } catch (error) {
    console.error('Error getting company info:', error);
    return null;
  }
};