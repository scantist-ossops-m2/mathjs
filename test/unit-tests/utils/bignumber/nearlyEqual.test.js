import { nearlyEqual } from '../../../../src/utils/bignumber/nearlyEqual.js'

import assert from 'assert'
import BigNumber from 'decimal.js'

describe('nearlyEqual', function () {
  it('should test whether two BigNumbers are nearly equal', function () {
    const epsilon = 1e-2
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.9), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.95), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.98), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.99), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.991), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(1.1), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(1.05), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(1.02), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(1.01), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(1), epsilon, epsilon * 1e-3), true)

    // smaller epsilon
    const epsilon2 = 1e-4
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.99), epsilon2, epsilon2 * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.999), epsilon2, epsilon2 * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1), new BigNumber(0.9999), epsilon2, epsilon2 * 1e-3), true)
  })

  it('should test whether a positive and negative number are nearly equal', function () {
    const epsilon = 1e-3
    assert.strictEqual(nearlyEqual(new BigNumber(1.2), new BigNumber(1.2), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1.2), new BigNumber(-1.2), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(-1.2), new BigNumber(1.2), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(-1.2), new BigNumber(-1.2), epsilon, epsilon * 1e-3), true)
  })

  it('should test whether two large numbers are nearly equal', function () {
    const epsilon = 1e-2
    assert.strictEqual(nearlyEqual(new BigNumber('1e500'), new BigNumber('0.90e500'), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber('1e500'), new BigNumber('0.95e500'), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber('1e500'), new BigNumber('0.98e500'), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber('1e500'), new BigNumber('0.99e500'), epsilon, epsilon * 1e-3), true)
  })

  it('should test whether two small numbers are nearly equal (always true)', function () {
    const epsilon = 1e-2
    assert.strictEqual(nearlyEqual(new BigNumber('1e-200'), new BigNumber('0.99e-200'), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber('1e-200'), new BigNumber('10e-200'), epsilon, epsilon * 1e-3), true)
  })

  it('should compare with zero', function () {
    const epsilon = 1e-3
    assert.strictEqual(nearlyEqual(new BigNumber(0), new BigNumber(0), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber(0), new BigNumber(-0), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber(0), new BigNumber(1.2), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(0), new BigNumber(1e30), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(0), new BigNumber(1e-3), epsilon, epsilon * 1e-3), false)
  })

  it('should compare with Infinity', function () {
    const epsilon = 1e-3

    assert.strictEqual(nearlyEqual(new BigNumber(1.2), new BigNumber(Infinity), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(Infinity), new BigNumber(1.2), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(Infinity), new BigNumber(Infinity), epsilon, epsilon * 1e-3), true)
    assert.strictEqual(nearlyEqual(new BigNumber(Infinity), new BigNumber(-Infinity), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(-Infinity), new BigNumber(Infinity), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(-Infinity), new BigNumber(-Infinity), epsilon, epsilon * 1e-3), true)
  })

  it('should compare with NaN', function () {
    const epsilon = 1e-3
    assert.strictEqual(nearlyEqual(new BigNumber(1.2), new BigNumber(NaN), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(NaN), new BigNumber(1.2), epsilon, epsilon * 1e-3), false)
    assert.strictEqual(nearlyEqual(new BigNumber(NaN), new BigNumber(NaN), epsilon, epsilon * 1e-3), false)
  })

  it('should use default values when absTol and relTol are undefined', function () {
    assert.strictEqual(nearlyEqual(new BigNumber(1.2), new BigNumber(1.2)), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1.2), new BigNumber(1.2), undefined), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1.2), new BigNumber(1.2), undefined, undefined), true)

    assert.strictEqual(nearlyEqual(new BigNumber(1.2).plus(1e-18), new BigNumber(1.2)), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1.2).plus(1e-18), new BigNumber(1.2), undefined), true)
    assert.strictEqual(nearlyEqual(new BigNumber(1.2).plus(1e-18), new BigNumber(1.2), undefined, undefined), true)

    assert.strictEqual(nearlyEqual(new BigNumber(1.2).plus(1e-8), new BigNumber(1.2)), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1.2).plus(1e-8), new BigNumber(1.2), undefined), false)
    assert.strictEqual(nearlyEqual(new BigNumber(1.2).plus(1e-8), new BigNumber(1.2), undefined, undefined), false)
  })
})
