import type { Room } from '../fixtures';
import { minutesToLabel } from '../format';
export function RoomSchedule({ room, onToggle }: { room: Room; onToggle: () => void }) {
  const bookings = [...room.bookings].sort((a, b) => a.start - b.start);
  return <section className="panel"><h2>{room.name}</h2><p>{room.building} | {room.capacity} seats | ID {room.id}</p><p>{room.equipment.join(' / ')}</p>
    <button onClick={onToggle} aria-label="Toggle selected room blocked status">{room.status === 'blocked' ? 'Blocked' : 'Open'} - toggle demo status</button>
    <h3>Existing bookings</h3><p>Intervals include the start and exclude the end. Touching endpoints are allowed.</p>
    <ul>{bookings.map(b => <li className="booking" key={b.id}><span>{b.title}</span><strong>{minutesToLabel(b.start)}–{minutesToLabel(b.end)}</strong></li>)}</ul>
    {!bookings.length && <p>No existing bookings.</p>}<p>Fictional bookings are read-only. This app checks availability; it does not reserve rooms.</p>
  </section>;
}
