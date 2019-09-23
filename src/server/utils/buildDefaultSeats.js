import { decoABC, encoABC } from './utils';

export function buildDefaultSeats() {
  let defaultSeatsMap = new Map();

  // 50-100
  for (let j = 1; j < 27; j++) {
    let rowIndex = 50 + j * 2;
    let seats = [];

    // A/B/C/D
    for (let i = 1; i < 5; i++) {
      let seat = `${encoABC(i)}${encoABC(j)}1`

      seats.push(seat);
    }
    defaultSeatsMap.set(rowIndex, seats)
  }

  return defaultSeatsMap;
}
