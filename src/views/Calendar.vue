<template>
  <div class="calendar">
    <div class="calendar-header">
      <button 
        :class="['nav-btn', { 'month-before': isPrevMonthBeforeToday() }]" 
        :disabled="isPrevMonthBeforeToday()"
        @click="prevMonth"
      >
      <v-icon>mdi-chevron-left</v-icon>
    </button>
      <span class="current-month">{{ currentMonth }} {{ currentYear }}</span>
      <button class="nav-btn" @click="nextMonth"><v-icon>mdi-chevron-right</v-icon></button>
    </div>

    <div class="calendar-weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday"><b>{{ day }}</b></div>
    </div>

    <div class="calendar-days">
      <div
        v-for="day in days"
        :key="day.key"
        class="day"
        :class="{ 
          'is-today': isToday(day.date, day.isCurrentMonth),
          'past-day': isPastDay(day)
        }"
        @click="day.events.length > 0 && goToDayEvents(day)"
      >
        <div class="day-header">
          <span class="day-number" :style="{ textDecoration: isPastDay(day) ? 'line-through' : '' }">{{ day.date }}</span>
        </div>
        <div class="events-container">
          <button 
            v-if="!isPastDay(day) && isOpen(day)" 
            class="event"
          >
            Prenota un tavolo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['day-click']);

const currentDate = ref(new Date());
const isModalVisible = ref(false);
const selectedEvent = ref(null);

const weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const openingDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString('it-IT', { month: 'long' });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const days = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

  let days = [];

    // Riempie le celle vuote prima del primo giorno del mese (giorni del mese precedente)
  for (let i = 0; i < startDay; i++) {
    const prevMonthDate = new Date(year, month, -(startDay - i) + 1);
    days.push({
      date: prevMonthDate.getDate(),
      isCurrentMonth: false,
      events: [],
      key: `prev-${prevMonthDate.getFullYear()}-${prevMonthDate.getMonth()}-${prevMonthDate.getDate()}`
    });
  }

  // Aggiungi i giorni del mese corrente
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date: i,
      isCurrentMonth: true,
      events: [],
      key: `current-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    });
  }

  // Riempie la riga finale con i giorni del mese successivo
  const totalDays = days.length + (7 - (days.length % 7));
  for (let i = 1; days.length < totalDays; i++) {
    const nextMonthDate = new Date(year, month + 1, i);
    days.push({
      date: nextMonthDate.getDate(),
      isCurrentMonth: false,
      events: [],
      key: `next-${nextMonthDate.getFullYear()}-${nextMonthDate.getMonth()}-${nextMonthDate.getDate()}`
    });
  }


  return days;
});

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};


const isToday = (date, isCurrentMonth) => {
  if (!isCurrentMonth) return false;
  const today = new Date();
  return (
    today.getFullYear() === currentDate.value.getFullYear() &&
    today.getMonth() === currentDate.value.getMonth() &&
    today.getDate() === date
  );
};

const goToDayEvents = (day) => {
  if (!day.isCurrentMonth || day.events.length === 0) return;
  
  const date = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.date);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
  
  emit('day-click', formattedDate);
};

const isPastDay = (day) => {
  const today = new Date();
  const dayDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day.date
  );

  if (day.key.startsWith('prev')) return true;
  if (day.key.startsWith('next')) return false;
  return dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

const getDayDate = (day) => {
  const [type, year, month, date] = day.key.split('-'); 
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(date));
};

const isOpen = (day) => {
  const dayDate = getDayDate(day);
  console.log(dayDate);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = daysOfWeek[dayDate.getDay()];
  console.log(dayName);

  return openingDays.includes(dayName);
};

const isPrevMonthBeforeToday = () => {
  const today = new Date();
  const prevMonthDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );

  return prevMonthDate < new Date(today.getFullYear(), today.getMonth(), 1);
};
</script>

<style>
@import '../styles/Calendar.css';
</style>
