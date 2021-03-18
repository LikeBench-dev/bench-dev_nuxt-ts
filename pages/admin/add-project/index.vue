<template>
  <div>
    <NewProject @submit="submit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ProjectsStore from '@/store/projects'
import { ProductData } from '@/tsconfig/global-interface'
import NewProject from '@/components/Admin/NewProject.vue'

@Component({
  components: {
    NewProject
  },
  layout: 'admin'
})
export default class index extends Vue {
  store = ProjectsStore.context(this.$store)

  submit (project: ProductData): any {
    return this.store.actions.addProject(project)
  }
}
</script>
