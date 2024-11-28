/**
 * create products, search functionailty, 
 */

var express = require("express");
var app = express();

app.use(express.static("views"));       // Allow access to content of views folder
app.use(express.static("scripts"));     // Allow access to scripts folder
app.use(express.static("images"));      // Allow access to images folder
app.set("view engine", "ejs"); // This line sets the default view wngine 


var http        = require('http');
const multer    = require('multer'); // file storing middleware
var fs          = require('fs'); //writing to txt file
var flash = require('connect-flash'); //allows messages to be passed

// allow the app to access the all the json files
var contacts  = require("./models/contacts.json");
var artists   = require("./models/artists.json");


let serraVerbs = new Array();
serraVerbs = ["to roll", "to crease", "to fold", "to store", "to bend", "to shorten", "to twist", "to dapple", 
  "to crumple", "to shave", "to tear",  "to chip", "to split" , "to cut", "to sever", "to drop", "to remove", 
  "to simplify", "to differ", "to disarrange", "to open", "to mix", "to splash", "to knot", "to spill",
  "to droop", "to flow", "to curve", "to lift", "to inlay", "to impress", "to fire", "to flood", "to smear",
  "to rotate", "to swirl", "to support", "to hook", "to suspend", "to spread", "to hang", "to collect", "of tension",
  "of gravity", "of entropy", "of nature", "of grouping", "of layering", "of felting", "to grasp", "to tighten",
  "to bundle", "to heap", "to gather", "to scatter", "to arrange", "to repair", "to discard", "to pair",
  "to distribute", "to surfeit", "to compliment", "to enclose", "to surround", "to encircle", "to hole",
  "to cover", "to wrap", "to dig", "to tie", "to bind", "to weave", "to join", "to match", "to laminate",
  "to bond", "to hinge", "to mark", "to expand", "to dilute", "to light", "to modulate", "to distill",
  "of waves", "of electromagnetic", "of inertia", "of ionization", "of polarization", "of refraction",
  "of tides", "of reflection", "of equilibrium", "of symmetry", "of friction", "to stretch", "to bounce",
  "to erase", "to spray", "to systematize", "to refer", "to force", "of mapping", "of location",
  "of context", "of time", "of cabonization", "to continue"
  ];

  let amyStillman = new Array();
  amyStillman = [ "to stroke", "to gesture", "to scribble", "to scrawl", "to scratch", "to hatch", "to stain", 
    , "to brush", "to shadow", "to silhouette", "to layer", "to synthesize", "to interrogate", "to record"
    , "to concentrate", "to construct", "to design", "to study", "to wash", "to mar", "to doodle", "to demarcate"
    , "to sign", "to signify", "to esign", "to line-up", "to scroll", "to squeeze", "to underline", "to pattern"
    , "to enmesh", "to hicken", "to mbellish", "to adorn", "to inscribe", "to graph", "to lay out", "to compose", 
    "to re-jigger", "to elaborate", "to invent", "to diagram", "to map-out", "to point-out", "to plot", "to plan"
    , "to envision", "to configure", "to enlarge", "to spatialize", "to slice", "to mesmerise", "to mazimalise"
    , "to territorialise", "to demonstrate", "to stage", "to choreograph", "to animate", "to profile", "to perform" 
    , "to recall", "to narrate", "to hronicle", "to textualise", "to xhort", "to proclaim", "to tag","to calligraph", 
    "to alphabetise", "to  encrypt", "to sublimate", "to esublimate", "to hallucinate", "to echo", "to imagine"
    , "to express", "to extrude", "to intensify", "to blow-up", "to liquify", "to shine", "to irradiate"
    , "to discharge", "to pop", "to cartoon", "to imagine", "to illustrate", "to re-animate", "to jot", "to  interrogate"
    , "to remind", "to puncture", "to ponder", "to outline", "to frame", "to alter", "to re-arrange", "to cut up"
    , "to re-construct", "to cover", "to re-frame", "to edit", "to attach", "to pare down", "to abstract"
    , "to delineate", "to denote", "to examine", "to embody", "to release", "to suggest", "to daydream", "to sketch"
    , "to characterise", "to picture", "to portray", "to depict", "to observe", "to describe", "to show", "to reveal"
    , "to project", "to remember", "to fantasize", "to narrate", "to imagine", "to eroticise", "to pornograph"
    , "to mimic", "to repeat", "to render", "to freeze", "to systematize", "to evacuate", "to ridicule"
    , "to exaggerate", "to satirise", "to laugh at", "to mock", "to fool", "to baffle", "to deform"
    , "to shame", "to expose", "to embarrass", "to thwart", "to eviscerate", "to condemn", "to efface"
    , "to strike", "to erase", "to cut", "to mark", "to instrumentalise", "to dimentionalise"
  ];


  let ground = new Array();
  grounds = ["brown paper", "rice paper", "newspaper"];
  let materials = new Array();
  materials = ["biro", "acrylic ink", "calligraphy ink"];

  let lenMaterials = materials.length;
  let lenGrounds = grounds.length;
  let lenSV = serraVerbs.length;
  let lenAS = amyStillman.length;
  let ideaText = " ";
  let message = " "; //initialise message
  let msge = "here";


//
console.log('current: ' + new Date(Date.now()).toLocaleString());    
//testing by sending current timestamp to console
var wstream = fs.createWriteStream('./logs/logger.txt');    
//create a log of activity with current timestamp in a file called logger.txt
//let logger = require("./logs/logger.txt"); //{ flag: 'a+' } //flag to append? 

