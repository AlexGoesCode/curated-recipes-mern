export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
) {
  let timeout: number;

  return function (...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}
