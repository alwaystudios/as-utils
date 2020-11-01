import { concatenate, decrypt, dekebabify, encrypt, kebabify, sentenceCase } from './strings'
import crypto from 'crypto'

describe('strings', () => {
  describe('concatenate', () => {
    it('joins fragments', () => {
      expect(concatenate('a', 'b', 'c')).toBe('a b c')
    })

    it('joins fragments omitting falsy elements', () => {
      expect(concatenate('a', 'b', '', null, false, undefined, 'c')).toBe('a b c')
    })
  })

  describe('encrypt / decrypt', () => {
    it('encrypts, then decrypts a string', () => {
      const key = crypto.randomBytes(32)
      const dataToEncrypt = 'some secret string'

      const hash = encrypt(dataToEncrypt, key)
      expect(hash).toEqual({
        encryptedData: expect.not.stringMatching(dataToEncrypt),
        iv: expect.any(String),
      })

      const decryptedData = decrypt(hash, key)
      expect(decryptedData).toEqual(dataToEncrypt)
    })

    it('fails to decrypt given the wrong key', () => {
      const dataToEncrypt = 'some secret string'
      const hash = encrypt(dataToEncrypt, crypto.randomBytes(32))
      const wrongKey = crypto.randomBytes(32)
      expect(() => decrypt(hash, wrongKey)).toThrowError('Failed to decrypt')
    })

    it('fails to decrypt given the wrong iv', () => {
      const key = crypto.randomBytes(32)
      const dataToEncrypt = 'some secret string'
      const hash = encrypt(dataToEncrypt, key)
      expect(() => decrypt({ ...hash, iv: 'this is not the iv' }, key)).toThrowError(
        'Failed to decrypt',
      )
    })
  })

  describe('kebabify / dekebabify', () => {
    it('kebabifies replacing hyphens', () => {
      expect(kebabify('  nice-and-easy spaghetti bolognese  ')).toBe(
        'nice-and-easy-spaghetti-bolognese',
      )
    })

    it('kebabifies', () => {
      expect(kebabify('  nice and easy spaghetti bolognese  ')).toBe(
        'nice-and-easy-spaghetti-bolognese',
      )
    })

    it('dekebabifies', () => {
      expect(dekebabify('  nice-and-easy-spaghetti-bolognese  ')).toBe(
        'nice and easy spaghetti bolognese',
      )
    })
  })

  describe('sentence case', () => {
    it('trims and capitalises the first character of a sentence', () => {
      expect(sentenceCase('  the cat sat on the mat  ')).toBe('The cat sat on the mat')
    })
  })
})
