<template>
  <div class="new-project" :class="{justify: showPreview}">
    <div class="new-project_top">
      <div class="title-container">
        <p v-if="projectEdit" class="title md-center">
          Изменение проекта
        </p>
        <p v-else class="title md-center">
          Добавление проекта
        </p>
      </div>
      <form @submit.prevent="onSubmit">
        <AppInput v-model="project.date">
          Дата
        </AppInput>
        <AppInput v-model="project.title">
          Название
        </AppInput>
        <AppInput v-model="project.description">
          Описание
        </AppInput>
        <AppInput v-model="project.url" :required="false">
          Ссылка
        </AppInput>

        <AppFile :img="project.img" :required="false" @removeFile="removeFile" @fileImage="onUploadFiles" />

        <div class="controls">
          <AppButton v-if="projectEdit" type="submit" btn-class="btn-success">
            Сохранить
          </AppButton>
          <AppButton v-else type="submit" btn-class="btn-success">
            Добавить
          </AppButton>
          <AppButton v-if="projectEdit" btn-class="btn-danger" @click="cancel">
            Назад
          </AppButton>
        </div>
      </form>
    </div>
    <div v-show="showPreview" class="new-project_bottom">
      <div class="fileImage">
        <img :src="imagePreview" :alt="project.title">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, ProvideReactive } from 'nuxt-property-decorator'
import { ProductData } from '@/tsconfig/global-interface'
import { ENDPOINT_API, DOMEN } from '@/models/constants/api/checkpoint'

@Component
export default class NewProject extends Vue {
  @ProvideReactive() changeFile = null

  @Prop({ required: false, type: Object }) projectEdit!: ProductData

  project: ProductData = this.projectEdit
    ? { ...this.projectEdit }
    : {
        date: '',
        title: '',
        description: '',
        img: '',
        url: ''
      }

  file: any | null = null
  showPreview: boolean= !!this.projectEdit
  imagePreview: string|ArrayBuffer = this.projectEdit ? `${ENDPOINT_API}/api/images/${this.project.img}` : ''

  private onSubmit (): void {
    if (this.file) {
      const formData = new FormData()
      const addDate = Date.now()
      const imgName = addDate + this.$imgRename(this.file.name)
      formData.append('file', this.file, imgName)
      if (!this.project.url) {
        // this.project.url = `${ENDPOINT_API}/api/images/${imgName}`
        this.project.url = `${DOMEN}/api/images/${imgName}`
      }
      if (this.project.img) {
        this.$emit('submit', [{ ...this.project, img: `${imgName}` }, { file: formData }, { oldImg: this.project.img }])
      } else {
        this.$emit('submit', [{ ...this.project, img: `${imgName}` }, { file: formData }])
      }
    } else {
      if (!this.project.url) {
        // this.project.url = `${ENDPOINT_API}/api/images/${this.project.img}`
        this.project.url = `${DOMEN}/api/images/${this.project.img}`
      }
      this.$emit('submit', [{ ...this.project, url: this.project.url }])
    }

    if (!this.projectEdit) {
      this.project.date = ''
      this.project.title = ''
      this.project.description = ''
      this.project.url = ''
      this.file = null
      this.changeFile = false
      this.imagePreview = ''
    }
  }

  private cancel (): void {
    this.$emit('cancel')
  }

  private removeFile (): void {
    this.showPreview = false
    this.imagePreview = ''
  }

  private onUploadFiles (files: any): void {
    this.changeFile = true
    files.forEach((file) => {
      if (!file.type.match('image.*')) {
        return
      }
      this.file = file
      this.showPreview = true
      const reader = new FileReader()

      reader.onload = (e) => { this.imagePreview = e.target.result }
      reader.readAsDataURL(file)
    })
  }
}

</script>

<style lang="scss" scoped>
.fileImage {
  max-width: 580px;
  margin-top: 20px;
  margin-left: 0;
  @include mq(lg) {
    margin-top: 0;
    margin-left: 20px;
  }
}
.new-project_top {
  width: 100%;
  max-width: 500px;
}
.controls {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @include mq(sm) {
    flex-direction: row;
  }
}
.new-project {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0;
  @include mq(lg) {
    flex-direction: row;
  }
  &.justify {
    justify-content: space-around;
  }
}
</style>
