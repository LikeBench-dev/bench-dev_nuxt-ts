<template>
  <tr>
    <td> <span>{{ project.date }}</span></td>
    <td><img class="tableImg" :src="url + project.img" :alt="project.title"></td>
    <td><span>{{ project.title }}</span></td>
    <td><span> {{ project.description }} </span></td>
    <td><a target="_blank" :href="link">{{ linkDecorate }}</a></td>
    <td class="icon-controls">
      <IconBase class="icon-table icon-change" width="24" height="24" view-box="0 0 24 24" @click="changeProject(project)">
        <path :d="iconChange" />
      </IconBase>
      <IconBase class="icon-table icon-trash" width="24" height="24" view-box="0 0 24 24" @click="deleteProject(project)">
        <path :d="iconTrash" />
      </IconBase>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ProductData } from '@/tsconfig/global-interface'
import { mdiPencilOutline, mdiTrashCanOutline } from '@mdi/js'
import IconBase from '@/components/UI/icons/IconBase.vue'
import { ENDPOINT_API } from '@/models/constants/api/checkpoint'

@Component({
  components: {
    IconBase
  }
})
export default class TableFile extends Vue {
  @Prop({ required: false, type: Object }) project!: ProductData

  iconChange = mdiPencilOutline
  iconTrash = mdiTrashCanOutline
  url = `${ENDPOINT_API}/api/images/`

  public changeProject (project: ProductData): void {
    this.$router.push(`/admin/list-project/${project.id}`)
  }

  public deleteProject (project: ProductData): void {
    const projectDel: any = { id: project.id, imgName: project.img }
    this.$emit('deleteProject', projectDel)
  }

  private get linkDecorate () {
    const originalLink = this.project.url.split('/').filter(i => i === 'api')[0]
    return originalLink ? 'Изображение' : this.project.url
  }

  private get link () {
    return this.project.url.substring(0, 4) !== 'http' ? `http://${this.project.url}` : this.project.url
  }
}
</script>

<style lang="scss" scoped>

</style>
