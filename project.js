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

//code to show maps your location From API (google map) and getting more details about your location.
var appGoogle = new Vue({
  el: '#appGoogle ',
  data: {
    
    loading: true,
    place: '',
    country:'',
    city:'',
    latitude: '',
    longitude: '',
    active : true,
    currentTemp: '',
    minTemp: '',
    maxTemp:'',
    
    // for adding new first and last name.
    titleName: "Add your First and Last name", //variable for Add Name.
    listName: [

    ],
    newItem: '',
    FirstName: '',
    LastName: '',

    //fot tasks.
    titleTasks: "Tasks to be completed ",
    amountTasks:"Number of Tasks",
    listTasks: [
        
    ],
    newItem: '',

    //for Daily Evaluation table.
    titleEvaluation: "Daily Evaluation",
    tasksOneDay: 0, // variables for opening tasks.


    closedTasks : [ // values of closed tasks
        { value: 0 },
    ]
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

  // Geographic details... getting location automatically .
	created() {
		navigator.geolocation.getCurrentPosition(pos => {
      console.log('coordinates', pos.coords);
			this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.loadDetails();// getting from this method all details that we need once the app started.
		});
  },

  
  computed: {
    //for dailly tasks.
    description: function() {
      return this.amountTasks + ' (' + this.listTasks.length + ' Tasks)'; //number of tasks has been created.
    },

    //for Daily Evaluation table.
    //nubmer of yasks will be increast once the task created
      OpenTasksTotal: function() { //  total tasks of opening tasks.
          return this.listTasks.length ;
      },
      //total daily tasks.
      dayTotal : function() { // total task for one year.
          return this.OpenTasksTotal;
      },
      // over 5 tasks per day, it will give you good evaliuation.
      status : function() { // getting evaluation as per the number of tasks.
          if(this.dayTotal < 5) {
              return 'poor';

          } else {
              return 'good';
          }
      },   
    },
  
   methods: {
     //once serching new location
    lookupCoordinates: _.debounce(function() {
      var app = this;
      app.city = "Searching...";
      app.country = "Searching...";
      app.latitude = "Searching...";
      app.longitude = "Searching...";
      //trying to get details from API
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${app.place}&units=metric&APPID=ad111a052c4e8b531d0548502347b942`)

            .then(function (response) {
              app.city = app.place;
              app.city = response.data.name;
              app.country = response.data.sys.country;
              app.currentTemp = response.data.main.temp;
              app.minTemp = response.data.main.temp_min;
              app.maxTemp = response.data.main.temp_max;
              app.latitude = response.data.coord.lat;
              app.longitude = response.data.coord.lon;
              loading = false;
            })
            .catch(function (error) {
              alert('Invlid location');

              app.city = "Invalid place";
              app.country = "Invalid place";
              app.latitude = "Invalid place";
              app.longitude = "Invalid place";
              app.currentTemp = "Error";
              app.minTemp = "Error";
              app.maxTemp = "Error";

            })
    }, 500),
    //geeting more details by searching new city.
    getDetails() {
      var app = this;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${app.place}&units=metric&APPID=ad111a052c4e8b531d0548502347b942`)
      
        .then(response => {
          console.log('response',response.data);

          app.city = response.data.name;
          app.country = response.data.sys.country;
          app.currentTemp = response.data.main.temp;
          app.minTemp = response.data.main.temp_min;
          app.maxTemp = response.data.main.temp_max;
          loading = false;

      })
      .catch(error => {
        console.log('Invlid location');
      });
    },

    // geeting more details as per geo current location
		loadDetails() {
      var app = this;
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${app.latitude}&lon=${app.longitude}&units=metric&appid=ad111a052c4e8b531d0548502347b942`)
			.then(response => {
        console.log('response',response.data);
        
                app.place = response.data.name;
                app.city = response.data.name;
                app.country = response.data.sys.country;
                app.currentTemp = response.data.main.temp;
                app.minTemp = response.data.main.temp_min;
                app.maxTemp = response.data.main.temp_max;
                loading= false;
			})
			.catch(error => {
				alert('Geolocation loading error')
      });
    },
  },
  beforeMount() {
    this.getDetails();
  },

  //for task, adding new task.
    addToList: function () {
      this.listTasks.push({ name: this.newItem, completed: false})
    },
})

