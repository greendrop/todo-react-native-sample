import assert from 'power-assert'
import { datetime, truncate } from '../../lib/filters'

describe('filters', () => {
  describe('datetime', () => {
    test('returns datetime string', () => {
      const date = new Date('2020-01-01T12:00:00')
      assert.equal(datetime(date), '2020/01/01 12:00')
    })
  })

  describe('truncate', () => {
    test('returns truncate string', () => {
      const value = 'a'.repeat(50)
      assert.equal(truncate(value), 'a'.repeat(20) + '...')
    })
  })
})
