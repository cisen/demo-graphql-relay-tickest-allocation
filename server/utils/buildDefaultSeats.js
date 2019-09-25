import { decoABC, encoABC } from './utils';

// 生成默认座位数据，如[{seatLen: 50, seatCodes: 'AY23'}, ...]
// 50为剩余连续座位数
// 座位编码第一个字母如A为区域，第二个如Y为行编码，后面数字为列编码
export function buildDefaultSeats() {
  let defaultSeats = [];

  // 50-100
  for (let j = 1; j < 27; j++) {
    let rowIndex = 48 + j * 2;
    let seats = [];

    // A/B/C/D
    for (let i = 1; i < 5; i++) {
      let seat = `${encoABC(i)}${encoABC(j)}1`

      seats.push(seat);
    }
    defaultSeats.push({
      seatLen: rowIndex,
      seatCodes: seats.join(',')
    })
  }

  return defaultSeats;
}
