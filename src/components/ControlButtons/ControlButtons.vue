<template>
  <div class="control-buttons-container">
    <UiButton @click="newTextHandler">Новый текст</UiButton>
    <UiButton
      @click="resetProgressHandler"
      color-type="btn-warning"
    >
      Сброс
    </UiButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiButton from '../UI/UiButton'

export default defineComponent({
  components: { UiButton },

  emits: ['resetProgress', 'newText'],

  methods: {
    newTextHandler() {
      this.$emit('newText')
    },
    resetProgressHandler() {
      this.$emit('resetProgress')
    },
  },
})
</script>

<style scoped>
.control-buttons-container *:not(:first-child) {
  margin-left: 20px;
}
</style>
