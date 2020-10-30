import crypto from 'crypto'

export const concatenate = (...fragments: (string | null | undefined | false)[]): string => {
  return fragments.filter(Boolean).join(' ')
}

export type Hash = {
  iv: string
  encryptedData: string
}

export const encrypt = (text: string, key: Buffer): Hash => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  const encrypted = cipher.update(text)
  const encryptedData = Buffer.concat([encrypted, cipher.final()])
  return { iv: iv.toString('hex'), encryptedData: encryptedData.toString('hex') }
}

export const decrypt = (hash: Hash, key: Buffer): string => {
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(hash.iv, 'hex'))
    const decryptedData = Buffer.concat([
      decipher.update(Buffer.from(hash.encryptedData, 'hex')),
      decipher.final(),
    ])
    return decryptedData.toString()
  } catch (error) {
    throw new Error('Failed to decrypt')
  }
}

export const kebabify = (str: string): string => {
  return str ? str.trim().replace('-', ' ').replace(/ /g, '-') : ''
}

export const dekebabify = (str: string): string => {
  return str ? str.trim().replace(/-/g, ' ') : ''
}
