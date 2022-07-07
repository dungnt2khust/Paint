<template>
  <div class="tool">
    <div class="tool__list">
      <div
        class="tool__item"
        v-for="(Icon, index) in IconTools"
        :class="{ selected: value == Icon.enum }"
        @click="$emit('input', Icon.enum)"
        :key="index"
      >
        <div class="tool__icon" :class="Icon.class"></div>
      </div>
    </div>
    <Function :tool="value" :func="func" />
  </div>
</template>

<script>
import { IconTools } from "../models/model/IconTools";
import Function from "./Functions";
export default {
  name: "Tool",
  components: {
    Function,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    func: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      IconTools: IconTools,
    };
  },
};
</script>

<style lang="scss">
.tool {
  border: 1px solid #000;
  height: 100%;
  padding: 4px;
  .tool__list {
    display: flex;
    flex-wrap: wrap;
    width: 60px;
    margin-bottom: 10px;
    .tool__item {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      flex-basis: 50%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      &.selected {
        border: 0;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        border-top: 1px solid #000;
        border-left: 1px solid #000;
      }
    }
  }
}
</style>