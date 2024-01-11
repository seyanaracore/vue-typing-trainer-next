<template>
  <div class="info-block">
    <p>
      Ошибок: <span>{{ errorsCount }}</span>
    </p>
    <p>
      Точность: <span>{{ accuracy }}%</span>
    </p>
    <p>
      Знаков в минуту: <span>{{ charsPerMinute }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    errorsCount: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    charsPerMinute: {
      type: Number,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.info-block {
  display: flex;

  & > p {
    margin-bottom: 0;
  }

  & > p:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