// Get the file contents before the append operation 
//console.log("\nFile Contents of file before append:"),
console.log("writing to file");
fs.readFileSync("./logs/logger.txt", "utf8");
fs.appendFile("./logs/logger.txt", "log file open", (err) => {
    if (err) {
        console.log(err);
    }else {
        // Get the file contents after the append operation 
        console.log("\nFile Contents of file after append:",
        fs.readFileSync("./logs/logger.txt", "utf8"));
    }
}); 


// This function calls the index view when somebody goes to the site - routes.
app.get('/', function(req, res) {
  
  // renders the index page showing products, artits and contacts from json files - these need to be same count
  //message shows on nav bar
  res.render("index", {contacts:contacts, artists:artists,  message: ''});
  console.log("Home page now rendered");    // the log function is used to output data to the terminal. 
});
 

app.get('/ideas', function(req, res) {
  res.render("ideas", {message: ''});
  console.log("idea page now rendered");    // the log function is used to output data to the terminal. 
});

//create-idea function
function createIdeaText(){
  ideaText = "action: SV " + serraVerbs[Math.floor(Math.random()*lenSV)] +" or AS: "+amyStillman[Math.floor(Math.random()*lenAS)];
  console.log("idea text: "+ideaText);    //the console.log() is used to output data to the terminal. 
  return ideaText;
};

app.post('/create-idea', function(req, res) {
  msge = createIdeaText();
    //res.render("your-idea", { message: msge}); //new page with msge passed
    res.redirect('your-idea', 202, {artists:artists, message: msge});
    console.log("idea now rendered: " +msge);    // the log function is used to output data to the terminal. 
 });

app.get('/create-idea', function(req, res) {
  let msge = createIdeaText();
    res.render("index", {contacts:contacts, artists:artists, message: msge}); //new page with msge passed
    console.log("idea now rendered: " +msge);    // the log function is used to output data to the terminal. 
 });


// ---- view all products
app.get('/products', function(req, res) {
   res.render("products", {artists:artists, message: ''});
   console.log("Product page now rendered");    // the log function is used to output data to the terminal. 
 });

// ---- view all contacts in a JSON list 
app.get("/contacts", function(req, res){
    res.render("contacts.ejs", {contacts:contacts, message: ''});
    console.log("on contacts page!")
});

// ---- add contact page rendered 
app.get("/add-contact", function(req, res){
    res.render("add-contact.ejs", {message: ''});
    console.log("on add contact page!")
});

// ---- create a contact function 
app.post("/add-contact", function(req, res){
    // function to find the max id of objects in json file
  	function getMax(contacts , id) {
  		var max
  		for (var i=0; i<contacts.length; i++) {
  			if(!max || parseInt(contacts[i][id]) > parseInt(max[id]))
  				max = contacts[i];
    		}
    		return max;
  	}
	var maxContactId = getMax(contacts, "id"); // This calls the function above and passes the result as a variable called maxContactId.
	var newMaxID = maxContactId.id + 1;  // this creates a nwe variable called newMaxID which is the max Id + 1
	console.log(newMaxID); // We console log the newMaxID for show reasons only
    
	// create a new contact based on what we have in our form on the add page 
	
	var newContact = {
    name: req.body.name,       //from form
    id: newMaxID,              //from function above
    comment: req.body.comment, //from form
    email: req.body.email      //from form
  };
  console.log(newContact); //show new contact details in console
  var json = JSON.stringify(contacts); // Convert our json data to a string
  
  // The following function reads the new data and pushes it into our JSON file
  fs.readFile('./models/contacts.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
    } else {
      contacts.push(newContact); // add the data to the json file based on the declared variable above using push()
      json = JSON.stringify(contacts, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./models/contacts.json', json, 'utf8')
    }
  })
  //res.render('contacts.ejs', {contacts: contacts, messages: 'contact added'});
  res.redirect('/contacts', 202, {message: 'contact added'});
  console.log("Add-contact page rendered and contact added"); 
});

// ---- update a contact
app.get('/edit-contact/:name', function(req, res){
  console.log("edit-contact page renderned");
  function chooseContact(indOne){ 
		return indOne.name === req.params.name;	 		
  }
	
 	var indOne = contacts.filter(chooseContact);
	res.render("edit-contact.ejs", {indOne:indOne, message: ''});
 	console.log(indOne);
});

app.post('/edit-contact/:name', function(req, res){
	var json = JSON.stringify(contacts);
	var keyToFind = req.params.name; // call name from the url

  var index = contacts.map(function(contact) {return contact.name;}).indexOf(keyToFind);
	console.log("index ", index);
	console.log("keyToFind ", keyToFind);
	// console.log("req.body.id ", req.body.id); //testing line
	
	var w = parseInt(req.body.newid); //keeping the var as an int as it would be changed to a string
	var x = req.body.newname;
	var y = req.body.newemail;
	var z = req.body.newcomment;
	
	contacts.splice(index, 1 , {id: w, name: x, email: y, comment: z} );
	json = JSON.stringify(contacts, null, 4);
	fs.writeFile('./models/contacts.json', json, 'utf8'); // Writing the data back to the file
  console.log(w, x, y, z, index);
  res.redirect('/contacts', 202, {contacts: contacts, message: 'contact updated'});
});


app.get('/about', function(req, res) {
	res.render('about', {artists:artists, message: ''});
	console.log("about page now rendered");
});


//file upload end ------------- 
app.get('/downloadRS', function(req, res) {
  var file = __dirname +'/public/RichardSerraVerbs.pdf';
	res.download(file);
	console.log("download of rs file");
});

app.get('/downloadAS', function(req, res) {
  var file = __dirname +'/public/AmyStillmanDrawingWordsExpandedField.pdf';
	res.download(file);
	console.log("download of txt file");
});



// ---- This function gets the application up and running on the development server.
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Yippee its running");
})