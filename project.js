//code of welcome message.
var welcomeMessage = new Vue({
    el: '#welcomeMessage',
    data: {
        message: 'Welcome to IT Service Desk - Daily Tasks!' ,//variable for welcome message.
    }
})
//code for greeting message.
var greetingMessage = new Vue({
    el: '#greetingMessage',
    data: {
        morning: new Date().getHours()<12 //check the current hour.
    }
})
//code to add names.
var addName = new Vue({
  el: '#addName',
  data: {
    title: "Add First and Last Name", //variable for Add Name.
    list: [

    ],
    newItem: '',
    FirstName: '',
    LastName: ''
  }
})

//code to show maps (API).
var appGoogle = new Vue({
  el: '#appGoogle ',
  data: {
    place: 'Current Location',//show the current location for everyone.
    latitude: '',
    longitude: '',
    active : true
  },
  //The watch is used to ensure that the API call only happens when there is at-least 3 character in our input field.
  watch: { 
    place: function() {
      this.latitude = '';
      this.longitude = '';
      this.active = true;
      if (this.place.length >= 3) {
        this.active = false;
        this.lookupCoordinates();
      }
    }
  },
  methods: {
    lookupCoordinates: _.debounce(function() {
      var app = this;
      app.latitude = "Searching...";
      app.longitude = "Searching...";
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + app.place)
            .then(function (response) {
              app.latitude = response.data.results[0].geometry.location.lat;
              app.longitude = response.data.results[0].geometry.location.lng;
            })
            .catch(function (error) {
              app.latitude = "Invalid place";
              app.longitude = "Invalid place";
            })
    }, 500)
  }
})

//code to add tasks.
var app = new Vue({
  el: '#app',
  data: {
    title: "Tasks to be completed ",
    amount:"Number of Tasks",
    list: [
        
    ],
    newItem: '',

  },

  computed: {
    description: function() {
      return this.amount + ' (' + this.list.length + ' Tasks)'; //number of tasks has been created.
    }
  },

  methods: {
    addToList: function () {
      this.list.push({ name: this.newItem, completed: false})
    },
}
})

//codes for API - searching names.
new Vue({
  el: "#api",
  data: {
    people: [],
    search: ""
  },
  methods: {
    getAllStarWarsPeople() {
      fetch("https://swapi.co/api/people/")// geeting names from api.
        .then(response => response.json())
        .then(res => {
          if (this.search) { //searching and trying to find the names if they are available.
            this.people = res.results.filter(people =>
              people.name.toLowerCase().includes(this.search.toLowerCase())
            );
          } else {
            this.people = res.results;
          }
        });
    }
  },
  created() {
    this.getAllStarWarsPeople();
  }
})

// code for Yearly Evaluation table,
var yearlyEvaluation = new Vue ({
  el: '#yearlyEvaluation',
  data: {
    title: "Yearly Evaluation",
      tasksFirstQuarter: 0, // variables for opening tasks.
      tasksSecondQuarter: 0,
      tasksThirdQuarter: 0,
      tasksFourthQuarter: 0,

      closedTasks : [ // values of closed tasks
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
      ]
  },
  computed: {
    OpenTasksTotal: function() { //  total tasks of opening tasks.
          return this.tasksFirstQuarter + this.tasksSecondQuarter + this.tasksThirdQuarter + this.tasksFourthQuarter;
      },
      closedTasksTotal: function() { // total tasks of closed tasks.
          return this.closedTasks.reduce((acc, item) => acc + item.value, 0);
      },
      yearTotal : function() { // total task for one year.
          return this.OpenTasksTotal + this.closedTasksTotal;
      },
      status : function() { // getting evaluation as per the number of tasks.
          if(this.yearTotal < 500) {
              return 'poor';

          } else {
              return 'good';
          }
      }   
  }
})

