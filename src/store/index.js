export default {

  // User object will let us check authentication status
  store: {} ,
  localStorage: window.localStorage,

  get(key){
    return this.localStorage.getItem(key);
  },

  set(key,value){
    this.localStorage.setItem(key,value);
    this.store[key] = value;
  },

  remove(key){
    this.localStorage.removeItem(key);
    delete this.store[key];
  },

  clearAll(){
    console.log('deletre kon dgee')
    this.localStorage.clear();
  },

  state(){
    return this.store;
  }

}