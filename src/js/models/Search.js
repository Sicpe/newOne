

import axios from 'axios';
import { key, proxy } from '../config';

 export default class Search {
     constructor(query) {
         this.query = query;
     }
     
     async getResults() {

      try {
          const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
          this.result = res.data.recipes;
       } catch (error) {
          alert(error);
      }
    }
     
 }
 






//5930bab976c40c4417be86303c73a277
//https://www.food2fork.com/api/search
//https://cors-anywhere.herokuapp.com/ - proxy





