<template>
  <div class="table-container">
    <table>
      <!-- thead -->
      <thead>
        <tr>
          <th v-for="(th, index) in thead" :key="index" class="title t-table">
            {{ th }}
          </th>
        </tr>
      </thead>
      <!-- tbody -->
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class TableComponent extends Vue {
  @Prop({ required: true, type: Array }) thead!: []
}
</script>

<style lang="scss">
.table-container {
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
