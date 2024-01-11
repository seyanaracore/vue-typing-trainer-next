class LocalStorageUtil {
  // eslint-disable-next-line consistent-return
  static get(key: string) {
    if (!key) return undefined

    try {
      return JSON.parse(localStorage.getItem(key) as any)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  static set(value: any, key: string) {
    if (!key) return

    localStorage.setItem(key, JSON.stringify(value))
  }

  static delete(key: string) {
    if (!key) return

    localStorage.removeItem(key)
  }
}

export default LocalStorageUtil
