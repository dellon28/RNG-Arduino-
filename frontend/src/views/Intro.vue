<template>
  <v-container class="container">
    
    <v-row class="row bg-surfaceVariant" justify="center">
      <v-col class="col col1" align="center">
        <v-card class="pa-2" elevation="2">
          <v-card-item>
            <v-icon v-if="Mqtt.payload.ledA == 0" size="50" icon="mdi:mdi-lightbulb"></v-icon>
            <v-icon v-if="Mqtt.payload.ledA == 1" size="50" icon="mdi:mdi-lightbulb-on" color="yellow"></v-icon>
          </v-card-item>
          <v-card-item>
            <v-btn class="text-caption" text="Toggle" variant="tonal" color="primary" density="compact" @click="toggle('LED A')"></v-btn>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col class="col col2" align="center">
        <v-card class="pa-2" elevation="2">
          <v-card-item>
            <v-icon v-if="Mqtt.payload.ledB == 0" size="50" icon="mdi:mdi-lightbulb"></v-icon>
            <v-icon v-if="Mqtt.payload.ledB == 1" size="50" icon="mdi:mdi-lightbulb-on" color="yellow"></v-icon>
          </v-card-item>
          <v-card-item>
            <v-btn class="text-caption" text="Toggle" variant="tonal" color="primary" density="compact" @click="toggle('LED B')"></v-btn>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="row" justify="center">
      <v-col class="bg-black col col3" align="center">
        <span class="digit text-error">
          <span v-if="Mqtt.payload.number == 0">&#x1fbf0;</span>
          <span v-else-if="Mqtt.payload.number == 1">&#x1fbf1;</span>
          <span v-else-if="Mqtt.payload.number == 2">&#x1fbf2;</span>
          <span v-else-if="Mqtt.payload.number == 3">&#x1fbf3;</span>
          <span v-else-if="Mqtt.payload.number == 4">&#x1fbf4;</span>
          <span v-else-if="Mqtt.payload.number == 5">&#x1fbf5;</span>
          <span v-else-if="Mqtt.payload.number == 6">&#x1fbf6;</span>
          <span v-else-if="Mqtt.payload.number == 7">&#x1fbf7;</span>
          <span v-else-if="Mqtt.payload.number == 8">&#x1fbf8;</span>
          <span v-else-if="Mqtt.payload.number == 9">&#x1fbf9;</span>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useMqttStore } from '@/store/mqttStore';
import { onMounted } from 'vue';

const Mqtt = useMqttStore();

const toggle = (name) => {
  // FIX: Ensure the keys match what your Python backend expects (e.g., 'type' or 'action')
  // We wrap the object in JSON.stringify to prevent the "Expecting Value" error in Python
  const payload = {
    "type": "toggle",
    "device": name 
  };
  
  const message = JSON.stringify(payload);
  
  // Use your ID topic with the _sub suffix
  Mqtt.publish("620169500_sub", message); 
}

onMounted(() => {
    // Connect to Mosquitto via WebSockets on port 9001
    Mqtt.connect(); 
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols+2&display=swap');

.digit {
  font-family: 'Noto Sans Symbols 2'; 
  font-size: 250px;
}

.container { 
  height: 100%;
  /* border: 1px solid blue; */
}

.row {
  width: 100%; 
  margin: 10px 0px; 
  padding: 10px;
  /* border: 1px solid purple; */
}

.col {
  /* border: 1px solid green; */
  margin: 0px 10px;
}

.col1, .col2 {
  max-width: 200px;
}

.col3 {
  max-width: 270px; 
  height: 320px;
  border: 2px solid lightslategray;
}
</style>