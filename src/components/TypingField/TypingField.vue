<template>
  <div
    class="input-field-container py-1"
    role="textbox"
    tabIndex="-1"
    @keydown="handleKeyDown"
    ref="inputField"
  >
    <span
      v-for="(char, idx) in charsList"
      :key="idx"
      :class="{
        'available-char': idx === expectedCharIndex,
        'wrong-char': isInputError && idx === expectedCharIndex,
        'entered-char': idx < expectedCharIndex,
      }"
    >
      {{ char }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    textForTyping: {
      type: String,
      required: true,
    },
    expectedCharIndex: {
      type: Number,
      required: true,
    },
    isInputError: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['inputHandler'],

  computed: {
    charsList(): string[] {
      return this.textForTyping.split('')
    },
  },

  methods: {
    handleKeyDown(e: KeyboardEvent) {
      this.$emit('inputHandler', e)
    },
    focusInput() {
      const input = this.$refs.inputField as HTMLInputElement

      input.focus()
    },
  },

  mounted() {
    this.focusInput()
  },
})
</script>

<style lang="scss" scoped>
$error-color: #f36747;

.input-field-container {
  font-size: 20px;
  line-height: 28px;

  &:focus {
    outline: none;
  }
}

.entered-char {
  color: green;
}

.available-char {
  color: white;
  background-color: green;
}

.wrong-char {
  color: white;
  background-color: $error-color;
}
</style>
