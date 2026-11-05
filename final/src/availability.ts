import { validateBooking, type ValidationResult } from './booking';
import { parseInteger } from './filtering';
import type { Room } from './fixtures';
export function evaluateRequest(startRaw: string, endRaw: string, nowRaw: string, room: Room | null): ValidationResult {
  if (!room) return { ok: false, reasons: ['No matching room selected.'] };
  const start = parseInteger(startRaw), end = parseInteger(endRaw), now = parseInteger(nowRaw);
  if (now === null || now < 0 || now > 1439) return { ok: false, reasons: ['Current time must be a whole minute from 0 to 1439.'] };
  if (start === null || end === null) return { ok: false, reasons: ['Please enter both a start and end time as whole minutes.'] };
  return validateBooking({ start, end, now, blocked: room.status === 'blocked', bookings: room.bookings });
}
