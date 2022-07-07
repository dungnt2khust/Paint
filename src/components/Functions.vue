<template>
  <div class="function">
    <div v-if="tool == EnumTools.Pencil" class="function__list">
      <div
        :class="{ selected: func == size }"
        class="function__item fx-center"
        v-for="size in 5"
        @click="changeFunction(size)"
        :key="size"
      >
        <div class="line" :style="{ height: size + 'px' }"></div>
      </div>
    </div>
    <div v-else class="function__list"></div>
    <div class="function__button" @click="$bus.$emit('Reset')">Reset</div>
    <div class="function__button" @click="$bus.$emit('Undo')">Undo</div>
    <div class="function__button" @click="$bus.$emit('Redo')">Redo</div>
  </div>
</template>

<script>
import { EnumTools } from "../models/enum/EnumTools";
export default {
  name: "Function",
  props: {
    tool: {
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
      EnumTools: EnumTools,
    };
  },
  methods: {
    /**
     * Thay doi chuc mang
     * created by ntdung 08.03.2022
     */
    changeFunction(newFunc) {
      this.$bus.$emit("ChangeFunction", newFunc);
    },
  },
};
</script>

<style lang="scss">
.fx-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.function {
  .function__list {
    display: flex;
    flex-direction: column;
    height: 70px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    .function__item {
      flex-basis: 20%;
      padding: 0 4px;
      cursor: pointer;
      .line {
        background-color: #000;
        width: 100%;
      }
      &.selected {
        background-color: #000080;
        .line {
          background-color: #fff;
        }
      }
    }
  }
  .function__button {
    user-select: none;
    cursor: pointer;
    margin-top: 10px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    &:hover {
      background-color: #bbb;
    }
    &:active {
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
      border-top: 2px solid #000;
      border-left: 2px solid #000;
    }
  }
}
</style>