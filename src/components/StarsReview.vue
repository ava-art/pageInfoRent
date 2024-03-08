<script setup>
import { useInfoStore } from "@/assets/stores/InfoStore";

const infoStore = useInfoStore()
console.log();
</script>

<template>
  <div class="mt-6 px-4">
    <h2 v-if="!infoStore.review.defaultStar || !infoStore.review.star" >Как вам поездка?</h2>
    <h2 v-else>Спасибо за оценку!</h2>
    <div class="flex items-center justify-between p-4 px-6">
      <div
        @click="infoStore.onClickStar(0)"
        class="sp-rating-star sp-rating-star-off"
        :data-checked="infoStore.review.defaultStar >= 1 || infoStore.review.star >= 1 ? 'true' : 'false'"
      ></div>
      
      <div
        @click="infoStore.onClickStar(1)"
        class="sp-rating-star sp-rating-star-off"
        :data-checked="infoStore.review.defaultStar >= 2 || infoStore.review.star >= 2 ? 'true' : 'false'"
      ></div>
      <div
        @click="infoStore.onClickStar(2)"
        class="sp-rating-star sp-rating-star-off"
        :data-checked="infoStore.review.defaultStar >= 3 || infoStore.review.star >= 3 ? 'true' : 'false'"
      ></div>
      <div
        @click="infoStore.onClickStar(3)"
        class="sp-rating-star sp-rating-star-off"
        :data-checked="infoStore.review.defaultStar >= 4 || infoStore.review.star >= 4 ? 'true' : 'false'"
      ></div>
      <div
        @click="infoStore.onClickStar(4)"
        class="sp-rating-star sp-rating-star-off"
        :data-checked="infoStore.review.defaultStar >= 5 || infoStore.review.star >= 5 ? 'true' : 'false'"
      ></div>
    </div>
    <div v-if="!infoStore.review.defaultComment">

      <textarea
      v-if="infoStore.review.star > 0"
      @input="(e) => infoStore.review.comment = e.target.value"
      class="border w-full min-h-20 p-2"
      placeholder="Как мы можем стать лучше?"
      ></textarea>
      <button
      v-if="infoStore.review.star > 0"
      @click="infoStore.onSubmit"
      class="text-center w-1/3 my-2 mx-auto block rounded-xl p-2 border bg-red-500 font-bold text-white"
      >
      Отправить
    </button>
  </div>
  <!-- <div v-else>
    <span>
      {{ infoStore.review.defaultComment }}
    </span>
  </div> -->
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
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMiAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjIxNTcgOS4yMzY1NkMyMS44ODMgOC42NTc0NyAyMS41MjY0IDcuNTYwOTMgMjAuNjQ2MiA3LjQ4NTAzTDE0Ljk3MTUgNi45OTU2OUMxNC42MDI2IDYuOTYzODkgMTQuMjgxNSA2LjczMDkxIDE0LjEzNjkgNi4zOTAxMkwxMS45MjEyIDEuMTcwMjNDMTEuNTc2MyAwLjM1NzYzIDEwLjQyNDUgMC4zNTc5NDIgMTAuMDggMS4xNzA3M0w3Ljg2MzMyIDYuNDAwNzlDNy43MTg1OCA2Ljc0MjI4IDcuMzk2NzEgNi45NzU2MiA3LjAyNzE0IDcuMDA2OThMMS4zNjE2MyA3LjQ4NzY0QzAuNDgwMjA1IDcuNTYyNDIgMC4xMjI3OTYgOC42NjA2OCAwLjc5MTM5NCA5LjIzOTg5TDUuMDk1OCAxMi45Njg4QzUuMzc2MzYgMTMuMjExOCA1LjQ5OTIxIDEzLjU5MDMgNS40MTQ4NyAxMy45NTE4TDQuMTIyNDEgMTkuNDkyQzMuOTIxNDUgMjAuMzUzNSA0Ljg1NTY4IDIxLjAzMjUgNS42MTMgMjAuNTc1NEwxMC40ODMzIDE3LjYzNTlDMTAuODAxMSAxNy40NDQxIDExLjE5ODkgMTcuNDQ0MSAxMS41MTY3IDE3LjYzNTlMMTYuMzkwOCAyMC41Nzc3QzE3LjE0NzYgMjEuMDM0NCAxOC4wODE0IDIwLjM1NjcgMTcuODgxNyAxOS40OTU3TDE2LjU5NiAxMy45NTA1QzE2LjUxMjMgMTMuNTg5NyAxNi42MzUgMTMuMjEyMiAxNi45MTQ3IDEyLjk2OTRMMjEuMjE1NyA5LjIzNjU2Wk04LjUxODE2IDE2LjU3ODNDNy43NjA3MSAxNy4wMzU2IDYuODI2MjQgMTYuMzU2MyA3LjAyNzU1IDE1LjQ5NDdMNy41NTA3MiAxMy4yNTU1QzcuNjM1MTUgMTIuODk0MiA3LjUxMjU0IDEyLjUxNTggNy4yMzIyMyAxMi4yNzI2TDUuNDg3OTUgMTAuNzU5NUM0LjgyMDY3IDEwLjE4MDcgNS4xNzY3NCA5LjA4NDIzIDYuMDU2NzkgOS4wMDc4OEw4LjM1OTM4IDguODA4MTFDOC43Mjg4MiA4Ljc3NjA2IDkuMDUwMTkgOC41NDIyIDkuMTk0MzIgOC4yMDA1MkwxMC4wODAyIDYuMTAwNTFDMTAuNDIzOCA1LjI4NTk0IDExLjU3NzkgNS4yODUyNCAxMS45MjI1IDYuMDk5MzlMMTIuODE3MyA4LjIxMzU3QzEyLjk2MTcgOC41NTQ2NyAxMy4yODI4IDguNzg4MDIgMTMuNjUxOCA4LjgyMDA0TDE1Ljk1NTIgOS4wMTk4OEMxNi44MzUzIDkuMDk2MjMgMTcuMTkxMyAxMC4xOTI3IDE2LjUyNDEgMTAuNzcxNUwxNC43Nzk4IDEyLjI4NDZDMTQuNDk5NSAxMi41Mjc4IDE0LjM3NjggMTIuOTA2MiAxNC40NjEzIDEzLjI2NzVMMTQuOTgzOSAxNS41MDQzQzE1LjE4NTMgMTYuMzY2MiAxNC4yNSAxNy4wNDU1IDEzLjQ5MjYgMTYuNTg3NUwxMS41MTcgMTUuMzkyN0MxMS4xOTkxIDE1LjIwMDQgMTAuODAwOCAxNS4yMDAzIDEwLjQ4MjcgMTUuMzkyM0w4LjUxODE2IDE2LjU3ODNaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjI2Ii8+Cjwvc3ZnPgo=);
}
.sp-rating-star-off[data-checked="true"] {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMiAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjIxNTcgOS4yMzY1NkMyMS44ODMgOC42NTc0NyAyMS41MjY0IDcuNTYwOTMgMjAuNjQ2MiA3LjQ4NTAzTDE0Ljk3MTUgNi45OTU2OUMxNC42MDI2IDYuOTYzODkgMTQuMjgxNSA2LjczMDkxIDE0LjEzNjkgNi4zOTAxMkwxMS45MjEyIDEuMTcwMjNDMTEuNTc2MyAwLjM1NzYzIDEwLjQyNDUgMC4zNTc5NDIgMTAuMDggMS4xNzA3M0w3Ljg2MzMyIDYuNDAwNzlDNy43MTg1OCA2Ljc0MjI4IDcuMzk2NzEgNi45NzU2MiA3LjAyNzE0IDcuMDA2OThMMS4zNjE2MyA3LjQ4NzY0QzAuNDgwMjA1IDcuNTYyNDIgMC4xMjI3OTYgOC42NjA2OCAwLjc5MTM5NCA5LjIzOTg5TDUuMDk1OCAxMi45Njg4QzUuMzc2MzYgMTMuMjExOCA1LjQ5OTIxIDEzLjU5MDMgNS40MTQ4NyAxMy45NTE4TDQuMTIyNDEgMTkuNDkyQzMuOTIxNDUgMjAuMzUzNSA0Ljg1NTY4IDIxLjAzMjUgNS42MTMgMjAuNTc1NEwxMC40ODMzIDE3LjYzNTlDMTAuODAxMSAxNy40NDQxIDExLjE5ODkgMTcuNDQ0MSAxMS41MTY3IDE3LjYzNTlMMTYuMzkwOCAyMC41Nzc3QzE3LjE0NzYgMjEuMDM0NCAxOC4wODE0IDIwLjM1NjcgMTcuODgxNyAxOS40OTU3TDE2LjU5NiAxMy45NTA1QzE2LjUxMjMgMTMuNTg5NyAxNi42MzUgMTMuMjEyMiAxNi45MTQ3IDEyLjk2OTRMMjEuMjE1NyA5LjIzNjU2WiIgZmlsbD0iI0YyREMxNyIvPgo8L3N2Zz4K);
}
</style>
