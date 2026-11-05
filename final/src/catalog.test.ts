import { describe, test, expect } from 'vitest';
import { ROOMS } from './fixtures';
import { filterRooms, parseInteger, selectVisibleRoom } from './filtering';
import { evaluateRequest } from './availability';
import { canBook } from './booking';
describe('Assignment 04 F1-F5 and input boundaries', () => {
  test('catalog has four unique IDs and separate booking arrays', () => {
    expect(ROOMS).toHaveLength(4);
    expect(new Set(ROOMS.map(r => r.id)).size).toBe(4);
    expect(new Set(ROOMS.map(r => r.bookings)).size).toBe(4);
  });
  test('F1 exact capacity accepted', () => expect(filterRooms(ROOMS, 40, []).map(r => r.id)).toContain('eng-204'));
  test('F1 insufficient capacity rejected', () => expect(filterRooms(ROOMS, 41, []).map(r => r.id)).not.toContain('eng-204'));
  test('F2 requires ALL equipment, not any', () => expect(filterRooms(ROOMS, 1, ['Projector', 'Computers']).map(r => r.id)).toEqual(['lab-302']));
  test('F2 no equipment restriction preserves all rooms', () => expect(filterRooms(ROOMS, 1, [])).toHaveLength(4));
  test('F3 blocked room never available', () => expect(evaluateRequest('660', '720', '615', ROOMS[3]).ok).toBe(false));
  test('F4 no capacity match', () => expect(filterRooms(ROOMS, 101, [])).toEqual([]));
  test('F4 impossible equipment combination', () => expect(filterRooms(ROOMS, 1, ['Computers', 'Video conferencing'])).toEqual([]));
  test('F5 same request uses chosen room bookings', () => {
    expect(evaluateRequest('660', '720', '615', ROOMS[0]).ok).toBe(true);
    expect(evaluateRequest('660', '720', '615', ROOMS[1]).ok).toBe(false);
  });
  test('filtered selection falls back to first visible room', () => expect(selectVisibleRoom(filterRooms(ROOMS, 41, []), 'eng-204')?.id).toBe('aud-001'));
  test('no visible room means no availability', () => expect(evaluateRequest('660', '720', '615', selectVisibleRoom([], 'eng-204')).ok).toBe(false));
  test.each(['', '1.5', '-1', '0', 'NaN'])('invalid attendees %s yields no rooms', raw => expect(filterRooms(ROOMS, parseInteger(raw), [])).toEqual([]));
  test.each(['', '615.5', '-1', '1440'])('invalid reference time %s is rejected', raw => expect(evaluateRequest('660', '720', raw, ROOMS[0]).ok).toBe(false));
  test('fractional request is not silently truncated', () => expect(evaluateRequest('660.5', '720', '615', ROOMS[0]).ok).toBe(false));
  test('AC1 domain validator rejects fractions', () => expect(canBook({ start: 660.5, end: 720, now: 615, blocked: false, bookings: [] })).toBe(false));
  test('AC1 day end exactly 1440 accepted', () => expect(evaluateRequest('1320', '1440', '615', ROOMS[0]).ok).toBe(true));
  test('AC1 negative start rejected', () => expect(evaluateRequest('-1', '30', '0', ROOMS[0]).ok).toBe(false));
  test('AC5 frozen catalog survives accepted/rejected calls and filtering', () => {
    const rooms = structuredClone(ROOMS);
    rooms.forEach(r => { r.bookings.forEach(Object.freeze); Object.freeze(r.bookings); Object.freeze(r.equipment); Object.freeze(r); });
    Object.freeze(rooms);
    const before = JSON.stringify(rooms);
    filterRooms(rooms, 20, ['Projector']);
    rooms.forEach(r => { evaluateRequest('660', '720', '615', r); evaluateRequest('540', '1441', '615', r); });
    expect(JSON.stringify(rooms)).toBe(before);
  });
});
