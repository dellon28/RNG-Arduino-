import { defineStore } from 'pinia';


export const useAppStore =  defineStore('app', ()=>{

    /*  
    The composition API way of defining a Pinia store
    ref() s become state properties
    computed() s become getters
    function() s become actions  
    */ 

    // STATES 
  


    // ACTIONS
    // ACTIONS
    const getFrequencies = async () => {
        // Check if your backend uses /api/numberfrequency or /api/number_frequency
        const URL = `http://localhost:8080/api/numberfrequency`; 
        try {
            const response = await fetch(URL);
            if (response.ok) {
                const data = await response.json();
                // Using "success" or "found" based on your typical backend response
                if (data.status === "found" || data.status === "success") return data.data;
            }
        } catch (err) { console.error('getFrequencies error: ', err.message); }
        return [];
    };

    const getOnCount = async (LED_Name) => {
        // Switching to a GET request which is standard for fetching counts
        const URL = `http://localhost:8080/api/oncount?LED_Name=${LED_Name}`;
        try {
            const response = await fetch(URL);
            if (response.ok) {
            const data = await response.json();
            // Return data.data regardless of the status string
            return data.data !== undefined ? data.data : 0; 
            }
        } catch (err) { console.error('getOnCount error: ', err.message); }
        return 0;
    };

    return { 
    // EXPORTS	
        getFrequencies,
        getOnCount
       }
},{ persist: true  });