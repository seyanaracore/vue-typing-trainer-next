<template>
  <button
    class="btn"
    type="button"
    :class="colorType"
    @click="clickHandler"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonUi',

  emits: ['click'],

  props: {
    colorType: {
      type: String,
      default: 'btn-primary',
    },
  },

  methods: {
    clickHandler() {
      this.$emit('click')
    },
  },
})
</script>
