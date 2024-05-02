// Create an array of events for the timeline
var myEvents = [
    {
      date: 'Q1 - 2017',
      content: 'Lorem ipsum dolor sit amet'
    },
    {
      date: 'Q2 - 2017',
      content: 'Lorem ipsum dolor sit amet'
    },
    {
      date: 'Q3 - 2017',
      content: 'Lorem ipsum dolor sit amet'
    },
    // Add more events as needed
  ];
  
// Wait for the document to be ready
$(document).ready(function() {
    // Initialize the plugin
    $('#my-timeline').roadmap(myEvents, {
        // orientation: 'horizontal'
        orientation: 'vertical' // uncomment this line to set orientation to vertical
    });
});



// end of js code
// start of html code

