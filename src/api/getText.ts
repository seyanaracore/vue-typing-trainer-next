import Api from '@/utils/api'
import { API_URL, SENTENCES_COUNT } from '@/constants'

async function getText(url = API_URL, sentences = SENTENCES_COUNT) {
  const response = await Api.get(`${url}?type=all-meat&sentences=${sentences}`)

  return response
}

export default getText
