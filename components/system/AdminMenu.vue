<template>
  <div class="admin-menu">
    <ul class="menu-list">
      <li v-for="link in links" :key="link.title" class="menu-link" @click="$emit('choice')">
        <nuxt-link class="menu-link__item" :to="link.url">
          <IconBase width="24" height="24" fill="var(--text-write-primary)" class="item-icon" viewBox="0 0 24 24">
            <path :d="link.icon" />
          </IconBase>
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mdiBriefcasePlusOutline, mdiFormatListBulleted, mdiAlphaABoxOutline } from '@mdi/js'
import { LinksData } from '@/tsconfig/global-interface'

@Component({

})
export default class AdminMenu extends Vue {
  links: LinksData[] = [
    { title: 'Панель администратора', url: '/admin', icon: `${mdiAlphaABoxOutline}` },
    { title: 'Добавить проект', url: '/admin/add-project', icon: `${mdiBriefcasePlusOutline}` },
    { title: 'Список проектов', url: '/admin/list-project', icon: `${mdiFormatListBulleted}` }
  ]
}
</script>

<style lang="scss">
.admin-menu {
  display: flex;
  flex-direction: column;
  height: 70%;
  justify-content: flex-start;
}
.menu-link {
  margin-bottom: 3px;
  &:last-child {
    margin-bottom: 0;
  }
  .menu-link__item {
    padding: 10px 5px;
    display: flex;
    align-items: center;
    height: 100%;
    color: var(--text-write-primary);
    font-weight: 400;

  }
  &:hover,  &.nuxt-link-exact-active {
    background: var(--bg-link-primary);
  }
}
.item-icon {
  margin-right: 15px;
}
</style>
