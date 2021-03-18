<template>
  <div v-if="alertType !== null" class="alert" :class="alertType">
    <IconBase width="24" height="24" fill="var(--bg-component-primary)" class="item-icon" view-box="0 0 24 24">
      <path v-if="alertType === 'success'" :d="iconSuccess" />
      <path v-if="alertType === 'error'" :d="iconError" />
    </IconBase>
    <p class="subtitle text-alert">
      {{ alertValue }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mdiCheckCircle, mdiAlertCircleOutline } from '@mdi/js'
import AlertStore from '@/store/alert'

@Component
export default class Alert extends Vue {
  alert = AlertStore.context(this.$store)
  iconSuccess: string = mdiCheckCircle
  iconError: string = mdiAlertCircleOutline

  get alertType (): any {
    return this.alert.getters.getAlertType
  }

  get alertValue (): any {
    return this.alert.getters.getAlertValue
  }
}
</script>

<style lang="scss" scoped>
.alert {
  transition: .3s ease-in-out;
  width: 280px;
  border-radius: 8px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  padding: 15px;
  justify-content: flex-start;
  align-items: center;
  z-index: 5;
}
.text-alert {
  margin-bottom: 0;
  color: var(--logo-background-white);
  font-weight: 300;
}
  .success {
    background: var(--buttons-success);
  }
  .error {
    background: var(--buttons-danger);
  }
</style>
