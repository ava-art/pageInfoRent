<script setup lang="ts">
import "./style.css";
import { ref } from "vue";
import TimeGoRaschet from "./components/TimeGoRaschet.vue";
import LoaderKoleso from "./components/LoaderKoleso.vue";
import fullRaschet from "./assets/js/fullRaschet.js";
import StarsReview from "./components/StarsReview.vue";

const itemRent = ref([]);
const itemsRent = ref([]);

var params = window.location.search
  .replace("?", "")
  .split("&")
  .reduce(function (p: Array, e) {
    var a = e.split("=");
    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p;
  }, {});

const getInfo = async (search: Array) => {
  const res = await fetch(
    `https://app.welotochka.ru/api/status/${search["qr-code"]}`
  );
  console.log(search["qr-code"]);

  const { data } = await res.json();

  const item = data.filter((el) => el.element.qr == search["qr-code"]);
  const items = data;

  let fullSummDrive = 0;
  let fullPayMoney = 0;
  item[0].start = Date.parse(item[0].date_start + " " + item[0].time_start);

  item[0].now = Date.parse(new Date());
  item[0].beetwenSec = (item[0].now - item[0].start) / 1000;
  item[0].beetwenMin = item[0].beetwenSec / 60;
  item[0].money_full_drive = fullRaschet(item[0]);
  fullSummDrive += item[0].money_full_drive;
  fullPayMoney += Number(item[0].money_pay_start);
  item[0].money_full_drive_all = fullSummDrive;
  item[0].money_full_pay_all = fullPayMoney;

  itemRent.value = item[0];

  console.log(itemRent.value);

  itemsRent.value = items;
};

if (params["qr-code"]) {
  getInfo(params);
}
</script>

<template>
  <div class="not-info" v-if="!itemRent.element">
    <div class=" relative top-10">
      <LoaderKoleso />
    </div>
  </div>

  <div class="wrap-info" v-else>
    <h2 class="text-center mt-2">Информация о поездке</h2>
    <div class="flex gap-4 m-3 border border-black p-2 rounded-xl">
      <img
        class="max-w-28 border-gray-700 rounded-lg"
        :src="'https://app.welotochka.ru/' + itemRent.element.image"
        alt=""
      />
      <div class="item-content">
        <div class="item-title">{{ itemRent.element.name }}</div>
        <div class="item-text flex flex-wrap">
          <span>Рама - {{ itemRent.element.rama }};</span>
          <span>Колеса - {{ itemRent.element.koleso }}”;</span>
          <span>Трансмиссия - {{ itemRent.element.transmissia }}</span>
        </div>
        <div class="qr-code">
          <img
            width="15"
            src="https://welotochka.ru/assets/templates/welotochka/image/new-pic/qr-code.png"
            alt=""
          />
          <div class="qr-code-number">{{ itemRent.element.qr }}</div>
        </div>
      </div>
    </div>
    <div class="wrap-data px-3">
      <div class="flex w-full gap-3">
        <div class=" w-1/2 border p-2 py-4 rounded-xl">
          <div class="w-full flex gap-4 items-start justify-between">
            <div class="text-sm font-bold">В пути:</div>
            <TimeGoRaschet
              v-if="!itemRent.pause_start"
              :element="itemRent"
              :inner="true"
            />
          </div>
          <div class="w-full mt-2 text-xl flex gap-4 items-start justify-between">
            <div class="text-sm font-bold">Оплачено:</div>
            <span class="block leading-4 text-base"
              >{{ itemRent.money_pay_start }} <span class=" text-sm">₽</span></span
            >
          </div>
          <div class="w-full mt-2 text-xl flex gap-4 items-start justify-between">
            <div class="text-sm font-bold">К оплате:</div>
            <span class="block leading-4 text-base"
              >{{
                itemRent.money_full_drive - itemRent.money_pay_start
              }}
              <span class=" text-sm">₽</span></span
            >
          </div>
        </div>
        <div class=" w-1/2 border bg-gray-100  rounded-xl">
          <a href="https://welotochka.ru/marshruty/" class="p-2 py-4 text-center w-full flex">
            Маршруты к <br> достопримеча- тельностям
          </a>
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
