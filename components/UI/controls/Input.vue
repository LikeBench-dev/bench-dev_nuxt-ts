<template>
  <div class="input-field">
    <input
      v-bind="$attrs"
      :value="value"
      :type="type"
      :required="required"
      class="input"
      :class="{validInput: value}"
      @input="$emit('input', $event.target.value)"
      @change="singleChange"
    >
    <label :class="{valid: value}"><slot /></label>
    <span :class="{valid: value}" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  emits: ['input'],

  methods: {
    singleChange (e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="scss" scoped>

.input-field {
  position: relative;
  height: 46px;
  width: 100%;
  margin: 0 auto 20px 0;
  display: flex;
  align-items: center
}
.input-field input {
  position: absolute;
  background: transparent;
  border: none;
  box-shadow: none;
  font-size: 16px;
  color: var(--input-text-primary);
  width: 100%;
  height: 100%;
  padding: 4px 8px;
}
.input-field label {
  padding: 4px 8px;
  position: absolute;
  margin: 0 auto;
  color: #cacfd7;
  pointer-events: none;
  display: block;
  transition: .5s;
}

.validInput + label {
  &.valid {
    transform: translateY(-23px);
    font-size: 14px;
    color: var(--label-color-primary);
    padding: 2px 4px;
    font-weight: 400;
  }
}

.input-field span {
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  background: var(--input-border-default);
  width: 100%;
  height: 2px;
}

.input-field span:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00b0ff;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .5s ease-in-out;
}

.validInput ~ .valid {
  &:before {
    transform: scaleX(1);
    transform-origin: left;
    transition: transform .5s ease-in-out;
  }
}

</style>
