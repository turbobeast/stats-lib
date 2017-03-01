const test = require('ava')
const { mean, variance, range, deviation, median, interquartileRange, mode } = require('../src/lib.js')

test('mean', (t) => {
  t.is(mean(10,12,14), 12)
  t.is(mean(8, 9, 10, 11, 12), 10)
  t.is(mean(48670, 57320, 38150, 41290, 53160), 47718)
  t.is(~~mean(48670, 57320, 38150, 41290, 53160, 500000), 123098)
})

test('variance', (t) => {
  t.is(variance(8, 9, 10, 11, 12), 2)
  t.is(variance(-10, 0, 10, 20, 30), 200)
})

test('deviation', (t) => {
  t.is(deviation(-10, 0, 10, 20, 30), Math.sqrt(200))
  t.is(deviation(8, 9, 10, 11, 12), Math.sqrt(2))
})

test('range', (t) => {
  t.is(range(2,12,20,42), 40)
})

test('median', (t) => {
  t.is(median(3,4,5,6,7), 5)
  t.is(median(4),4)
  t.is(median(1,2,3,4,6,7,8,9), 5)
  t.is(median(48670, 57320, 38150, 41290, 53160), 48670)
  t.is(median(48670, 57320, 38150, 41290, 53160, 500000), 50915)
})

test('interquartileRange', (t) => {
  t.is(interquartileRange(1,2,3,4,5), 3)
  t.is(interquartileRange(2,2,4,4), 2)
  t.is(interquartileRange(1,3,3,3,12,12,13,18), 9.5)
  t.is(interquartileRange(2,5,9), 7)
  t.is(interquartileRange(2,4,5,5,6,7,
                          8,8,9,15,17,22), 7)
  t.is(interquartileRange(2,4,5,5,6,7,8,
                          8,8,9,15,17,22), 7)
})

test('mode', (t) => {
  t.is(mode(1,2,3,4,4,4,4,4,5,5,5,6,6,7,7,7,8), 4)
  t.is(mode(1,1,2,3), 1)
  t.is(mode(1,2,2,2,2,2,3,3,3,3), 2)
  t.is(mode(2,4,5,2,1,4,7,2,5,3,8,3,8,0,3,2,3,6,5,2,1,3), 3)
  t.is(mode(0), 0)
})

