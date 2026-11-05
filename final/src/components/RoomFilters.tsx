import { EQUIPMENT, type Room } from '../fixtures';
type Props = { attendees: string; setAttendees: (s: string) => void; equipment: string[]; setEquipment: (s: string[]) => void; rooms: readonly Room[]; selectedId: string; onSelect: (id: string) => void };
export function RoomFilters({ attendees, setAttendees, equipment, setEquipment, rooms, selectedId, onSelect }: Props) {
  return <section className="panel"><h2>Find a room</h2>
    <label htmlFor="attendees">Attendees</label><input id="attendees" type="number" min="1" step="1" value={attendees} onChange={e => setAttendees(e.target.value)} />
    <fieldset><legend>Required equipment (all selected items)</legend>{EQUIPMENT.map(item => <label className="check" key={item}><input type="checkbox" checked={equipment.includes(item)} onChange={e => setEquipment(e.target.checked ? [...equipment, item] : equipment.filter(x => x !== item))} />{item}</label>)}</fieldset>
    <p role="status">{rooms.length} matching rooms</p>
    {rooms.length ? <><label htmlFor="room">Room</label><select id="room" value={selectedId} onChange={e => onSelect(e.target.value)}>{rooms.map(room => <option key={room.id} value={room.id}>{room.name} | {room.capacity} seats{room.status === 'blocked' ? ' | Blocked' : ''}</option>)}</select></> : <p className="empty">No rooms match. Reduce attendees or remove required equipment. Attendees must be a positive whole number.</p>}
  </section>;
}
