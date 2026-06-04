/** Блоки контента для генератора статей */

export function p(text) {
  if (typeof text === 'object' && text !== null) {
    return { type: 'p', ...text };
  }
  return { type: 'p', text };
}

export function h2(text) {
  if (typeof text === 'object' && text !== null) {
    return { type: 'h2', ...text };
  }
  return { type: 'h2', text };
}

export function h3(text) {
  if (typeof text === 'object' && text !== null) {
    return { type: 'h3', ...text };
  }
  return { type: 'h3', text };
}

export function ul(items) {
  return { type: 'ul', items };
}
