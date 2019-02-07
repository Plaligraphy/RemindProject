const rls = require('readline-sync');
const fs = require('fs');
const http = require('http');
const mailer = require('./Mail.js');
const cmd = require('node-cmd');

var reminds = [""];
var dar;

main();

function main() {
  reminds[0] ="uno";
  reminds[1]="dos";
  reminds[2] = "tres";
  cls();
  console.log("R3M1ND");
  console.log("Options( create (c), edit (e), web (w), view (v), mail (m), exit(ex) )");
  var opt1 = rls.question();
  if(opt1 == "c" || opt1 == "C") {create();}
  else if(opt1 == 'w' || opt1 == 'W') {createHTTP();}
  else if(opt1 == "e" || opt1 == "E") {edit();}
  else if(opt1 == 'v' || opt1 == "V") {view();}
  else if(opt1 == 'm' || opt1 == "M"){mail();}
  else if(opt1 == 'd' || opt1 == 'D') {debug();}
  else if(opt1 == 'ex' || opt1 == 'Ex') {process.exit(0);}

  function createHTTP() {
    http.createServer(function (req, res) {
      res.write("<h1>R3M1ND</h1>");
      res.write("Current Reminders: ");
      res.write(String(reminds));
    }).listen(8080);
  }
}
function create() {
  cls();
  var remind = rls.question("Reminder: ");
  place = reminds.length += 1;
  reminds[place] = remind;
  backup();
  main();
}

function edit() {
  cls();
  var place = rls.question("Placement? (Array Length: (" + reminds.length + ")): ");
  var replace = rls.question("Replacement?: ");
  reminds[place] = replace;
  backup();
  main();
}

function view() {
  cls();
  for(var i=0; i < reminds.length; i++) {
    console.log(reminds[i]);
  }
  var opt2 = rls.question("Re Run?: (y/n) ");
  switch(opt2) {
    case 'y':
     main();
     break;
    case 'n':
     process.exit(0);
     break;
  }
}
function backup() {
  fs.writeFile("backup.txt", reminds, function(err){
    if(err){throw err;}});
  }
function recall() {
  fs.readFile("backup.txt", "utf-8", function read(err, data) {
    if(err){throw err;}
    reminds = data;
  });
}
function cls() {
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}
function mail() {
  var repcip = rls.question("Email of recipient?: ");
  mailer.mail(reminds, repcip);
}
