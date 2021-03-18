<template>
  <main class="">
    <h1 class="title">
      Main admin page
    </h1>
    <p class="subtitle">
      Всего проектов: {{ projectsCase }}
    </p>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ProductData } from '@/tsconfig/global-interface'
import ProjectsStore from '../../store/projects'
import Projects from '@/components/Project.vue'

@Component({
  components: {
    Projects
  },
  layout: 'admin'
})
export default class adminMain extends Vue {
  store = ProjectsStore.context(this.$store)
  portfolio: ProductData[] | null = []

  get projectsCase (): number {
    return this.store.getters.getProjectsLength
  }
}
</script>

<style lang="scss">

</style>
