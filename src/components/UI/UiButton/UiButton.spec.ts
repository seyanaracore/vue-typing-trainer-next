import { render } from '@testing-library/vue'
import UiButton from './UiButton.vue'

test('testing uiButton', () => {
  const { debug } = render(UiButton)

  debug()
})
