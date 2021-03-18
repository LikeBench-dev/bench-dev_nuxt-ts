<template>
  <div class="switch-container">
    <button class="switch__btn" @click="changeTheme">
      <span class="check">
        <span class="check__item material-icons md-light">lightbulb_outline</span>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ThemeStore from '@/store/theme'

@Component
export default class ToggleSwitcher extends Vue {
  store = ThemeStore.context(this.$store)

  get forSwitch (): string {
    const check = this.store.getters.getTheme
    return `${check}`
  }

  changeTheme (): Promise<any> {
    const theme: string = this.forSwitch === 'theme-light' ? 'theme-dark' : 'theme-light'
    return this.store.actions.changeTheme(theme)
  }
}
</script>

<style lang="scss">
.switch-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include mq(md) {
    justify-content: flex-start;
  }
}
.switch__btn {
  background-color: transparent;
  cursor: pointer;
}
.check__item {
  display: block;
  text-align: center;
  z-index: 5;
  font-size: 24px;
  color: var(--switch-color-primary);
  transition: .5s;
}
.check {
  position: relative;
  width: 50px;
  height: 50px;
  background: var(--switch-background-primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.check:before {
  position: absolute;
  top: 18px;
  content: '';
  width: 8px;
  height: 10px;
  border-radius: 50%;
  background: var(--switch-background-secondary);
  transition: .5s;
  z-index: 3;
  box-shadow: var(--switch-boxshadow-primary);
}
.check:after {
  position: absolute;
  content: '';
  top: 6px;
  left: 6px;
  bottom: 6px;
  right: 6px;
  background: var(--switch-background-ternary);
  border-radius: 50%;
  z-index: 2;
  border: 2px solid var(--switch-border-primary);
}
</style>
