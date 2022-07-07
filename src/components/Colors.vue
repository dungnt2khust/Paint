<template>
  <div class="color">
    <div class="color__change" @click="$emit('switchColor')">
      <div class="color__main" :style="{ 'background-color': colors[0] }"></div>
      <div
        class="color__second"
        :style="{ 'background-color': colors[1] }"
      ></div>
    </div>
    <div class="color__list">
      <div
        class="color__item"
        @click="$emit('pickColor', color)"
        v-for="(color, index) in listColors"
        :key="index"
      >
        <div class="color__color" :style="{ 'background-color': color }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Colors } from "../models/model/Colors.js";
export default {
  name: "Color",
  props: {
    colors: {
      type: Array,
      default: () => ["#000", "#fff"],
    },
  },
  data() {
    return {
      listColors: Colors,
    };
  },
};
</script>

<style lang="scss">
@mixin border() {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
}
.color {
  background-color: #ccc;
  border: 1px solid #000;
  padding: 10px 4px;
  display: flex;
  .color__change {
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    padding: 8px;
    position: relative;
    cursor: pointer;
    @include border();
    margin-right: 2px;
    .color__main {
      width: 14px;
      height: 14px;
      position: absolute;
      top: 6px;
      left: 6px;
      border: 1px solid #888;
      z-index: 1;
    }
    .color__second {
      width: 14px;
      height: 14px;
      position: absolute;
      bottom: 6px;
      right: 6px;
      border: 1px solid #888;
    }
  }
  .color__list {
    width: 300px;
    border: 1px solid #888;
    display: flex;
    flex-wrap: wrap;
    .color__item {
      box-sizing: border-box;
      flex-basis: 7.142%;
      @include border();
      .color__color {
        height: 100%;
      }
    }
  }
}
</style>