<script setup>
import useStopwatch from "../assets/js/timer.js";

const props = defineProps({
  element: {
    type: Object,
  },
  inner: {
    type: Boolean,
  },
});

const now = Date.parse(new Date());
const beetwenSec = (now - props.element.start) / 1000;

const stopwatch = useStopwatch(beetwenSec);
</script>
<template>
  <div :class="{ innerTime: inner }">
    <div class="timer-font">
      <div class="mb-2">
        <span v-if="stopwatch.days.value > 0">{{ stopwatch.days }}</span>
        <span v-if="stopwatch.days.value > 0"> день </span>
        <span v-if="stopwatch.hours < 10">0</span>
      </div>
      <div class="text-5xl">
        <span
          ><span v-if="stopwatch.hours.value < 10">0</span
          >{{ stopwatch.hours }}</span
        >
        <span>:</span>
        <span
          ><span v-if="stopwatch.minutes.value < 10">0</span
          >{{ stopwatch.minutes }}</span
        >
        <span>:</span>
        <span
          ><span v-if="stopwatch.seconds.value < 10">0</span
          >{{ stopwatch.seconds }}</span
        >
      </div>
    </div>
  </div>
</template>

<style>
.innerTime {
  font-size: 18px;
  line-height: 16px;
  text-align: center;
}
/* .timer-font{
  font-family: 'Timer', 'Arial';
} */
</style>
