<template>
  <div id="app">
    <div class="app-container">
      <header>
        <h1>Тренажёр печати</h1>
      </header>
      <div
        v-if="isLoading"
        class="loader-container"
      >
        <loader />
      </div>
      <div v-else-if="fetchError">
        <h3 class="text-danger py-2">Произошла ошибка...</h3>
        <UiButton @click="fetchText">Попробовать снова</UiButton>
      </div>
      <typing-trainer-container
        v-else
        :text-for-typing="textForTyping"
        @handle-finish-typing="handleFinishTyping"
        @new-text="fetchText"
        @remove-typing-history="removeRecord"
      />
      <texts-history
        :history-list="typingTextsHistoryList"
        @delete-records="removeRecord"
      />
    </div>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import { defineComponent } from 'vue'
import LocalStorageUtil from './utils/localStorageUtil'
import getText from './api/getText'
import Loader from './components/UI/UiLoader'
import TypingTrainerContainer from './components/TypingTrainerContainer'
import TextsHistory from './components/TextsHistory'
import { LOCAL_TYPING_RESULTS_KEY } from './constants'
import UiButton from './components/UI/UiButton'
import type { LSDeleteRecordKey, NewTextItem, TextItemsList } from './types'

export default defineComponent({
  name: 'App',
  components: { Loader, TypingTrainerContainer, TextsHistory, UiButton },

  data() {
    return {
      textForTyping: '',
      fetchError: false,
      isLoading: false,
      typingTextsHistoryList: [] as TextItemsList,
    }
  },

  methods: {
    async fetchText() {
      this.isLoading = true

      try {
        const response = await getText()
        const [text] = response

        this.textForTyping = text
      } catch (e) {
        this.fetchError = true
      }

      this.isLoading = false
    },
    saveTypingResult(typeResult: NewTextItem) {
      const id = this.typingTextsHistoryList.length ? this.typingTextsHistoryList.at(-1)!.id + 1 : 1

      const typeResultWithId = {
        ...typeResult,
        id,
      }

      LocalStorageUtil.set(
        [...this.typingTextsHistoryList, typeResultWithId],
        LOCAL_TYPING_RESULTS_KEY
      )
      this.getTypingsHistory()
    },
    getTypingsHistory() {
      this.typingTextsHistoryList = LocalStorageUtil.get(LOCAL_TYPING_RESULTS_KEY) || []
    },
    removeRecord(record: LSDeleteRecordKey) {
      if (record === 'all') {
        LocalStorageUtil.delete(LOCAL_TYPING_RESULTS_KEY)
      } else {
        const filteredHistory = this.typingTextsHistoryList.filter((text) => text.id !== record)

        this.typingTextsHistoryList = filteredHistory

        LocalStorageUtil.set(filteredHistory, LOCAL_TYPING_RESULTS_KEY)
      }

      this.getTypingsHistory()
    },
    handleFinishTyping(typingResult: NewTextItem) {
      this.saveTypingResult(typingResult)
      this.fetchText()
    },
  },

  created() {
    this.fetchText()
    this.getTypingsHistory()
  },
})
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;

  min-width: 800px;
  min-height: 100vh;
  padding: 0 12px;

  background: rgb(180 180 182);
  background: linear-gradient(
    90deg,
    rgb(180 180 182 / 100%) 0%,
    rgb(22 129 122 / 100%) 56%,
    rgb(60 133 99 / 100%) 100%
  );
}

.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 100px auto 12px;
  padding: 24px;

  background-color: white;
  border: 1px solid #73ccfb;
  border-radius: 25px;
  box-shadow:
    rgb(60 64 67 / 30%) 0 1px 2px 0,
    rgb(60 64 67 / 15%) 0 2px 6px 2px;
}

.loader-container {
  width: 100%;
  text-align: center;
}
</style>
