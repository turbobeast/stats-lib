const {
  pipe,
  sub,
  swap,
  popshift,
  kwikSort,
  half,
  squares,
  twoChunks,
  mapTwoDArrayWith } = require('./utils')

const dists = (sm) => (...arr) => arr.map((a) => a - sm)
const mean = (...set) => set.reduce((a, b) => a + b) / set.length

const distsFromMean = (...set) => {
  const m = mean(...set)
  return pipe(dists(m))(...set)
}

const variance = (...set) => pipe(distsFromMean, squares, mean)(...set)
const standardDeviation = (...set) => pipe(variance, Math.sqrt)(...set)
const range = (...set) => pipe(kwikSort, popshift, sub)(...set)

const median = (...set) => {
  const h = half(...set)
  return pipe(kwikSort, (...sorted) => {
    return (set.length % 2 !== 0)
      ? pipe((...sorted) => sorted.slice(h, h + 1))(...sorted)
      : pipe((...sorted) => sorted.slice(h - 1, h + 1), mean)(...sorted)
  })(...set)
}

const getQuartiles = (...set) => {
  const h = half(...set)
  const [first, second] = pipe(kwikSort, twoChunks(h))(...set)
  return pipe(mapTwoDArrayWith(median))([first, second])
}

const interquartileRange = (...set) => pipe(getQuartiles, swap, sub)(...set)

const filterValues = (...set) => {
  const [ q1, q3 ] = getQuartiles(...set)
  return pipe(kwikSort, (...sorted) => sorted.filter((a) => a >= q1 && a <= q3))(...set)
}

const mode = (...set) => {
  let maxCount = 0
  const counterObj = {}
  return set.reduce((a, b) => {
    if (!counterObj[b]) {
      counterObj[b] = { count: 0 }
    }
    ++counterObj[b].count
    let mode = a
    if (counterObj[b].count > maxCount) {
      maxCount = counterObj[b].count
      mode = b
    }
    return mode
  })
}

module.exports = { mean, variance, standardDeviation, range, median, interquartileRange, filterValues, mode }
