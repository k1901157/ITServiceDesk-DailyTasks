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

//code to show maps (API).
var appGoogle = new Vue({
  el: '#appGoogle ',
  data: {
    place: 'Your location',//show the current location for everyone.
    country:'',
    city:'',
    latitude: '',
    longitude: '',
    active : true,
    currentTemp: '',
    minTemp: '',
    maxTemp:'',

    title: "Add your First and Last name", //variable for Add Name.
    list: [

    ],
    newItem: '',
    FirstName: '',
    LastName: '',

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
        this.getDetails();
        
      }
    }
  },

  	// Geographic details
	created() {
		navigator.geolocation.getCurrentPosition(pos => {
      console.log('got coordinates', pos.coords);
			this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.loadDetails();
		});
  },
  
   methods: {//once serching new location
    lookupCoordinates: _.debounce(function() {
      var app = this;
      app.latitude = "Searching...";
      app.longitude = "Searching...";
      //trying to get details from google
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + app.place)

            .then(function (response) {
              app.city = app.place;
              app.latitude = response.data.results[0].geometry.location.lat;
              app.longitude = response.data.results[0].geometry.location.lng;
            })
            .catch(function (error) {
              app.latitude = "Invalid place";
              app.longitude = "Invalid place";
            })
    }, 500),
    //geeting weather and more details by searching new city.
    getDetails() {
      var app = this;
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${app.place}&units=metric&APPID=ad111a052c4e8b531d0548502347b942`)
      
        .then(response => {
          app.city = response.data.name;
          app.country = response.data.sys.country;
          app.currentTemp = response.data.main.temp;
          app.minTemp = response.data.main.temp_min;
          app.maxTemp = response.data.main.temp_max;

      })
      .catch(error => {
        console.log('error');
      });
    },

    // geeting weather and more details as per geo current location
		loadDetails() {
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=ad111a052c4e8b531d0548502347b942`)
			.then(response => {
				console.log('response',response.data);
	
                this.city = response.data.name;
                this.country = response.data.sys.country;
                this.currentTemp = response.data.main.temp;
                this.minTemp = response.data.main.temp_min;
                this.maxTemp = response.data.main.temp_max;
				this.loading = false;	
			})
			.catch(error => {
				alert('Geolocation loading error')
      });
    },
  },
  beforeMount() {
    this.getDetails();
  },

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


// code for Daily Evaluation table,
var dailyEvaluation = new Vue ({
  el: '#dailyEvaluation',
  data: {
    title: "Daily Evaluation",
      tasksFirstQuarter: 0, // variables for opening tasks.


      closedTasks : [ // values of closed tasks
          { value: 0 },
      ]
  },
  computed: {
    OpenTasksTotal: function() { //  total tasks of opening tasks.
          return this.tasksFirstQuarter;
      },
      closedTasksTotal: function() { // total tasks of closed tasks.
          return this.closedTasks.reduce((acc, item) => acc + item.value, 0);
      },
      dayTotal : function() { // total task for one year.
          return this.OpenTasksTotal + this.closedTasksTotal;
      },
      status : function() { // getting evaluation as per the number of tasks.
          if(this.dayTotal < 10) {
              return 'poor';

          } else {
              return 'good';
          }
      }   
  }
})

