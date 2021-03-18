<template>
  <div>
    <h1 class="title">
      Список проектов
    </h1>
    <TableAdmin @delete="deleteItem" />
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
import ProjectsStore from '@/store/projects'
import TableAdmin from '@/components/Admin/table/TableAdmin.vue'

export default Vue.extend({
  components: {
    TableAdmin
  },
  layout: 'admin',
  data () {
    return {
      store: ProjectsStore.context(this.$store)
    }
  },
  methods: {
    deleteItem (project) {
      return this.store.actions.deleteProject(project)
    }
  }
})
</script>
