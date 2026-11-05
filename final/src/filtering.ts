import type { Room } from './fixtures';
export function parseInteger(raw: string): number | null {
  if (!raw.trim()) return null;
  const value = Number(raw);
  return Number.isInteger(value) ? value : null;
}
export function filterRooms(rooms: readonly Room[], attendees: number | null, equipment: readonly string[]): Room[] {
  if (attendees === null || !Number.isInteger(attendees) || attendees < 1) return [];
  return rooms.filter(room => room.capacity >= attendees && equipment.every(item => room.equipment.includes(item)));
}
export function selectVisibleRoom(rooms: readonly Room[], selectedId: string): Room | null {
  return rooms.find(room => room.id === selectedId) ?? rooms[0] ?? null;
}
