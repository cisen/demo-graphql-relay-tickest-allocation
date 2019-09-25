/**
 * 算法说明
 * - 输入变量：座位的Map对象（remainingSeatsMap）和用户购买的票数（applyCount）
 * - 返回值：分配给用户的座位号编码数组，数据库操作副作用
 *
 * - 座位Map对象结构说明
 * - - key，是空余的连续座位数量，是length。比如一开始值是50，52...100
 * - - value, 是以每一组空余连续座位的第一个座位编码为单元的数组，比如，初始化时是：[AA1, BA1, CA1, DA1]
 * - - k-v, 总结就是：50 -> [AA1, BA1, CA1, DA1]
 *
 * - 主要逻辑：
 * - 如果刚好有剩余连续座位数**等于**申请座位数（随机分配有同等数量的连续座位号）
 * - - 随机从该key对应的value中，选择一个座位编码
 * - - 根据申请座位数和第一个座位编码，生成分配结果座位编码
 * - - 从座位Map对应的key中删除该选中的座位编码，将分配结果和数据库操作返回
 * - 否则，如果有剩余连续座位数**大于**申请座位数（从大于的里面随机抽取分配给申请数）
 * - - 将所有大于申请座位数的key都插入数组，然后从该数组中随机抽取一个key
 * - - 再随机从该key对应的value中，选择一个座位编码
 * - - 根据选择的座位编码，然后用申请座位数去随机截取一段连续的座位号，如果产生左边或右边新连续座位号，则更新到Map中
 * - - 根据申请座位数和截取到的第一个座位编码，生成分配结果座位编码
 * - - 从座位Map对应的key中删除该选中的座位编码，将分配结果和数据库操作返回
* - 否则，如果有剩余连续座位数**小于**申请座位数（排序，优先分配剩余大的给申请数，递归分配）
 * - - 将key都插入数组，然后排序
 * - - 递归开始，在最大的key对应的value中，随机选择一个座位编码
 * - - 根据选择的座位编码和剩余长度，生成一段连续座位号，返回现在分配结合递归结果的结果
 * - - 从座位Map对应的key中删除该选中的座位编码，将分配结果和数据库操作返回
 * - - 递归上面的分配
 *
 * - 技巧
 * - - 利用引用数据，在各个函数执行域存储数据库副作用dbEffects，操作全局座位Map对象
 *
 */

import { getRandom, decoABC, encoABC } from './utils';

/**
 * 生成默认座位数据，如[{seatLen: 50, seatCodes: 'AY23'}, ...]
 * 50为剩余连续座位数
 * 座位编码第一个字母如A为区域，第二个如Y为行编码，后面数字为列编码
 *
 * @returns {Array} 以空余连续座位数量为key，各个空余座位组的第一个座位编号数组字符串为value的map对象
 *
 */
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

/**
 * 随机从连续座位中抽取连续的座位
 *
 * @param seats<Tickets> 存储在数据库的seatLen, seatCodes数组。第一次是buildDefaultSeats的返回结果
 *
 * @returns {Map} 以空余连续座位数量为key，各个空余座位组的第一个座位编号数组字符串为value的map对象
 *
 */
export function formatSeatsToSeatsMap(seats) {
  let seatsMap = new Map();

  seats.forEach(item => {
    seatsMap.set(item.seatLen, item.seatCodes.split(','));
  })
  return seatsMap;
}

/**
 * 随机从连续座位中抽取连续的座位
 * 因为这里的所有操作都是针对map而非db的，所以可用将变化的数据收集起来，再批量更新到db
 *
 * @param remainingSeatsMap 以空余连续座位数量为key，各个空余座位组的第一个座位编号数组字符串为value的map对象
 * @param applyCount 用户申请的座位数量
 * @param resSeatCodes 结果座位编码
 * @param dbEffects 对数据库操作的副作用, tag：update, create, del;
 *
 * @returns {{Array, Array}} 随机选中的连续的座位号，也就是最后的结果
 *
 */
