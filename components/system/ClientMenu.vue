<template>
  <div>
    <h1 class="title">
      Разработка сайтов
    </h1>
    <form @submit.prevent="submit">
      <AppInput v-model="name">
        Ваше Имя
      </AppInput>
      <AppInput v-model="phoneNumber">
        Логин Телеграм
      </AppInput>
      <AppInput v-model="message">
        Сообщение
      </AppInput>

      <AppButton btn-class="btn-left flex-between b-text">
        <IconBase width="24" height="24" fill="var(--text-write-primary)" class="item-icon" view-box="0 0 50 50">
          <circle cx="25" cy="25" r="25" fill="#2F89CE" />
          <path d="M11.6884 25.4676L17.436 27.6108L19.6766 34.8196C19.774 35.3067 20.3585 35.4041 20.7482 35.1119L23.9629 32.4816C24.2552 32.1894 24.7423 32.1894 25.1319 32.4816L30.8795 36.6705C31.2692 36.9628 31.8537 36.768 31.9511 36.2809L36.2375 15.8233C36.3349 15.3362 35.8478 14.8492 35.3607 15.044L11.6884 24.2012C11.1039 24.396 11.1039 25.2728 11.6884 25.4676ZM19.3843 26.5392L30.6847 19.6226C30.8795 19.5252 31.0744 19.8174 30.8795 19.9148L21.6249 28.5849C21.3327 28.8772 21.0404 29.2669 21.0404 29.7539L20.7482 32.092C20.7482 32.3842 20.2611 32.4816 20.1637 32.092L18.9946 27.8056C18.7024 27.3185 18.8973 26.734 19.3843 26.5392Z" fill="white" />
        </IconBase>
        отправить в телеграм
      </AppButton>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AlertStore from '@/store/alert'

@Component
export default class ClientMenu extends Vue {
  alert = AlertStore.context(this.$store)
  name: string = ''
  phoneNumber: number | null = null
  message: string = ''

  private submit () {
    const fullForm = {
      dateSend: new Date().toLocaleString(),
      name: this.name,
      tel: this.phoneNumber,
      message: this.message
    }
    return this.$api.sendMessageBot(fullForm)
      .then(() => {
        this.alert.actions.callAlert({ type: 'success', value: 'Успешная отправка' })

        // Reset
        this.name = ''
        this.phoneNumber = null
        this.message = ''
      })
  }
}
</script>

<style lang="scss">

</style>
