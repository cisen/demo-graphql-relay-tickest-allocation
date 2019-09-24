import models from '../models';
import { getRandom } from '../utils/utils';

const resolvers = {
  Query: {
    seat: (root, args, context, info) => {
      console.log(`3. resolver: hello`)
      return `Hello ${args.name ? args.name : 'world'}!`
    }
  },
}

const ticketInput = async (resolve, root, args, context, info) => {
  const { input: { phone, ticketsCout } } = args;

  const allRemainingSeats = await models.Seat.findAll();
  const allRemainingSeatsMap = formatSeatsToSeatsMap(allRemainingSeats);
  const allocateSeats = getRandomSeat(allRemainingSeatsMap, ticketsCout)

  // const tickets = await models.Ticket.create({
  //   phone,
  //   seatCodes: "AA1"
  // });
  const res = {
    ticket: {
      phone,
      seatCodes: allocateSeats.join(',')
    }
  }
  console.log(`1. logInput: ${JSON.stringify(args)}`)
  const result = await resolve(root, res, context, info)
  console.log(`5. logInput`)
  return res
}

export const ticketMiddleware = {
  Mutation: {
    buyTickets: ticketInput
  }
}

/**
 * 随机从连续座位中抽取连续的座位
 * @param seats<Tickets> 存储在数据库的seatLen, seatCodes数组
 * @returns {Map} 以空余连续座位数量为key，各个空余座位组的第一个座位编号数组字符串为value的map对象
 */
function formatSeatsToSeatsMap(seats) {
  let seatsMap = new Map();

  seats.forEach(item => {
    seatsMap.set(item.seatLen, item.seatCodes.split(','));
  })
  return seatsMap;
}

/**
 * 随机从连续座位中抽取连续的座位
 * @param remainingSeatsMap 以空余连续座位数量为key，各个空余座位组的第一个座位编号数组字符串为value的map对象
 * @param applyCount 用户申请的座位数量
 * @returns {Array} 随机选中的连续的座位号，也就是最后的结果
 */
function getRandomSeat(remainingSeatsMap, applyCount) {
  let resSeatCodes = [];

  // 如果刚好有数量相等的连续空位数的，则直接随机返回一个，特殊处理
  if (remainingSeatsMap.has(applyCount)) {
    // 空余的连续座位组的第一个位置集合
    let remainingSeatCodes = remainingSeatsMap.get(applyCount);
    // 随机抽中的座位组的第一个座位编号，比如：AA1
    let selectedSeatCode = remainingSeatCodes[getRandom(remainingSeatCodes.length)];

    resSeatCodes = calcRandomSeats(selectedSeatCode, applyCount, applyCount)
    return resSeatCodes;
  }

  // 如果没有相等的连续的空位，则随机抽取连续空位超过申请长度的
  let remainingSeatsKeys = [];
  remainingSeatsMap.forEach((val, key) => {
    if (key > applyCount) remainingSeatsKeys.push(key);
  })
  // 随机选中的连续空余座位数量
  let selectedSeatCount = remainingSeatsKeys[getRandom(remainingSeatsKeys.length)];
  // 空余的连续座位组的第一个位置的集合
  let remainingSeatCodes = remainingSeatsMap.get(selectedSeatCount);
  // 随机抽中的座位组的第一个座位编号，比如：AA1
  let selectedSeatCode = remainingSeatCodes[getRandom(remainingSeatCodes.length)];

  resSeatCodes = calcRandomSeats(selectedSeatCode, selectedSeatCount, applyCount)
  return resSeatCodes;
}


/**
 * 随机从连续座位中抽取连续的座位
 * @param startSeatCode 已选中的连续座位组的第一个座位编号
 * @param remainingSeatsCount 该连续座位组剩余的座位数量
 * @param applyCount 用户申请的座位数量
 * @returns {Array} 随机选中的连续的座位号，也就是最后的结果
 */
function calcRandomSeats(startSeatCode, remainingSeatsCount, applyCount) {
  let resSeatCodes = [];
  // 随机偏移量
  let offset = getRandom(remainingSeatsCount - applyCount);
  // 将抽中的座位编号的区行和列分开
  let areaAndRowCode = startSeatCode.substring(0, 2);
  let columnCode = Number(startSeatCode.substring(2));
  // 随机抽中的座位组的第一个座位编号，比如：AA1
  let selectedColumnCode = columnCode + offset;


  for (let i = 0; i < applyCount; i++) {
    resSeatCodes.push(`${areaAndRowCode}${selectedColumnCode + i}`);
  }

  return resSeatCodes;

}
