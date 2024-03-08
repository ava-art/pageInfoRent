import { defineStore } from "pinia";
import { ref } from "vue";
import fullRaschet from "../js/fullRaschet.js";

let csrf = "";

document.cookie.split("; ").forEach((el) => {
  let arEl = el.split("=");

  if (arEl[0] == "XSRF-TOKEN") {
    csrf = el.split("=")[1];
  }
});
export const useInfoStore = defineStore("infoStore", () => {
  const itemRent = ref([]);
  const itemsRent = ref([]);
  const review = ref({
    star: 0,
    comment: "",
    rent_list_id: null,
    defaultStar: 0,
    defaultComment: null,
  });

  const onClickStar = async (id) => {
    if (!review.value.defaultStar) {
      const items = document.querySelectorAll(
        ".sp-rating-star.sp-rating-star-off"
      );
      items.forEach((el, idx) => {
        items[idx].setAttribute("data-checked", "false");
      });
      items.forEach((el, idx) => {
        if (id >= idx) {
          items[idx].setAttribute("data-checked", "true");
          review.value.star = id + 1;
        }
      });

      const sendData = new FormData();
      sendData.append("review", JSON.stringify(review.value));

      try {
        const res = await fetch("https://app.welotochka.ru/api/add-review", {
          method: "POST",
          body: sendData,
          headers: {
            "X-CSRF-TOKEN": csrf,
          },
        });
        const { data } = await res.json();
        if (data[0]) {
          review.value.defaultStar = review.value.star;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  var params = window.location.search
    .replace("?", "")
    .split("&")
    .reduce(function (p: Array, e) {
      var a = e.split("=");
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});

  const getInfo = async () => {
    if (!params["qr-code"]) return;

    const res = await fetch(
      `https://app.welotochka.ru/api/status/${params["qr-code"]}`
    );

    const { data } = await res.json();

    const item = data.filter((el) => el.element.qr == params["qr-code"]);
    review.value.rent_list_id = item[0].id;

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
    if (item[0].review) {
      if (item[0].review.star) {
        review.value.defaultStar = item[0].review.star;
        review.value.star = item[0].review.star;
      }
      if (item[0].review.comment) {
        review.value.defaultComment = item[0].review.comment;
        review.value.comment = item[0].review.comment;
      }
    }
    itemsRent.value = items;
  };

  const sendPosition = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position.coords) {
          
          const arPosition = [position.coords.latitude, position.coords.longitude ]
          const sendData = new FormData();
          sendData.append(
            "position",
            JSON.stringify([arPosition, params["qr-code"]])
          );

          try {
            const res = fetch("https://app.welotochka.ru/api/info-position", {
              method: "POST",
              body: sendData,
              headers: {
                "X-CSRF-TOKEN": csrf,
              },
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  const onSubmit = async () => {
    const sendData = new FormData();
    sendData.append("review", JSON.stringify(review.value));

    try {
      const res = await fetch("https://app.welotochka.ru/api/add-review", {
        method: "POST",
        body: sendData,
        headers: {
          "X-CSRF-TOKEN": csrf,
        },
      });
      const { data } = await res.json();
      if (data[0]) {
        review.value.defaultComment = review.value.comment;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onClickStar,
    onSubmit,
    review,
    getInfo,
    params,
    sendPosition,
    itemRent,
    itemsRent,
  };
});