export function getRandomSeat(remainingSeatsMap, applyCount, dbEffects = []) {
  // 结果数组
  let resSeatCodes = [];
  // 随机选中的连续空余座位数量，比如4
  let selectedSeatCount;
  // 空余的连续座位组的第一个位置的集合，比如[AA1, BA1]
  let remainingSeatCodes = [];
  // 随机抽中的座位组的第一个座位编号，比如：AA1
  let selectedSeatCode;
  // 如果没有相等的连续的空位，则随机抽取连续空位超过申请长度applyCount的key
  let remainingMaxSeatsKeys = [];
  // map里面所有的key
  let remainingSeatsKeys = [];
  // 将选中的key正序排序，用于如果申请长度超过所有剩余连续空余长度
  let remainingSeatsKeysSorted = [];

  // 如果刚好有数量相等的连续空位数的，则直接随机返回一个，特殊处理
  if (remainingSeatsMap.has(applyCount)) {
    remainingSeatCodes = remainingSeatsMap.get(applyCount);
    selectedSeatCode = remainingSeatCodes[getRandom(remainingSeatCodes.length - 1)];
    // 该连续长度剩余的座位
    let newRemainSeatsCodes = remainingSeatCodes.filter(code => code !== selectedSeatCode);

    return {
      resSeatCodes: calcRandomSeats(selectedSeatCode, applyCount, applyCount, remainingSeatsMap, dbEffects),
      dbEffects
    };
  }


  remainingSeatsMap.forEach((val, key) => {
    if (key > applyCount) remainingMaxSeatsKeys.push(key);
    remainingSeatsKeys.push(key);
  })
  remainingSeatsKeysSorted = remainingSeatsKeys.sort((a, b) => a - b);

  // 等于的情况上面已经判断，这里判断如果剩余有连续空座位大于申请数量的
  if (remainingSeatsKeysSorted[remainingSeatsKeysSorted.length - 1] > applyCount) {
    selectedSeatCount = remainingMaxSeatsKeys[getRandom(remainingMaxSeatsKeys.length - 1)];
    remainingSeatCodes = remainingSeatsMap.get(selectedSeatCount);
    selectedSeatCode = remainingSeatCodes[getRandom(remainingSeatCodes.length - 1)];

    // resSeatCodes = resSeatCodes.concat(calcRandomSeats(
    //   selectedSeatCode,
    //   selectedSeatCount,
    //   applyCount,
    //   remainingSeatsMap,
    //   dbEffects
    // ));

    return {
      resSeatCodes: calcRandomSeats(
        selectedSeatCode,
        selectedSeatCount,
        applyCount,
        remainingSeatsMap,
        dbEffects
      ),
      dbEffects
    };
  }

  // 如果剩余有连续空座位小于申请数量的，需要先分配最大连续座位数，然后再递归分配零散座位
  selectedSeatCount = remainingSeatsKeysSorted[remainingSeatsKeysSorted.length - 1];
  // 新的给递归的申请长度
  let newApplyCount = applyCount - selectedSeatCount;
  remainingSeatCodes = remainingSeatsMap.get(selectedSeatCount);
  selectedSeatCode = remainingSeatCodes[getRandom(remainingSeatCodes.length - 1)];
  // 这里注意，全部分配
  resSeatCodes = calcRandomSeats(
    selectedSeatCode,
    selectedSeatCount,
    selectedSeatCount,
    remainingSeatsMap,
    dbEffects
  );
  // 递归给剩余的继续申请,这里需要合并分开分配的数组
  let nextResSeatCodes = getRandomSeat(remainingSeatsMap, newApplyCount, dbEffects).resSeatCodes;
  return {
    resSeatCodes: resSeatCodes.concat(nextResSeatCodes),
    dbEffects
  };
}


/**
 * 随机从连续座位中抽取连续的座位
 *
 * @param startSeatCode 已选中的连续座位组的第一个座位编号
 * @param remainingSeatsCount 该连续座位组剩余的座位数量,必须大于或者等于applyCount
 * @param applyCount 用户申请的座位数量
 *
 * @returns {Array} 随机选中的连续的座位号，也就是最后的结果
 *
 */
