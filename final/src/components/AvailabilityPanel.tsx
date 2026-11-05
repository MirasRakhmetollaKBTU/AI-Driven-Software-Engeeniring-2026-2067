import type { ValidationResult } from '../booking';
type Props = { start: string; end: string; now: string; setStart: (s: string) => void; setEnd: (s: string) => void; setNow: (s: string) => void; result: ValidationResult; roomName: string };
export function AvailabilityPanel({ start, end, now, setStart, setEnd, setNow, result, roomName }: Props) {
  return <section className="panel"><h2>Check availability</h2><p>Whole minutes after midnight. Maximum duration 120 minutes.</p>
    {[{ id: 'now', label: 'Current time', value: now, update: setNow, max: 1439 }, { id: 'start', label: 'Start time', value: start, update: setStart, max: 1440 }, { id: 'end', label: 'End time', value: end, update: setEnd, max: 1440 }].map(field => <div key={field.id}><label htmlFor={field.id}>{field.label}</label><input id={field.id} type="number" min="0" max={field.max} step="1" value={field.value} onChange={e => field.update(e.target.value)} /></div>)}
    <div role="status" aria-live="polite" data-testid="verdict" className={result.ok ? 'verdict success' : 'verdict failure'}><h3>{result.ok ? 'Available' : 'Unavailable'}</h3><p>{roomName}</p>{!result.ok && <ul>{result.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>}</div>
  </section>;
}
