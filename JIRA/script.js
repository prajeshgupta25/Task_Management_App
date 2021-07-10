let addbtn = document.querySelector(".add");
let body = document.querySelector("body");
let dltbtn = document.querySelector(".delete");
let grid =  document.querySelector(".grid");

let colors = ["pink", "blue", "green", "black"];

addbtn.addEventListener("click", function(e){

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
         let ticketDiv = document.createElement("div");
         ticketDiv.classList.add("ticket");

         ticketDiv.innerHTML = ` <div class="ticket-color ${ticketColor}"></div>
                                 <div class="ticket-id">#pg2510</div>
                                 <div class="actual-task">${e.currentTarget.innerText}</div> `;
         
         let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
         ticketColorDiv.addEventListener("click", function(e){
            let currColor = e.currentTarget.classList[1];
            let pos = colors.findIndex(color => color === currColor);
            pos++;
            pos = pos % 4;
            let newColor = colors[pos];
            ticketColorDiv.classList.remove(currColor);
            ticketColorDiv.classList.add(newColor);
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

dltbtn = addEventListener("click", function(e){

    
})