function calcRandomSeats(startSeatCode, remainingSeatsCount, applyCount, remainingSeatsMap, dbEffects) {
  let resSeatCodes = [];
  // 随机偏移量,如果是从中间切开选择,会新产生的左长度
  let offset = getRandom(remainingSeatsCount - applyCount);
  // 新产生的右空余长度
  let newRemainRightLen = remainingSeatsCount - offset - applyCount;
  // 将抽中的座位编号的区行和列分开
  let areaAndRowCode = startSeatCode.substring(0, 2);
  let columnCode = Number(startSeatCode.substring(2));
  // 随机抽中的座位组的第一个座位编号，比如：AA1
  let selectedColumnCode = columnCode + offset;
  // 该长度座位组去除这个之后，新的剩余座位组
  let newRemainSeatsCodes = remainingSeatsMap.get(remainingSeatsCount).filter(code => code !== startSeatCode);
  // 先生成新的长度，再删除旧的长度
  // 如果左边产生了新的空余
  if (offset > 0) {
    if (remainingSeatsMap.has(offset)) {
      remainingSeatsMap.get(offset).push(startSeatCode)
    } else {
      remainingSeatsMap.set(offset, [startSeatCode])
    }
    updateDBEffectAndMap(remainingSeatsMap, dbEffects, offset, remainingSeatsMap.get(offset))
  }

  // 如果右边产生了新的空余
  if (newRemainRightLen > 0) {
    // 右边新的开始座位号
    let newRightSeatStartCode = `${areaAndRowCode}${selectedColumnCode + applyCount}`
    if (remainingSeatsMap.has(newRemainRightLen)) {
      remainingSeatsMap.get(newRemainRightLen).push(newRightSeatStartCode)
    } else {
      remainingSeatsMap.set(newRemainRightLen, [newRightSeatStartCode])
    }
    updateDBEffectAndMap(remainingSeatsMap, dbEffects, newRemainRightLen, remainingSeatsMap.get(newRemainRightLen))
  }

  // 当前长度的当前连续座位组，无论如何都是要删除了的
  updateDBEffectAndMap(remainingSeatsMap, dbEffects, remainingSeatsCount, newRemainSeatsCodes)

  for (let i = 0; i < applyCount; i++) {
    resSeatCodes.push(`${areaAndRowCode}${selectedColumnCode + i}`);
  }

  return resSeatCodes;

}

/**
 * 更新全局map对象和dbEffect副作用
 *
 * @param remainingSeatsMap 全局map对象
 * @param dbEffects 数据库操作副作用
 * @param seatsLen 需要更新的座位数量的编码数组key
 * @param newRemainSeatsCodes 新的剩余连续空余座位数组，比如[AA1, AD2]
 *
 */
function updateDBEffectAndMap(remainingSeatsMap, dbEffects, seatsLen, newRemainSeatsCodes) {
  // 如果该长度没有剩余了, 则删除这个key
  if (!newRemainSeatsCodes || !newRemainSeatsCodes.length) {
    remainingSeatsMap.delete(seatsLen)
    dbEffects.push({
      tag: 'del',
      seatLen: seatsLen,
      seatCodes: ''
    })
    return;
  }
  // 如果之前没有存在这个key，则创建
  if (!remainingSeatsMap.has(seatsLen)) {
    remainingSeatsMap.set(seatsLen, newRemainSeatsCodes)
    dbEffects.push({
      tag: 'create',
      seatLen: seatsLen,
      seatCodes: newRemainSeatsCodes.join(',')
    })
    return;
  }
  // 如果都不是，则是修改
  remainingSeatsMap.set(seatsLen, newRemainSeatsCodes)
    dbEffects.push({
      tag: 'update',
      seatLen: seatsLen,
      seatCodes: newRemainSeatsCodes.join(',')
    })
    return;
}
