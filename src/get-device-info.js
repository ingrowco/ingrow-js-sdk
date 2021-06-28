export function getDeviceInfo() {
  const { userAgent } = navigator;
  const { screen: { width, height } } = window;
  return { userAgent, screen: { width, height } };
}