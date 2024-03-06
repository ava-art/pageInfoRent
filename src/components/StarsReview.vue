<script setup>
import { ref } from "vue";

const star = ref(0);

const onClickStar = (id) => {
  const items = document.querySelectorAll(".sp-rating-star.sp-rating-star-off");
  items.forEach((el, idx) => {
    items[idx].setAttribute("data-checked", "false");
  });
  items.forEach((el, idx) => {
    if (id >= idx) {
      items[idx].setAttribute("data-checked", "true");
      star.value = id + 1;
    }
  });
};

const onSubmit = async () => {};
</script>

<template>
  <div class="mt-6 px-4">
    <h2>Как вам поездка?</h2>
    <div class="flex items-center justify-between p-4 px-6">
      <div
        @click="onClickStar(0)"
        class="sp-rating-star sp-rating-star-off"
        data-checked="false"
      ></div>
      <div
        @click="onClickStar(1)"
        class="sp-rating-star sp-rating-star-off"
        data-checked="false"
      ></div>
      <div
        @click="onClickStar(2)"
        class="sp-rating-star sp-rating-star-off"
        data-checked="false"
      ></div>
      <div
        @click="onClickStar(3)"
        class="sp-rating-star sp-rating-star-off"
        data-checked="false"
      ></div>
      <div
        @click="onClickStar(4)"
        class="sp-rating-star sp-rating-star-off"
        data-checked="false"
      ></div>
    </div>
    <textarea 
    class="border w-full min-h-20 p-2"
    placeholder="Как мы можем стать лучше?" ></textarea>
    <button class=" text-center w-1/3 my-2 mx-auto block rounded-xl p-2 border bg-red-500 font-bold text-white">Отправить</button>
  </div>
</template>

<style>
.sp-rating-star {
  box-sizing: content-box;
  border-right: 3.33333px solid transparent;
  border-left: 3.33333px solid transparent;
}
.sp-rating-star-off {
  display: inline-block;
  min-width: 40px;
  min-height: 40px;
  background-size: 40px 40px;
  transition: all 0.2s linear;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpdD0nJyBoZWlnaHQ9JzEwMCUnIHdpZHRoPScxMDAlJyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSd4TWlkWU1pZCBtZWV0JyB2aWV3Qm94PScwIDAgMjQgMjQnPjxwYXRoIGZpbGw9J3JnYmEoMCwgMCwgMCwgMC4yNiknIGQ9J00yNCw4LjY4OCBMMTUuMzcyLDcuOTQ0IEwxMiwwIEw4LjYyOCw3Ljk1NgogICAgICBMMCw4LjY4OCBMNi41NTIsMTQuMzY0IEw0LjU4NCwyMi44IEwxMiwxOC4zMjQgTDE5LjQxNiwyMi44IEwxNy40NiwxNC4zNjQgTDI0LDguNjg4IEwyNCw4LjY4OAogICAgICBaIE03LjQ4OCwxOC44MDQgTDguNjg4LDEzLjY2OCBMNC43MDQsMTAuMjEyIEw5Ljk2LDkuNzU2IEwxMiw0LjkyIEwxNC4wNTIsOS43NjggTDE5LjMwOCwxMC4yMjQKICAgICAgTDE1LjMyNCwxMy42OCBMMTYuNTI0LDE4LjgxNiBMMTIsMTYuMDggTDcuNDg4LDE4LjgwNCBMNy40ODgsMTguODA0IFonPjwvcGF0aD48L3N2Zz4=);
}
.sp-rating-star-off[data-checked="true"] {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDguNjg4TDE1LjM3MiA3Ljk0NEwxMiAwTDguNjI4IDcuOTU2TDAgOC42ODhMNi41NTIgMTQuMzY0TDQuNTg0IDIyLjhMMTIgMTguMzI0TDE5LjQxNiAyMi44TDE3LjQ2IDE0LjM2NEwyNCA4LjY4OFpNNy40ODggMTguODA0TDguNjg4IDEzLjY2OEw0LjcwNCAxMC4yMTJMOS45NiA5Ljc1NkwxMiA0LjkyTDE0LjA1MiA5Ljc2OEwxOS4zMDggMTAuMjI0TDE1LjMyNCAxMy42OEwxNi41MjQgMTguODE2TDEyIDE2LjA4TDcuNDg4IDE4LjgwNFoiIGZpbGw9IiNGQ0UzMDAiLz4KPC9zdmc+);
}
</style>
