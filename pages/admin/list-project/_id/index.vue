<template>
  <div>
    <div v-if="project === null" class="container">
      <Preloader :width="45" :height="45" />
    </div>
    <NewProject v-else :project-edit="project" @submit="onSubmit" @cancel="cancel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ProjectsStore from '@/store/projects'
import { ProductData } from '@/tsconfig/global-interface'
import NewProject from '@/components/Admin/NewProject.vue'

@Component({
  components: { NewProject },
  validate ({ params, store }) {
    const projectsStore = ProjectsStore.context(store)
    const myState = projectsStore.state.projects
    return myState.findIndex(b => b.id === params.id) > -1
  },
  layout: 'admin'
})
export default class projectPage extends Vue {
  project: ProductData | null | any = null
  store = ProjectsStore.context(this.$store)

  async mounted (): Promise<void> {
    const singleProject = (await this.$api.loadProject({ id: this.$route.params.id })).data
    this.project = { ...singleProject, id: this.$route.params.id }
  }

  async onSubmit (project: ProductData): any {
    await this.$router.push('/admin/list-project')
    return this.store.actions.changeProject(project)
  }

  public cancel (): void {
    this.$router.push('/admin/list-project')
  }
}
</script>
