<template>
  <section class="auth">
    <form class="auth__form" @submit.prevent="onSubmit">
      <AppInput v-model="user.email" type="email">
        Login:
      </AppInput>
      <AppInput v-model="user.password" type="password">
        Password:
      </AppInput>
      <div class="controls">
        <AppButton btn-class="login btn-success">
          Вход
        </AppButton>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserData } from '@/tsconfig/global-interface'
import UserStore from '@/store/user'
import AlertStore from '@/store/alert'

@Component
export default class index extends Vue {
  store = UserStore.context(this.$store)
  alert = AlertStore.context(this.$store)
  user: UserData = {
    email: '',
    password: ''
  }

  public onSubmit (): any {
    this.store.actions.authUser(this.user)
      .then(() => {
        this.$router.push('/admin')

        // Reset
        this.user.email = ''
        this.user.password = ''
      })
  }
}
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 80vh;
  .auth__form {
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
  }
}
.controls {
  margin-top: 20px;
}
</style>
