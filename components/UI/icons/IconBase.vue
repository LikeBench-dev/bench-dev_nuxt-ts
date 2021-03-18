<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :fill="fill"
    @click="clickAct"
  >
    <slot />

  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class IconBase extends Vue {
    @Prop({ required: false, type: [Number, String], default: 74 }) width!: string | number
    @Prop({ required: false, type: [Number, String], default: 74 }) height!: string | number
    @Prop({ required: false, type: [Number, String], default: 'none' }) fill!: string | number
    @Prop({ required: false, type: [Number, String], default: '0 0 74 74' }) viewBox!: string | number

    public clickAct (e: any): void {
      this.$emit('click', e)
    }
}

</script>
