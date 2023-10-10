import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#1976D2', 
          secondary: '#424242',
          success: '#4CAF50', 
          error: '#FF5252',  
        },
      },
    },
  });