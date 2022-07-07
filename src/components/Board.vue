<template>
  <div class="board">
    <div class="board__container">
      <canvas
        :width="width"
        :height="height"
        id="board__main"
        v-on="canvasListeners"
        :style="{ cursor: cursorForCanvas }"
        @contextmenu="rightClickCanvas"
      >
      </canvas>
      <div
        class="resize__horizontal"
        :style="{ cursor: `url('${Cursors.ResizeHorizontal}') 16 16, zoom-in` }"
      ></div>
      <div
        class="resize__vertical"
        :style="{ cursor: `url('${Cursors.ResizeVertical}') 16 16, zoom-in` }"
      ></div>
      <div
        class="resize__corner"
        :style="{ cursor: `url('${Cursors.ResizeCorner}') 16 16, zoom-in` }"
      ></div>
    </div>
  </div>
</template>

<script>
import { EnumTools } from "../models/enum/EnumTools";
import { Cursors } from "../models/model/Cursors";
export default {
  name: "Board",
  props: {
    tool: {
      type: Number,
      default: 0,
    },
    colors: {
      type: Array,
      default: () => [],
    },
    func: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      Cursors: Cursors,
      width: 800,
      height: 600,
      isPainting: false,
      startX: null,
      startY: null,
      context: null,
      canvasOffsetX: null,
      canvasOffsetY: null,
      paths: [],
      canvas: null,
    };
  },
  created() {
    this.$bus.$on("Reset", () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });
  },
  mounted() {
    this.canvas = document.getElementById("board__main");
    this.context = this.canvas.getContext("2d");
    var boundingRect = this.canvas.getBoundingClientRect();
    this.canvasOffsetX = boundingRect.left;
    this.canvasOffsetY = boundingRect.top;
  },

  computed: {
    canvasListeners() {
      return Object.assign({}, this.$listener, {
        mousedown: (e) => {
          this.isPainting = true;
          this.draw(e);
        },
        mouseup: (e) => {
          this.isPainting = false;
          this.draw(e);
          this.context.stroke();
          this.context.beginPath();
        },
        mousemove: (e) => {
          if (!this.isPainting) return;
          this.draw(e);
        },
      });
    },

    /**
     * Con tro chuot cho canvas
     * created by ntdung 08.03.2022
     */
    cursorForCanvas() {
      switch (this.tool) {
        case EnumTools.Pencil:
          return `url('${Cursors.Pencil}') 16 16, zoom-in`;
        case EnumTools.FillColor:
          return `url('${Cursors.Fill}') 16 16, zoom-in`;
        case EnumTools.Airbrush:
          return `url('${Cursors.Airbrush}') 16 16, zoom-in`;
        case EnumTools.PickColor:
          return `url('${Cursors.Dropper}') 16 16, zoom-in`;
        case EnumTools.Magnifier:
          return `url('${Cursors.Magnifire}') 16 16, zoom-in`;
        case EnumTools.Text:
          return "text";
        case EnumTools.Line:
        case EnumTools.Rectangle:
        case EnumTools.RoundedRectangle:
        case EnumTools.Ellipse:
          return `url('${Cursors.Shape}') 16 16, zoom-in`;
        default:
          return `url('${Cursors.General}') 16 16, zoom-in`;
      }
    },
  },
  methods: {
    /**
     * Ve len bang
     * created by ntdung 08.03.2022
     */
    draw(e) {
      switch (this.tool) {
        case EnumTools.Pencil:
          this.context.lineWidth = this.func;
          this.context.lineCap = "round";
          this.context.strokeStyle = this.colors[0];
          this.context.lineTo(e.clientX - this.canvasOffsetX, e.clientY);
          this.context.stroke();

          break;
        default:
          break;
      }
    },
    /**
     * Click chuot phai vao canvas
     * created by ntdung 09.03.2022
     */
    rightClickCanvas(e) {
      e.preventDefault();
      alert("Right click");
      // console.log(e);
    },
  },
};
</script>

<style lang="scss">
$resizeWidth: 3px;
@mixin mixin() {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    display: block;
    content: "";
    width: $resizeWidth;
    height: $resizeWidth;
    background-color: #000;
  }
}
.board {
  overflow: auto;
  flex: 1;
  background-color: #889;
  padding: 10px;
  display: flex;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #666;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  #board__main {
    background-color: #fff;
  }
  .board__container {
    position: relative;
    height: max-content;
    .resize__horizontal {
      position: absolute;
      top: 50%;
      transform: translate(12px, -50%);
      right: 0;
      @include mixin();
    }
    .resize__corner {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(11px, 7px);
      @include mixin();
    }
    .resize__vertical {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 8px);
      @include mixin();
    }
  }
}
</style>