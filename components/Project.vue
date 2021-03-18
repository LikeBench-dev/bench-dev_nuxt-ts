<template>
  <div class="product__container">
    <div class="product__info">
      <p class="product__date">
        {{ item.date }}
      </p>
      <p class="product__title">
        {{ item.title }}
      </p>
      <p class="product__description">
        {{ item.description }}
      </p>
      <a :href="link" target="_blank" class="btn btn-left btn-product ">
        {{ checkBtn }}
      </a>
    </div>
    <div class="product__preview">
      <div class="img">
        <img :src="url + item.img" :alt="item.description">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ProductData } from '../tsconfig/global-interface'
import { DOMEN, ENDPOINT_API } from '@/models/constants/api/checkpoint'

@Component
export default class product extends Vue {
  @Prop({ required: true, type: Object }) item!: ProductData

  // url = `${ENDPOINT_API}/api/images/`
  url = `${DOMEN}/api/images/`

  private get checkBtn (): string {
    const url: Array<string> = (this.item.url.split('/')).filter(i => i === 'api')
    return url[0] === 'api' ? 'Смотреть дизайн' : 'Перейти на сайт'
  }

  private get link (): string {
    return this.item.url.substring(0, 4) !== 'http' ? `http://${this.item.url}` : this.item.url
  }
}
</script>

<style lang="scss">
.product {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  position: relative;
  &:before {
    position: absolute;
    content: '';
    height: 2px;
    width: 90%;
    background: var(--bg-background-ternary);
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &:hover {
    .product__container {
      .product__preview {
        opacity: 1;
      }
    }
  }
  .product__container {
    z-index: 0;
    .product__info {
      line-height: 140%;
      width: 100%;
      max-width: 250px;
      @include mq(md) {
        max-width: 350px;
      }
      @include mq(lg) {
        max-width: 350px;
      }
      @include mq(xl) {
        max-width: 400px;
      }
      .product__date, .product__title, .product__subtitle {
        line-height: 140%;
      }
      .product__date {
        font-size: 21px;
        text-align: left;
        font-weight: 500;
        color: var(--text-write-primary);
      }
      .product__title {
        margin: 7px 0;
        font-size: 24px;
        font-weight: 600;
        color: var(--text-write-primary);
      }
      .product__description {
        font-weight: 400;
        color: var(--text-write-primary);
      }
    }
    .product__preview {
      display: none;
      transition: .3s ease-in-out;
      opacity: .5;
      position: absolute;
      bottom: 2px;
      border-radius: 15px 15px 0 0;
      box-shadow: 0 15px 20px 11px rgba(0, 0, 0, 0.26), 0 5px 15px 10px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      @include mq(lg) {
        display: block;
        right: 10%;
        width: 340px;
        height: 38%;
      }
      @include mq('xxl') {
        display: block;
        right: 10%;
        width: 540px;
        height: 80%;
      }
      &:hover {
        .img {
          img {
            transform: translateY(-65%);
          }
        }
      }
      .img {
        width: 540px;
        height: 100%;
        img {
          transition: 3s ease-in-out;
          display: block;
          width: 100%;
          transform: translateY(0);
        }
      }
    }
    /*
    .product__preview {
      transition: .3s ease-in-out;
      opacity: .5;
      display: none;
      &:hover {
        .img {
          img {
            transform: translateY(-65%);
          }
        }
      }
      @include mq(sd) {
        display: block;
        width: 240px;
        right: -10%;
      }
      @include mq(md) {
        right: 0;
        width: 480px;
      }
      @include mq(xl) {
        right: 10%;
        width: 540px;
      }
      position: absolute;
      bottom: 0;
      height: 80%;
      border-radius: 15px 15px 0 0;
      //box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.45);
      box-shadow: 0px 15px 20px 11px rgba(0, 0, 0, 0.26), 0 5px 15px 10px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      .img  {
        position: absolute;
        top: 0;
        left: 0;
        width: 540px;
        height: 100%;
        img {
          transition: 3s ease-in-out;
          display: block;
          width: 100%;
          //margin-top: 0;
          transform: translateY(0);
        }
      }
    }*/
  }
}
</style>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  min-height: 20px;
}
</style>
