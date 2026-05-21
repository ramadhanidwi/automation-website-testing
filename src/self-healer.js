async function extractDomSnapshot(page) {
  if (page.isClosed()) {
    throw new Error('[self-heal] Page already closed — cannot extract snapshot');
  }

  return page.evaluate(() => {
    const selectors = [
      'button', 'a', 'input', 'select',
      'textarea', '[role]', '[data-testid]', 'label',
    ];
    const nodes = document.querySelectorAll(selectors.join(','));

    return Array.from(nodes)
      .slice(0, 150)
      .map((el) => {
        const attrs = [];
        ['id', 'class', 'name', 'type', 'role', 'aria-label',
         'data-testid', 'placeholder', 'for'].forEach((a) => {
          const v = el.getAttribute(a);
          if (v) attrs.push(`${a}="${v.slice(0, 60)}"`);
        });
        const text = (el.textContent ?? '')
          .trim().replace(/\s+/g, ' ').slice(0, 80);
        return `<${el.tagName.toLowerCase()} ${attrs.join(' ')}>${text}</${el.tagName.toLowerCase()}>`;
      })
      .join('\n');
  });
}