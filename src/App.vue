<template>
  <div id="app">
    <Control />
    <div class="body">
      <Tools v-model="tool" :func="func" />
      <Board :tool="tool" :colors="colors" :func="func" />
    </div>
    <Colors
      :colors="colors"
      @switchColor="switchColor"
      @pickColor="pickColor"
    />
  </div>
</template>

<script>
import Board from "./components/Board";
import Control from "./components/Control";
import Tools from "./components/Tools";
import Colors from "./components/Colors";
import { EnumTools } from "./models/enum/EnumTools";
export default {
  name: "App",
  components: {
    Board,
    Control,
    Tools,
    Colors,
  },
  data() {
    return {
      tool: EnumTools.Pencil,
      func: 1,
      colors: ["#000", "#fff"],
    };
  },
  created() {
    this.$bus.$on("ChangeFunction", (newFunc) => {
      this.func = newFunc;
    });
  },
  methods: {
    /**
     * Doi vi tri mau
     * created by ntdung 08.03.2022
     */
    switchColor() {
      this.colors.reverse();
    },
    /**
     * Chon mau moi
     * created by ntdung 08.03.2022
     */
    pickColor(newColor) {
      this.colors.shift();
      this.colors.unshift(newColor);
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
}
.body {
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
}
</style>
<style lang="scss">
@import "./assets/scss/var_icons.scss";
</style>
