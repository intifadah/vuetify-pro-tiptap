import { Strike as TiptapStrike } from '@tiptap/extension-strike'
import ActionButton from './components/ActionButton.vue'
import type { StrikeOptions as TiptapStrikeOptions } from '@tiptap/extension-strike'
import type { ButtonView, GeneralOptions } from '@/type'

export interface StrikeOptions extends TiptapStrikeOptions, GeneralOptions {
  button: ButtonView
}

export const Strike = /* @__PURE__*/ TiptapStrike.extend<StrikeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleStrike(),
          isActive: () => editor.isActive('strike') || false,
          icon: 'strike',
          tooltip: t('editor.strike.tooltip')
        }
      })
    }
  }
})
