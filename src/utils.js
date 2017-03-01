function pipe (...funcs) {
  return function recurse (...vals) {
    if (!funcs.length) {
      return vals.length > 1
        ? vals
        : vals[0]
    }

    const nextVal = funcs.shift()(...vals)
    return (Array.isArray(nextVal))
      ? recurse(...nextVal)
      : recurse(nextVal)
  }
}

const sub = (one, two) => one - two
const popshift = (...set) => [set.pop(), set.shift()]
const sortSet = (...set) => [...set.sort((a, b) => a > b)]

const half = (...set) => Math.ceil(set.length * 0.5)
const twoChunks = (half) => (...set) => [set.slice(half), set.slice(0, half - 1)]
const mapVariance = (sm) => (...arr) => arr.map((a) => (a - sm) * (a - sm))
const mapTwoDArrayWith = (fn) => (ray) => ray.map((inner) => fn(...inner))

module.exports = { pipe, sub, popshift, sortSet, half, twoChunks, mapVariance, mapTwoDArrayWith }
