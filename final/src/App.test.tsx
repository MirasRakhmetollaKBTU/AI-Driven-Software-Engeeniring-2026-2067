// @vitest-environment jsdom
import { test, expect } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

test('UI integration: switches room schedule/verdict, filters and recovers from empty state', async () => {
  const host = document.createElement('div'); document.body.append(host);
  const root = createRoot(host);
  const input = async (id: string, value: string) => {
    const el = host.querySelector<HTMLInputElement>(`#${id}`)!;
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
  };
  const verdict = () => host.querySelector('[data-testid=verdict]')!.textContent!;
  try {
    await act(async () => root.render(<App />));
    expect(host.textContent).toContain('4 matching rooms');
    await input('start', '660'); await input('end', '720');
    expect(verdict()).toContain('Available');
    const select = host.querySelector<HTMLSelectElement>('#room')!;
    await act(async () => { select.value = 'lib-101'; select.dispatchEvent(new Event('change', { bubbles: true })); });
    expect(verdict()).toContain('Unavailable'); expect(verdict()).toContain('Overlaps');
    expect(host.textContent).toContain('Study group');
    await input('attendees', '13');
    expect(host.querySelector<HTMLSelectElement>('#room')!.value).toBe('eng-204');
    expect(verdict()).toContain('Available');
    const computers = Array.from(host.querySelectorAll('label')).find(l => l.textContent === 'Computers')!.querySelector('input')!;
    await act(async () => computers.click());
    expect(host.textContent).toContain('1 matching rooms');
    expect(host.querySelector<HTMLSelectElement>('#room')!.value).toBe('lab-302');
    await input('attendees', '101');
    expect(host.textContent).toContain('No rooms match'); expect(verdict()).toContain('Unavailable');
    expect(host.querySelector('#room')).toBeNull();
    await input('attendees', '30');
    expect(verdict()).toContain('Available');
    await act(async () => host.querySelector<HTMLButtonElement>('button')!.click());
    expect(verdict()).toContain('Unavailable'); expect(verdict()).toContain('blocked');
    await input('now', ''); expect(verdict()).toContain('Current time must');
    await input('now', '615'); await input('start', ''); expect(verdict()).toContain('Please enter both');
  } finally { await act(async () => root.unmount()); host.remove(); }
});

