<script setup lang="ts">
import "./style.css";

import TimeGoRaschet from "./components/TimeGoRaschet.vue";
import LoaderKoleso from "./components/LoaderKoleso.vue";
import StarsReview from "./components/StarsReview.vue";
import { useInfoStore } from "@/assets/stores/InfoStore";

const infoStore = useInfoStore();

infoStore.sendPosition();
infoStore.getInfo();

</script>

<template>
  <div class="not-info" v-if="!infoStore.itemRent.element">
    <div class="relative top-10">
      <LoaderKoleso />
    </div>
  </div>

  <div class="wrap-info mt-6" v-else>
    <div class="flex gap-4 m-3 border border-black p-2 rounded-xl">
      <img
        class="max-w-28 border-gray-700 rounded-lg"
        :src="'https://app.welotochka.ru/' + infoStore.itemRent.element.image"
        alt=""
      />
      <div class="item-content">
        <div class="item-title">{{ infoStore.itemRent.element.name }}</div>
        <div class="item-text flex flex-wrap">
          <span>Рама - {{ infoStore.itemRent.element.rama }};</span>
          <span>Колеса - {{ infoStore.itemRent.element.koleso }}”;</span>
          <span
            >Трансмиссия - {{ infoStore.itemRent.element.transmissia }}</span
          >
        </div>
        <div class="qr-code">
          <img
            width="15"
            src="https://welotochka.ru/assets/templates/welotochka/image/new-pic/qr-code.png"
            alt=""
          />
          <div class="qr-code-number">{{ infoStore.itemRent.element.qr }}</div>
        </div>
      </div>
    </div>
    <div class="wrap-data px-3">
      <div class="flex w-full gap-3">
        <div
          class="w-full flex flex-col items-center justify-center p-2 pb-4 rounded-xl"
        >
          <div class="w-full flex gap-4 items-start justify-center">
            <TimeGoRaschet
              v-if="!infoStore.itemRent.pause_start"
              :element="infoStore.itemRent"
              :inner="true"
            />
          </div>

          <div
            class="w-full mt-2 text-xl flex items-end mx-auto gap-2 justify-center"
          >
            <div class="text-sm">ИТОГО:</div>
            <span class="block leading-4 font-bold"
              >{{
                infoStore.itemRent.money_full_drive -
                infoStore.itemRent.money_pay_start
              }}
              <span class="text-sm">₽</span></span
            >
          </div>
        </div>
      </div>
    </div>

    <StarsReview />
  </div>
</template>
<style>
.start-time {
  font-size: 26px;
  text-align: center;
}
</style>
