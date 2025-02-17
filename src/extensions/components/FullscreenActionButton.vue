<script setup lang="ts">
import { unref, computed } from 'vue'
import { getIcon } from '@/constants/icons'
import { ButtonViewReturnComponentProps } from '@/type'

import { useLocale } from '@/locales'
import { useContext } from '@/hooks/use-context'

const { t } = useLocale()
const { state, toggleFullscreen } = useContext()

interface Props {
  disabled?: boolean
  color?: string
  isActive?: ButtonViewReturnComponentProps['isActive']
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: undefined,
  isActive: undefined
})

const text = computed(() => {
  const tooltip = state.isFullscreen ? 'editor.fullscreen.tooltip.exit' : 'editor.fullscreen.tooltip.fullscreen'
  if (!tooltip) return undefined
  return unref(t)(tooltip)
})

const icon = computed(() => {
  const _icon = state.isFullscreen ? 'fullscreenExit' : 'fullscreen'
  return getIcon(_icon)
})

function onAction() {
  toggleFullscreen()

  if (state.isFullscreen) {
    document.documentElement.classList.add('overflow-y-hidden')
  } else {
    document.documentElement.classList.remove('overflow-y-hidden')
  }
}
</script>

<template>
  <VBtn
    class="rounded me-1 ms-0"
    density="comfortable"
    size="small"
    :disabled="disabled"
    :color="color"
    icon
    :class="{
      'v-btn--active': isActive?.()
    }"
    @click="onAction"
  >
    <VIcon :icon="icon"></VIcon>
    <VTooltip :eager="false" activator="parent" location="top" :text="text" />
    <slot></slot>
  </VBtn>
</template>
