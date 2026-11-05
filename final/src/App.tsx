import { useState } from 'react';
import { ROOMS, DEFAULT_CURRENT_TIME_MIN } from './fixtures';
import { filterRooms, parseInteger, selectVisibleRoom } from './filtering';
import { evaluateRequest } from './availability';
import { RoomFilters } from './components/RoomFilters';
import { AvailabilityPanel } from './components/AvailabilityPanel';
import { RoomSchedule } from './components/RoomSchedule';
export default function App() {
  const [attendees, setAttendees] = useState('1');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(ROOMS[0].id);
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState(String(DEFAULT_CURRENT_TIME_MIN));
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const catalog = ROOMS.map(room => ({ ...room, status: (overrides[room.id] ?? (room.status === 'blocked')) ? 'blocked' as const : 'available' as const }));
  const rooms = filterRooms(catalog, parseInteger(attendees), equipment);
  const room = selectVisibleRoom(rooms, selectedId);
  const result = evaluateRequest(start, end, now, room);
  return <div className="min-h-screen bg-slate-50 text-slate-900"><header><div className="wrap"><p className="eyebrow">SMART CAMPUS / FICTIONAL DEMO</p><h1>Room Availability Checker</h1><p>Find the right space, then check your time slot.</p></div></header>
    <main className="wrap"><RoomFilters attendees={attendees} setAttendees={setAttendees} equipment={equipment} setEquipment={setEquipment} rooms={rooms} selectedId={room?.id ?? ''} onSelect={setSelectedId} />
      <div className="grid"><AvailabilityPanel start={start} end={end} now={now} setStart={setStart} setEnd={setEnd} setNow={setNow} result={result} roomName={room?.name ?? 'No room selected'} />
      {room && <RoomSchedule room={room} onToggle={() => setOverrides(previous => ({ ...previous, [room.id]: room.status !== 'blocked' }))} />}</div>
    </main><footer className="wrap">Fixed reference time by default: 10:15. Editable for boundary testing. No live services or saved reservations.</footer></div>;
}
