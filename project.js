//code of welcome message.
var exercise1 = new Vue({
    el: '#welcomeMessage',
    data: {
        message: 'Welcome to IT Service Desk - Daily Tasks!' ,//variable for welcome message.
    }
})
//code for greeting message.
var exercise3 = new Vue({
    el: '#greetingMessage',
    data: {
        morning: new Date().getHours()<12 //check the current hour.
    }
})
//code to add names.
var app = new Vue({
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
//code to add tasks.
var app = new Vue({
  el: '#app',
  data: {
    title: "Tasks to be completed ",
    amount:"Number Of Tasks",
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
var exercise4 = new Vue ({
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

