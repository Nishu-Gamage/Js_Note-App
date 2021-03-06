// ---------- Variables ----------
var form = document.getElementById('add-frm');    // Select form
var items = document.getElementById('items');     // Select table
var nTitle = document.getElementById('nTitle');   // Select input
var nBody = document.getElementById('nBody');     // Select textarea
var tableDiv = document.getElementById('table-div');     // Select table Div
var search = document.getElementById('srch');     // Search field
var resetBtn = document.getElementById('reset');     // Reset Btn

var noteCount = 0;
var newNote = '';
var isUpdate = false;
var record = '';
var note = '';
var body = ''; 


// ---------- Events ----------

// For page loads - call updateTable function
window.onload = updateTable;

// For form submit event 
form.addEventListener('submit', addNote);

// For search - event
search.addEventListener('keyup', searchNotes);

// For Remove
items.addEventListener('click', removeNote);

// For View & Update
items.addEventListener('click', viewNUpdateNote);

// For Reset
resetBtn.addEventListener('click', resetAll);


// ---------- Functions ----------

// updateTable - function
function updateTable(){
     // Display the table when notes get added
     if(noteCount > 0){
          // set default display property value
          tableDiv.style.display = '';
          
          // Update Note
          if(isUpdate){
               note.firstChild.textContent = nTitle.value;
               note.lastChild.textContent = nBody.value;
               // Reset Update & Note Count
               isUpdate = false;
               noteCount--;
          } else {
               items.appendChild(newNote);
          }
          
     } else {
          tableDiv.style.display = 'none';
     }
}

// Add Note - function
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
          tr.className = 'itemT';

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

          // --------- Add all td's to tr ----------
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          
          // ----- Increment note count ------
          noteCount++;

          // ----- Set new note ------
          newNote = tr;

          // Add or Update the note of the table - call function
          updateTable();
     }

     // Reset All
     resetAll();
}

// Search Notes Function 
function searchNotes(e){ 

     // Text to lower case  (e.target = Search field)
     var searchTxt = e.target.value.toLowerCase();

     // Get list (Table notes)
     var list = items.getElementsByClassName('itemT');

     // Convert list to an array
     var listArry = Array.from(list);

     listArry.forEach(function(itemT){
          // Get title (firstChild = first cell)
          var noteTitle = itemT.firstChild.textContent;
          // Match
          if(noteTitle.toLowerCase().indexOf(searchTxt) != -1){
               itemT.style.display = '';
          } else {
               itemT.style.display = 'none';
          }
     });
}

// Remove Note Function
function removeNote(e){

     if(e.target.id === 'del'){

          if(confirm("Are you sure?")){
               // Delete notes
               var tr = e.target.parentElement.parentElement;
               items.removeChild(tr);

               // Update Table
               noteCount--;
               if(noteCount === 0){
                    updateTable();  // call updateTable function 
               }
          }
     }
}

// view & Update Note Function
function viewNUpdateNote(e){

     if(e.target.id === 'vw'){
          // Get the element values & update input fields
          record = e.target.parentElement.parentElement;
          note = record.firstChild;
          
          nTitle.value = note.firstChild.textContent;
          nBody.value = note.lastChild.textContent;
           
          isUpdate = true;
     }
}

// Reset Function
function resetAll(e){
     
     nTitle.value = '';
     nBody.value = '';
     isUpdate = false;
     newNote = '';    
}