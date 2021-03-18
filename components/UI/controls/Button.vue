<template>
  <button
    class="btn"
    :class="btnClass"
    v-bind="$attrs"
    @click="clickAct"
  >
    <!--    slot-->
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    btnClass: {
      type: String,
      default: 'btn'
    }
  },
  methods: {
    clickAct (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">

.btn {
  display: block;
  background: var(--buttons-default);
  box-shadow: 0 1px 2px rgba(97, 97, 97, 0.2), 0 2px 4px rgba(97, 97, 97, 0.2);
  border-radius: 8px;
  color: var(--text-write-primary);
  padding: 4px 12px;
  //@include fsw($p3-font-sizes);
  font-weight: 400;
  cursor: pointer;
  text-align: center;
  min-height: 35px;
  min-width: 150px;
  max-width: 280px;
  margin-bottom: 20px;
  @include mq(sm) {
    margin-bottom: 0;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  &.exit {
    margin-bottom: 0;
  }
  &.b-text {
    text-transform: uppercase;
  }
  &.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &.btn-center {
    margin: 0 auto;
  }
  &.btn-left {
    margin-left: 0;
    margin-right: auto;
  }
  &.btn-right {
    margin-left: auto;
    margin-right: 0;
  }
  &:hover {
  background: var(--buttons-hover-default);
  }
  &.btn-primary {
    background: var(--buttons-primary);
    &:hover {
      background: var(--buttons-hover-primary);
    }
  }
  &.btn-success {
    background: var(--buttons-success);
    &:hover {
      background: var(--buttons-hover-success);
    }
  }
  &.btn-warning {
    background: var(--buttons-warning);
    &:hover {
      background: var(--buttons-hover-warning);
    }
  }
  &.btn-danger {
    background: var(--buttons-danger);
    &:hover {
      background: var(--buttons-hover-danger);
    }
  }
  &.login {
    max-width: 200px;
  }
  &.btn-link {
    min-height: 15px;
  }
}

.btn, .menu-link {
  &:hover,  &.nuxt-link-exact-active{
    //background: var(--buttons-hover-default);
    //color: var(--text-write-primary);
  }
}
</style>
