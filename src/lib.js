const {
  pipe,
  sub,
  popshift,
  sortSet,
  half,
  twoChunks,
  mapVariance,
  mapTwoDArrayWith } = require('./utils')

const mean = (...set) => set.reduce((a, b) => a + b) / set.length

const variance = (...set) => {
  const varyMapped = pipe(mean, mapVariance)(...set)
  return pipe(varyMapped, mean)(...set)
}

const deviation = (...set) => pipe(variance, Math.sqrt)(...set)
const range = (...set) => pipe(sortSet, popshift, sub)(...set)

const median = (...set) => {
  const h = Math.floor(set.length * 0.5)
  return pipe(sortSet, (...sorted) => {
    return (set.length % 2 !== 0)
      ? pipe((...sorted) => sorted.slice(h, h + 1))(...sorted)
      : pipe((...sorted) => sorted.slice(h - 1, h + 1), mean)(...sorted)
  })(...set)
}

const interquartileRange = (...set) => {
  const twoSets = pipe(sortSet, twoChunks(half(...set)))(...set)
  return pipe(mapTwoDArrayWith(median), sub)(twoSets)
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

module.exports = { mean, variance, deviation, range, median, interquartileRange, mode }
