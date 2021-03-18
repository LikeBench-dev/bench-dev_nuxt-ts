<template>
  <div class="input-file-container">
    <input
      ref="upload"
      type="file"
      name="file-upload"
      :required="required"
      multiple=""
      class="inputFile"
      accept="image/jpeg, image/png"
      @change="onUploadFiles"
    >
    <div class="file-control">
      <label>{{ labelPlaceholder }}</label>
      <IconBase
        v-if="removeBtn"
        class="iconClose"
        width="24"
        height="24"
        view-box="0 0 24 24"
        @click="removeFile"
      >
        <path :d="iconClose" />
      </IconBase>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, InjectReactive } from 'nuxt-property-decorator'
import { mdiCloseOutline } from '@mdi/js'

@Component
export default class InputFile extends Vue {
  @InjectReactive() changeFile!: boolean

  @Prop({ required: false, type: String }) img!: string
  @Prop({ required: false, type: Boolean, default: true }) required!: boolean

  iconClose: string = mdiCloseOutline
  labelPlaceholder: string = this.img ? this.img : 'Файл не выбран'
  removeBtn: boolean = false

  private onUploadFiles (event: InputEvent): void {
    const files: Array<File> = [...(this.upload.files ? this.upload.files : [])]
    files.forEach((file) => {
      if (!file.type.match('image.*')) {
        this.labelPlaceholder = 'Неверный файл'
      }
      this.labelPlaceholder = file.name
      this.removeBtn = true
    })
    this.$emit('fileImage', files)
  }

  /** Upload element */
  private get upload (): HTMLInputElement {
    return this.$refs.upload as HTMLInputElement
  }

  @Watch('changeFile')
  onChildChanged () { if (!this.changeFile) { this.removeFile() } }

  private removeFile (): any {
    this.labelPlaceholder = 'Файл не выбран'
    this.removeBtn = false
    this.upload.value = ''
    this.$emit('removeFile')
  }
}
</script>

<style lang="scss" scoped>
.input-file-container {
  position: relative;
  //max-width: 300px;
  height: 50px;
  background: var(--bg-component-primary);
  border: 2px solid var(--input-border-default);

  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
}
.inputFile {
  position: absolute;
  display: block;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.file-control {
  padding: 0 10px 0 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  label {
    color: var(--text-write-primary);
    display: inline-block;
    //width: 100%;
    text-align: left;
  }
  span {
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    z-index: 2;
    width: 20px;
    height: 20px;
    color: darkred;
  }
  .iconClose {
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    z-index: 2;
    width: 20px;
    height: 20px;
    fill: var(--buttons-danger);
    &:hover {
      fill: var(--buttons-hover-danger);
    }
  }
}

</style>
