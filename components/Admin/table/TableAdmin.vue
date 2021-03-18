<template>
  <client-only>
    <div v-if="loadProjects.length === 0" class="container">
      <Preloader :width="45" :height="45" />
    </div>

    <TableComponent
      v-else
      :thead="['Дата', 'Скрин', 'Название', 'Описание', 'Ссылка']"
    >
      <template #tbody>
        <TableFile v-for="project in loadProjects" :key="project.id" :project="project" @deleteProject="deleteProject" />
      </template>
    </TableComponent>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ProductData } from '@/tsconfig/global-interface'
import ProjectsStore from '@/store/projects'
import TableComponent from '@/components/Admin/table/TableComponent.vue'
import TableFile from '@/components/Admin/table/TableFile.vue'

@Component({
  components: {
    TableComponent, TableFile
  }
})
export default class TableAdmin extends Vue {
  store = ProjectsStore.context(this.$store)

  get loadProjects (): ProductData[] {
    return this.store.getters.getProjects
  }

  public deleteProject (projectDel: ProductData): void {
    this.$emit('delete', projectDel)
  }
}
</script>

<style lang="scss" >
.icon-controls {
  white-space: nowrap;
}
.tableImg {
  height: 50px;
  width: 50px;
  object-fit: contain;
  margin-right: 10px;
}
.imgAndTitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}
.icon-table {
  height: 35px;
  width: 35px;
  padding: 5px;
  border-radius: 50%;
  margin: 5px 15px 5px 5px;
  transition: .3s ease-in-out;
  cursor: pointer;
  opacity: .2;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    opacity: 1;
  }
}
.icon-change {
  fill: var(--buttons-primary);
}
.icon-trash {
  fill: var(--buttons-danger);
}
// Default table
table {
  width: 100%;
  line-height: 1.5em;
  border-collapse: separate;
  border-spacing: 0 14px;
  thead th {
    padding: 20px 22px;
    white-space: nowrap;
    font-size: 20px;
  }
  td {
    padding: 20px;
  }
  tbody tr {
    background-color: var(--table-tr-prime);
    transition: all .25s cubic-bezier(.02,.01,.47,1);
    box-shadow: 0 16px 16px rgba(0,0,0,.01);
    &:hover {
      box-shadow: 0 16px 16px rgba(0,0,0,.02);
      transform: translate(0,-3px);
      transition-delay: 0s !important;
    }
  }
  tbody tr td {
    word-wrap: break-word;
    max-width: 250px;
    color: var(--text-write-primary);
    a {
      //word-wrap: break-word;
      color: var(--text-write-primary);
    }
  }
}
</style>
