<template>
  <div>
    <p v-show="isInvalidLayout">Неверная раскладка</p>
    <typing-field
      @input-handler="handleFieldInput"
      :text-for-typing="textForTyping"
      :is-input-error="isInputError"
      :expected-char-index="expectedCharIndex"
      ref="typingField"
    />
    <aside class="d-flex justify-content-between align-items-center m-2">
      <typing-info
        :errors-count="errorsCount"
        :accuracy="accuracy"
        :chars-per-minute="charsPerMinute"
      />
      <control-buttons
        @reset-progress="resetProgress"
        @new-text="newText"
      />
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { clone } from 'lodash'
import TypingField from '../TypingField'
import TypingInfo from '../TypingInfo'
import ControlButtons from '../ControlButtons'
import { EXCEPTIONS_KEYS } from '@/constants'
import layoutValidator from '@/utils/layoutValidator'

const initialState = {
  errorsCount: 0,
  charsPerSecond: 0,
  charsCountsListPerSecond: [] as number[],
  isInputStarted: false,
  isInvalidLayout: false,
  expectedCharIndex: 0,
  isInputError: false,
  cpmInterval: null as null | number,
}

export default defineComponent({
  components: { TypingField, TypingInfo, ControlButtons },

  props: {
    textForTyping: {
      type: String,
      required: true,
      default: '',
    },
  },

  emits: ['handleFinishTyping', 'newText'],

  data() {
    return {
      ...initialState,
    }
  },

  computed: {
    charsPerMinute(): number {
      const keysSummary = this.charsCountsListPerSecond.reduce((a, b) => a + b, 0)

      return Math.floor(keysSummary / this.charsCountsListPerSecond.length) * 60 || 0
    },
    accuracy(): number {
      const errorsPercent = +((this.errorsCount / this.textForTyping.length) * 100).toFixed(1)

      return 100 - errorsPercent || 100
    },
  },

  methods: {
    newText() {
      this.$emit('newText')
    },
    stopCharsWatcher() {
      if (!this.cpmInterval) return

      clearInterval(this.cpmInterval)
    },
    resetProgress() {
      this.stopCharsWatcher()

      Object.assign(this, clone(initialState))

      const typingField = this.$refs.typingField as null | typeof TypingField

      if (typingField) typingField.focusInput()
    },
    startCharsWatcher() {
      this.cpmInterval = setInterval(() => {
        this.charsCountsListPerSecond = [
          ...this.charsCountsListPerSecond.slice(-59),
          this.charsPerSecond,
        ]
        this.charsPerSecond = 0
      }, 1000)
    },

    handleFieldInput(e: KeyboardEvent) {
      const pressedKey = e.key
      const isExceptionKey = EXCEPTIONS_KEYS.includes(pressedKey)

      if (isExceptionKey) return
      if (!this.isInputStarted) this.isInputStarted = true

      this.isInvalidLayout = !layoutValidator(pressedKey)

      const exceptedKey = this.textForTyping[this.expectedCharIndex]

      if (pressedKey === exceptedKey) {
        this.expectedCharIndex += 1
        this.isInputError = false
        this.charsPerSecond += 1
      } else {
        if (this.isInputError) return
        this.errorsCount += 1
        this.isInputError = true
      }
    },
  },

  watch: {
    isInputStarted: {
      handler() {
        if (this.isInputStarted) this.startCharsWatcher()
        else this.stopCharsWatcher()
      },
    },
    expectedCharIndex: {
      handler() {
        if (this.textForTyping.length && this.expectedCharIndex === this.textForTyping.length) {
          const typingResult = {
            text: this.textForTyping,
            accuracy: this.accuracy,
            errorsCount: this.errorsCount,
            charsPerMinute: this.charsPerMinute,
          }

          this.$emit('handleFinishTyping', typingResult)
        }
      },
    },
  },

  beforeUnmount() {
    this.stopCharsWatcher()
  },
})
</script>
