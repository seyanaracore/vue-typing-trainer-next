/* eslint-disable no-underscore-dangle */
class Api {
  // eslint-disable-next-line class-methods-use-this
  _request(url: string, method: RequestInit['method']) {
    return fetch(url, { method })
  }

  async get(url: string) {
    const response = await this._request(url, 'GET')

    return response.json()

    // try {
    //   const response = await this.#request(url, 'GET')
    //   return response.json()
    // } catch (e) {
    //   console.log('ошибка' + e)
    //   console.error(e)
    //   return e
    // }
  }
}

export default new Api()
