let addbtn = document.querySelector(".add");
let body = document.querySelector("body");
let dltbtn = document.querySelector(".delete");
let grid =  document.querySelector(".grid");

let colors = ["pink", "blue", "green", "black"];
let deleteMode = false; 
let filterMode = false;

let allFiltersChilddren = document.querySelectorAll(".filter div");

for(let i=0;i<allFiltersChilddren.length;i++){
   allFiltersChilddren[i].addEventListener("click", function(e){
      if(e.currentTarget.classList.contains(".filter-selected")){
         e.currentTarget.classList.remove(".filter-selected");
         filterMode = false;
         loadTickets();
      }else{
         e.currentTarget.classList.add(".filter-selected");
         filterMode = true;
         let filterCol = e.currentTarget.classList[0];
         loadTickets(filterCol);
      }
   })
}

loadTickets();

if(localStorage.getItem("AllTickets") == undefined){
   let allTickets = {};

   allTickets = JSON.stringify(allTickets);

   localStorage.setItem("AllTickets", allTickets);
}

dltbtn.addEventListener("click", function(e){
   if(e.currentTarget.classList.contains("delete-selected")){
      e.currentTarget.classList.remove("delete-selected");
      deleteMode = false;
   }else{
      e.currentTarget.classList.add("delete-selected");
      deleteMode = true;
   }
}); 

addbtn.addEventListener("click", function(e){

   dltbtn.classList.remove("delete-selected");
   deleteMode = false;

   let perModal = document.querySelector(".modal");

   if(perModal!=null){
      return;
   }

   let div = document.createElement("div");
   
   div.classList.add("modal");

   div.innerHTML = ` <div class="task-section">
                     <div class="task-inner-container" contenteditable="true"></div>
                     </div>
                     <div class="modal-priority-section">
                        <div class="priority-inner-container">
                           <div class="modal-priority pink"></div>
                           <div class="modal-priority blue"></div>
                           <div class="modal-priority green"></div>
                           <div class="modal-priority black"></div>
                        </div>
                     </div>`;

   let ticketColor = "black";

   let allModalPrority = div.querySelectorAll(".modal-priority");

   for(let i=0;i<allModalPrority.length;i++){
      allModalPrority[i].addEventListener("click", function(e){
         
         
         for(let j=0;j<allModalPrority.length;j++){
            allModalPrority[j].classList.remove("selected");
         }
         e.currentTarget.classList.add("selected");

         ticketColor = e.currentTarget.classList[1];
      });
   }

   let taskInnerContainer = div.querySelector(".task-inner-container");

   taskInnerContainer.addEventListener("keydown", function(e){
      if(e.key == "Enter"){ 
         let id = uid();
         let task = e.currentTarget.innerText;
         //save data on local storage
         
         //step-1 to bring data from local storage
         let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

         //step-2 to update the data in the local storage
         
         let ticketObj = {
            color: ticketColor,
            taskValue: task,   
         };

         allTickets[id] = ticketObj;

         //step-3 to save the updated object back in local storage

         localStorage.setItem("AllTickets",JSON.stringify(allTickets));


         //to create ticket
         let ticketDiv = document.createElement("div");
         ticketDiv.classList.add("ticket");

         ticketDiv.setAttribute("data-id", id);

         ticketDiv.innerHTML = ` <div class="ticket-color ${ticketColor}" data-id = ${id}></div>
                                 <div class="ticket-id">#${id}</div>
                                 <div class="actual-task" contenteditable = "true" data-id = ${id}>${task}</div> `;
         
         let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
         
         let actualTaskDiv = ticketDiv.querySelector(".actual-task");

         actualTaskDiv.addEventListener("input",function(e){
            let updatedTask = e.currentTarget.innerText;
            let currTicketId = e.currentTarget.getAttribute("data-id");

            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

            allTickets[currTicketId].taskValue = updatedTask;

            localStorage.setItem("AllTickets", JSON.stringify(allTickets));

         });

         ticketColorDiv.addEventListener("click", function(e){
            let currTicketId = e.currentTarget.getAttribute("data-id");
            let currColor = e.currentTarget.classList[1];
            let pos = colors.findIndex(color => color === currColor);
            pos++;
            pos = pos % 4;
            let newColor = colors[pos];

            //to bring all tickets; to update; to save it back
            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

            allTickets[currTicketId].color = newColor;

            localStorage.setItem("AllTickets", JSON.stringify(allTickets));
             

            ticketColorDiv.classList.remove(currColor);
            ticketColorDiv.classList.add(newColor);
         });

         ticketDiv.addEventListener("click", function(e){
            if(deleteMode){

               let currTicketId = e.currentTarget.getAttribute("data-id");

               e.currentTarget.remove();

               let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

               delete allTickets[currTicketId]; 

               localStorage.setItem("AllTickets", JSON.stringify(allTickets));

            }
         });

         grid.append(ticketDiv);
         div.remove()
      }
      else if(e.key == "Escape"){
         div.remove();
      }
   });

   body.append(div); 

});


function loadTickets(color){

   let ticketsOnUi = document.querySelectorAll(".ticket");

   for (let i = 0; i < ticketsOnUi.length; i++) {
      ticketsOnUi[i].remove();
   }

   //1- fetch alltickets data

   let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

   //2- create ticket ui for each ticket obj
   //3- attach required listners
   //4- add tickets in the grid section of ui
   for(x in allTickets){ 

      let currTicketId = x;
      let singleTicketObj = allTickets[x];

      if (color) {
         if (color != singleTicketObj.color) continue;
      }

      let ticketDiv = document.createElement("div");
         ticketDiv.classList.add("ticket");

         ticketDiv.setAttribute("data-id", currTicketId);

         ticketDiv.innerHTML = ` <div class="ticket-color ${singleTicketObj.color}" data-id = ${currTicketId}></div>
                                 <div class="ticket-id">#${currTicketId}</div>
                                 <div class="actual-task" contenteditable = "true" data-id = ${currTicketId}>${singleTicketObj.taskValue}</div> `;
   
      let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

      let actualTaskDiv = ticketDiv.querySelector(".actual-task");
   
      actualTaskDiv.addEventListener("input",function(e){
         let updatedTask = e.currentTarget.innerText;
         let currTicketId = e.currentTarget.getAttribute("data-id");
   
         let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
   
         allTickets[currTicketId].taskValue = updatedTask;
   
         localStorage.setItem("AllTickets", JSON.stringify(allTickets));
   
      });
   
      ticketColorDiv.addEventListener("click", function(e){
         let currTicketId = e.currentTarget.getAttribute("data-id");
         let currColor = e.currentTarget.classList[1];
         let pos = colors.findIndex(color => color === currColor);
         pos++;
         pos = pos % 4;
         let newColor = colors[pos];
   
         //to bring all tickets; to update; to save it back
         let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
   
         allTickets[currTicketId].color = newColor;
   
         localStorage.setItem("AllTickets", JSON.stringify(allTickets));
            
   
         ticketColorDiv.classList.remove(currColor);
         ticketColorDiv.classList.add(newColor);
      });
   
      ticketDiv.addEventListener("click", function(e){
         if(deleteMode){
   
            let currTicketId = e.currentTarget.getAttribute("data-id");
   
            e.currentTarget.remove();
   
            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));
   
            delete allTickets[currTicketId]; 
   
            localStorage.setItem("AllTickets", JSON.stringify(allTickets));
   
         }
      });
                              
      grid.append(ticketDiv);
   }

   
}




