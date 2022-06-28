// ---------- Variables ----------
var form = document.getElementById('add-frm');   // Select form
var items = document.getElementById('items');    // Select table
var nTitle = document.getElementById('nTitle');  // Select input
var nBody = document.getElementById('nBody');    // Select textarea
var tableDiv = document.getElementById('table-div');    // Select table Div

var noteCount = 0;
var newNote = '';


// ---------- Events ----------

// For page loads - call updateTable function
window.onload = updateTable;

// Form submit event 
form.addEventListener('submit', addNote);


// ---------- Functions ----------

// updateTable function
function updateTable(){
     // Display the table when notes get added
     if(noteCount > 0){
          // set default display property value
          tableDiv.style.display = '';
          items.appendChild(newNote);
     } else {
          tableDiv.style.display = 'none';
     }
}

// Add Note function
function addNote(e){
     
     e.preventDefault();   // Stop reloading the page
     
     // Validate Inputs
     if(nTitle.value == "" || nBody.value == ""){
          alert("Please fill all fields!");
     }
     else
     {    // Create a new note record          

          // New tr
          var tr = document.createElement('tr');
          tr.className = 'item';

          // ------------------ td1 - Form Data ------------------------
          // New td for title and body
          var td1 = document.createElement('td');
          // Get Insert data from - InputBox 
          td1.appendChild(document.createTextNode(nTitle.value));

          // Create a span tag
          var span = document.createElement('span');
          span.className = 'note-body';
          // Get Insert data from - Textarea 
          span.appendChild(document.createTextNode(nBody.value));

          td1.appendChild(span);
          console.log('Table td1 : ' , td1);

          // ------------------ td2 - View btn ------------------------
          // New td for view btn
          var td2 = document.createElement('td');
          td2.className = 'btCellV';
          
          // Create a btn tag
          var btn1 = document.createElement('button');
          btn1.appendChild(document.createTextNode('View'));
          btn1.setAttribute('class', 'btn btn-warning p-2 mt-2');
          btn1.setAttribute('id', 'vw');
          
          td2.appendChild(btn1);
          console.log('Table td2 : ' , td2);

          // ------------------ td3 - Delete btn ------------------------
          // New td for Delete btn
          var td3 = document.createElement('td');
          td3.className = 'btCellD';
          
          // Create a btn tag
          var btn2 = document.createElement('button');
          btn2.appendChild(document.createTextNode('Delete'));
          btn2.setAttribute('class', 'btn btn-danger p-2 mt-2');
          btn2.setAttribute('id', 'del');

          td3.appendChild(btn2);
          console.log('Table td3 : ' , td3);

          // --------- Add all td's to tr ----------
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          console.log('Table TR : ' , tr);

          
          // ----- Increment note count ------
          noteCount++;

          // ----- Set new note ------
          newNote = tr;

          // Add or Update the note of the table  - call function
          updateTable();
     }

}

