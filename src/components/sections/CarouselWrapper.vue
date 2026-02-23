<template>
  <div>
    <transition-group
      name="fade"
      tag="v-row"
      class="d-flex flex-wrap justify-center"
      style="width: 100%; position: relative;"
    >
      <v-col
        v-for="(item, index) in visibleItems"
        :key="itemKey(item, index)"
        :cols="cols"
      >
        <slot
          :item="item"
          :index="index"
        />
      </v-col>
    </transition-group>

    <div
      v-if="totalGroups > 1"
      class="controls-with-indicators mt-4"
    >
      <v-btn
        icon
        variant="text"
        class="nav-arrow"
        @click="prevGroup"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <div class="indicator-container">
        <span
          v-for="(group, i) in totalGroups"
          :key="i"
          :class="['dot', { active: currentGroupIndex === i }]"
          :style="currentGroupIndex === i ? { backgroundColor: primaryColor } : {}"
          @click="setGroup(i)"
        />
      </div>

      <v-btn
        icon
        variant="text"
        class="nav-arrow"
        @click="nextGroup"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps({
  items: { type: Array, required: true },
  primaryColor: { type: String, default: '#000' },
  interval: { type: Number, default: 4000 },
  itemKey: { type: Function, default: (item, index) => index },
});

const { smAndDown, mdAndDown } = useDisplay();
const currentGroupIndex = ref(0);
let intervalId = null;

const itemsPerPage = computed(() => {
  if (smAndDown.value) return 1;
  if (mdAndDown.value) return 2;
  return 3;
});

const totalGroups = computed(() => Math.ceil(props.items.length / itemsPerPage.value));

const visibleItems = computed(() => {
  const start = currentGroupIndex.value * itemsPerPage.value;
  return props.items.slice(start, start + itemsPerPage.value);
});

const cols = computed(() =>
  itemsPerPage.value === 1 ? 12 : itemsPerPage.value === 2 ? 6 : 4
);

const nextGroup = () => {
  currentGroupIndex.value = (currentGroupIndex.value + 1) % totalGroups.value;
  resetInterval();
};

const prevGroup = () => {
  currentGroupIndex.value = (currentGroupIndex.value - 1 + totalGroups.value) % totalGroups.value;
  resetInterval();
};

const setGroup = (index) => {
  currentGroupIndex.value = index;
  resetInterval();
};

const startInterval = () => {
  if (totalGroups.value > 1) {
    intervalId = setInterval(nextGroup, props.interval);
  }
};

const resetInterval = () => {
  clearInterval(intervalId);
  startInterval();
};

onMounted(() => startInterval());
onBeforeUnmount(() => clearInterval(intervalId));

watch(itemsPerPage, () => {
  if (currentGroupIndex.value >= totalGroups.value) currentGroupIndex.value = 0;
});
</script>

<style scoped>
.controls-with-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.indicator-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #bbb;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: relative;
  display: flex;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
  width: 100%;
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
  position: relative;
  width: 100%;
}

.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
  position: relative;
  width: 100%;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
  width: 100%;
}
</style>
