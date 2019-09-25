import models from '../models';
import { formatSeatsToSeatsMap, getRandomSeat } from '../utils/ticketAllocate';

const ticketInput = async (resolve, root, args, context, info) => {
  const { input: { phone, ticketsCout } } = args;

  const uerHasBuyTickets = await models.Ticket.findOne({
    where: {
      phone
    }
  })
  // 如果已经存在，则直接返回
  if (uerHasBuyTickets) {
    const resData = {
      ticket: {
        phone,
        seatCodes: uerHasBuyTickets.seatCodes
      }
    }
    await resolve(root, resData, context, info)
    return resData
  }

  // 如果不存在则需要分配座位和更新数据库
  // 读取所有空余座位数量，然后转化为map对象
  const allRemainingSeats = await models.Seat.findAll();
  const allRemainingSeatsMap = formatSeatsToSeatsMap(allRemainingSeats);
  // 关键！根据map对象数据和申请数量计算出座位号
  const { resSeatCodes, dbEffects } = getRandomSeat(allRemainingSeatsMap, ticketsCout);
  const resSeatCodesStr = resSeatCodes.join(',');
  // 创建用户订票数据
  await models.Ticket.create({ phone, seatCodes: resSeatCodesStr });
  // 同步剩余座位数据到数据库
  for (var i = 0; i < dbEffects.length; i++) {
    let item = dbEffects[i];
    switch (item.tag) {
      case 'del':
        await models.Seat.destroy(
          {where: { seatLen: item.seatLen }}
        );
        break;
      case 'update':
        await models.Seat.upsert(
          { seatLen: item.seatLen, seatCodes: item.seatCodes },
          {fields: ['seatLen', 'seatCodes']}
        );
        break;
      case 'create':
        await models.Seat.create(
          { seatLen: item.seatLen, seatCodes: item.seatCodes}
        );
        break;
      default:
        break;
    }
  }

  const resData = {
    ticket: {
      phone,
      seatCodes: resSeatCodesStr
    }
  }
  await resolve(root, resData, context, info)
  return resData
}

export const ticketMiddleware = {
  Mutation: {
    buyTickets: ticketInput
  }
}
