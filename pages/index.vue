<template>
  <div v-if="projectsCase.length === 0" class="container">
    <Preloader :width="45" :height="45" />
  </div>
  <ul v-else class="container__">
    <li v-for="item in projectsCase" :key="item.name" class="product" :style="{ height: heightBlock}">
      <Projects :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ProjectsStore from '@/store/projects'
import { ProductData } from '../tsconfig/global-interface'
import { isMobile } from '@/models/constants/device.ts'
import Projects from '@/components/Project.vue'

@Component({
  components: {
    Projects
  }
})
export default class Products extends Vue {
  store = ProjectsStore.context(this.$store)
  public heightBlock: string = '250px'

  get projectsCase (): ProductData[] {
    return this.store.getters.getProjects
  }

  mounted (): void {
    this.heightBlockFunc()
  }

  unmounted (): void {
    this.heightBlockFunc()
  }

  heightBlockFunc (): void {
    const appHeight: number = window.innerHeight
    this.heightBlock = (isMobile.any() && (appHeight < 420))
      ? (appHeight) + 'px'
      : (isMobile.any() && (document.body.offsetHeight < 769))
          ? (appHeight / 2) + 'px'
          : appHeight < 769 ? (appHeight / 2) + 'px' : (appHeight / 3) + 'px'
  }
}
</script>

<style lang="scss">

.container__ {
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  transition: transform 0.3s ease-out;
  min-height: 100vh;
}
.btn-product {
  margin-top: 20px;
  margin-bottom: 0;
}

</style>
