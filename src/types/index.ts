export type TextItemId = number
export type TextItem = {
  text: string
  accuracy: number
  errorsCount: number
  charsPerMinute: number
  id: TextItemId
}

export type TextItemsList = TextItem[]

export type NewTextItem = Omit<TextItem, 'id'>

export type LSDeleteRecordKey = 'all' | TextItemId
