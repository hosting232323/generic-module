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
          <div v-if="day.events.length > 0">
            <div
              v-for="event in day.events"
              :key="event.id"
              class="event"
              :style="isMobile ? 'width: 26px' : ''"
            >
              <b v-if="!isMobile">{{ event.name }}</b>
              <v-icon v-else>mdi-calendar-check</v-icon>
            </div>
          </div>
          <div v-else class="no-event">Nessun evento</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/events';
import { setupMobileUtils } from '@/utils/mobile';

const isMobile = setupMobileUtils();

import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const eventsStore = useEventsStore();
const { data } = storeToRefs(dataStore);
const calendar = data.value.calendar;

onMounted(() => {
  eventsStore.initEvents(calendar);
});

const router = useRouter();

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
    const events = getEventsForDate(prevMonthDate);
    days.push({
      date: prevMonthDate.getDate(),
      isCurrentMonth: false,
      events: events,
      key: `prev-${prevMonthDate.getFullYear()}-${prevMonthDate.getMonth()}-${prevMonthDate.getDate()}`
    });
  }

  // Aggiungi i giorni del mese corrente
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const events = getEventsForDate(date);
    days.push({
      date: i,
      isCurrentMonth: true,
      events: events,
      key: `current-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    });
  }

  // Riempie la riga finale con i giorni del mese successivo
  const totalDays = days.length + (7 - (days.length % 7));
  for (let i = 1; days.length < totalDays; i++) {
    const nextMonthDate = new Date(year, month + 1, i);
    const events = getEventsForDate(nextMonthDate);
    days.push({
      date: nextMonthDate.getDate(),
      isCurrentMonth: false,
      events: events,
      key: `next-${nextMonthDate.getFullYear()}-${nextMonthDate.getMonth()}-${nextMonthDate.getDate()}`
    });
  }
  return days;
});


function getEventsForDate(date) {
  // Assicuriamoci di usare la data locale, non UTC
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  const dateStr = localDate.toISOString().split('T')[0];
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOfMonth = date.getDate();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const filteredEvents = calendar.filter(event => {
    if (!event.type || !event.name) return false;
    if (dateStr < todayStr) return false;

    // Verifica se la data corrente è all'interno del range di date dell'evento
    const isWithinDateRange = (info) => {
      if (!info.start_date || !info.end_date) return true;
      return dateStr >= info.start_date && dateStr <= info.end_date;
    };

    switch (event.type) {
      case 'Single':
        return event.info.start_date === dateStr;
      
      case 'Weekly':
        return event.info?.some(info => 
          info.start_day === dayOfWeek && 
          isWithinDateRange(info)
        );
      
      case 'Monthly':
        return event.info?.some(info => 
          info.start_day === dayOfMonth && 
          isWithinDateRange(info)
        );
      
      default:
        return false;
    }
  });

  // Raggruppa gli eventi per nome
  const eventsByName = new Map();

  filteredEvents.forEach(event => {
    if (!eventsByName.has(event.name)) {
      eventsByName.set(event.name, event);
    }
  });

  return Array.from(eventsByName.values());
}

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
  if (day.events.length === 0) return;

  const date = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.date);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
  const event = day.events[0];

  console.log(day)

  const query = {
    selectedDate: formattedDate
  };

  router.push({
    name: 'EventDetails',
    params: { id: event.id }
  });
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
