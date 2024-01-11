<template>
  <div>
    <hr />
    <h4>Предыдущие результаты:</h4>
    <div v-if="historyList.length">
      <table class="table">
        <thead>
          <tr>
            <td class="text-col">Текст</td>
            <td>Точность</td>
            <td>Знаков в минуту</td>
            <td>Ошибок</td>
            <td />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="textItem in historyList"
            :key="textItem.id"
          >
            <td class="text-col">{{ textItem.text }}</td>
            <td>{{ textItem.accuracy }}%</td>
            <td>{{ textItem.charsPerMinute }}</td>
            <td>{{ textItem.errorsCount }}</td>
            <td>
              <UiButton
                color-type="btn-danger"
                class="remove-btn"
                @click="() => deleteHistoryRecord(textItem)"
              >
                X
              </UiButton>
            </td>
          </tr>
        </tbody>
      </table>
      <UiButton
        @click="clearHistory"
        color-type="btn-danger"
      >
        Удалить всё
      </UiButton>
    </div>
    <h4
      v-else
      class="text-center"
    >
      Список пуст...
    </h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiButton from '../UI/UiButton'
import type { PropType } from 'vue'
import type { TextItem, TextItemsList } from '@/types'

export default defineComponent({
  components: { UiButton },

  emits: ['deleteRecords'],

  props: {
    historyList: {
      type: Array as PropType<TextItemsList>,
      required: true,
      default: () => [],
    },
  },

  methods: {
    deleteHistoryRecord(item: TextItem) {
      this.$emit('deleteRecords', item.id)
    },
    clearHistory() {
      this.$emit('deleteRecords', 'all')
    },
  },
})
</script>

<style lang="scss" scoped>
.text-col {
  width: 600px;
}

.remove-btn {
  padding: 5px 10px !important;
  font-size: 10px !important;
}
</style>
