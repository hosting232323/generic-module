<template>
  <span class="typed-text">{{ typeValue }}</span>
</template>

<script>
export default {
  name: "TypeWriter",
  props: {
    texts: {
      type: Array,
      default: () => ["Default Text"]
    },
    typingSpeed: {
      type: Number,
      default: 100
    },
    erasingSpeed: {
      type: Number,
      default: 100
    },
    newTextDelay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      typeValue: "",
      typeStatus: false,
      displayTextArray: this.texts,
      displayTextArrayIndex: 0,
      charIndex: 0
    };
  },
  created() {
    this.startTyping();
  },
  methods: {
    async startTyping() {
      await this.typeText();
    },
    async typeText() {
      if (this.charIndex < this.displayTextArray[this.displayTextArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.displayTextArray[this.displayTextArrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        await this.wait(this.typingSpeed);
        this.typeText();
      } else {
        this.typeStatus = false;
        await this.wait(this.newTextDelay);
        this.eraseText();
      }
    },
    async eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.displayTextArray[this.displayTextArrayIndex].substring(0, this.charIndex - 1);
        this.charIndex -= 1;
        await this.wait(this.erasingSpeed);
        this.eraseText();
      } else {
        this.typeStatus = false;
        this.displayTextArrayIndex = (this.displayTextArrayIndex + 1) % this.displayTextArray.length;
        await this.wait(this.newTextDelay);
        this.typeText();
      }
    },
    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style scoped>
/* No additional styles, relies on external styling */
</style>
