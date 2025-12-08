export const getDeviceType = () => {
  if (typeof window === "undefined") return "desktop";
  
  const userAgent = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const isIpad = /ipad/.test(userAgent) || 
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /macintosh/.test(userAgent)) ||
    (width >= 768 && width <= 1366 && height >= 1024 && height <= 1080);
  
  const isTablet = isIpad || 
    (width >= 768 && width <= 1024) || 
    /tablet/.test(userAgent);
  
  const isMobile = width < 768 || /mobile|android|iphone/.test(userAgent);
  
  if (isIpad) return "ipad";
  if (isTablet) return "tablet";
  if (isMobile) return "mobile";
  return "desktop";
};

export const isTouchDevice = () => {
  return typeof window !== "undefined" && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
};

export const shouldUseDockZoom = () => {
  const deviceType = getDeviceType();
  return deviceType === "desktop";
};

export const getResponsiveWindowSizes = (baseWidth: number, baseHeight: number) => {
  if (typeof window === "undefined") return { width: baseWidth, height: baseHeight };
  
  const deviceType = getDeviceType();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  switch (deviceType) {
    case "ipad":
      return {
        width: Math.min(baseWidth, viewportWidth * 0.85),
        height: Math.min(baseHeight, viewportHeight * 0.75)
      };
    case "tablet":
      return {
        width: Math.min(baseWidth, viewportWidth * 0.9),
        height: Math.min(baseHeight, viewportHeight * 0.8)
      };
    case "mobile":
      return {
        width: Math.min(baseWidth, viewportWidth * 0.95),
        height: Math.min(baseHeight, viewportHeight * 0.85)
      };
    default:
      return { width: baseWidth, height: baseHeight };
  }
};