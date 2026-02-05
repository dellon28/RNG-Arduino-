<template>
  <v-container fluid align="center">
    
    <v-row justify="center" style="max-width: 1200px;">
      <v-col cols="12" align="center">
        <v-card class="pa-5" elevation="2">
          <v-card-title>Frequency of Random Numbers</v-card-title>
          <canvas id="myChart"></canvas> </v-card>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn text="Refresh Graph" color="secondary" variant="outlined" flat @click="updateGraph()"></v-btn>
      </v-col>
    </v-row>

    <v-row style="max-width: 1200px;">
      <v-divider class="mt-5 mb-5"></v-divider>
    </v-row>

    <v-row justify="center" style="max-width: 1200px;">
      <VCard class="ma-2" subtitle="LED A" width="150" flat border align="center">
        <VCardItem class="pa-0">Turned on</VCardItem>
        <VCardItem class="pa-0"><span class="text-h5 text-primary font-weight-bold">{{ led_A }}</span></VCardItem>
        <VCardItem class="pa-0">times</VCardItem>
        <VCardItem>
          <VBtn text="Update" class="ma-1 text-caption" rounded="pill" flat color="secondary" variant="tonal" @click="updateLEDCount('ledA')"></VBtn>
        </VCardItem>
      </VCard>

      <VCard class="ma-2" subtitle="LED B" width="150" flat border align="center">
        <VCardItem class="pa-0">Turned on</VCardItem>
        <VCardItem class="pa-0"><span class="text-h5 text-primary font-weight-bold">{{ led_B }}</span></VCardItem>
        <VCardItem class="pa-0">times</VCardItem>
        <VCardItem>
          <VBtn text="Update" class="ma-1 text-caption" rounded="pill" flat color="secondary" variant="tonal" @click="updateLEDCount('ledB')"></VBtn>
        </VCardItem>
      </VCard>
    </v-row>

  </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/appStore";
import Chart from 'chart.js/auto'; // Make sure you ran 'npm install chart.js'
import { onMounted, ref } from 'vue';

// VARIABLES
const AppStore = useAppStore();
const led_A = ref(0);
const led_B = ref(0);
let chart = null;

const data = {
  labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [{
    label: 'Number Frequency',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#4BD5E7',
    borderColor: '#1ECBE1',
    borderWidth: 2,
    borderRadius: 5
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: { responsive: true }
};

// FUNCTIONS
onMounted(async () => {
    const ctx = document.querySelector('#myChart');
    chart = new Chart(ctx, config);
    
    // Initial data fetch
    await updateGraph();
    await updateLEDCount('ledA');
    await updateLEDCount('ledB');
});

const updateData = (chart, labels, newData) => {
  chart.data.labels = labels;
  chart.data.datasets[0].data = newData;
  chart.update('active'); // The 'active' argument ensures a smooth animation
};

const updateGraph = async () => {
  let result = await AppStore.getFrequencies();
  if (result.length > 0) {
    let labels = result.map(obj => obj["number"]);
    let frequencies = result.map(obj => obj["frequency"]);
    updateData(chart, labels, frequencies);
  }
};

const updateLEDCount = async (name) => {
  let result = await AppStore.getOnCount(name); 
  
  if (name === "ledA") {
    led_A.value = result;
  } else if (name === "ledB") {
    led_B.value = result;
  }
};
</script>

<style scoped>
/* Any specific page styling can go here */
.v-container {
  background-color: #f5f5f5; /* Optional: light background for contrast */
}
</style>