import * as CSS from './css';
import * as DOM from './dom';

export function toInt(x) {
  return parseInt(x, 10) || 0;
}

export function isEditable(el) {
  return (
    DOM.matches(el, 'input,[contenteditable]') ||
    DOM.matches(el, 'select,[contenteditable]') ||
    DOM.matches(el, 'textarea,[contenteditable]') ||
    DOM.matches(el, 'button,[contenteditable]')
  );
}

export function outerWidth(element) {
  const styles = CSS.get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

export const env = {
  isWebKit:
    typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style,

  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.navigator && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints > 0) ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),

  supportsIePointer:
    typeof window !== 'undefined' && window.navigator &&
      'msMaxTouchPoints' in window.navigator && window.navigator.msMaxTouchPoints > 0,

  isChrome:
    typeof window !== 'undefined' && window.navigator && /Chrome/i.test(window.navigator.userAgent),
};

