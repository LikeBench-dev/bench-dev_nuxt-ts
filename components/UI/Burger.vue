<template>
  <div
    class="burger"
    @click="$emit('clickBurger')"
  >
    <span />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({

})
export default class burger extends Vue {

}
</script>

<style lang="scss">
.burger {
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 4.3em;
  left: 1.4em;
  z-index: 22;
  &::before, &::after {
    content: '';
    background: var(--text-write-primary);
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    transition: all 0.3s ease 0s;
  }
  &::before {
    top: 7px;
  }
  &::after {
    bottom: 3px;
  }
  span {
    background: var(--text-write-primary);
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    top: 16px;
    transition: all 0.3s ease 0s;
  }
  &.active:before {
    transform: rotate(45deg);
    top: 16px;
  }
  &.active:after {
    transform: rotate(-45deg);
    bottom: 12px;
  }
  &.active span {
    transform: scale(0);
  }
  @include mq(md, min) {
    display: none;
  }
  &.active span, &.active:after, &.active:before {
    background: var(--text-write-primary);
  }
}
</style>
