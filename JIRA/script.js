let addbtn = document.querySelector(".add");
let body = document.querySelector("body");
let dltbtn = document.querySelector(".delete");

addbtn.addEventListener("click", function(e){

   let div = document.createElement("div");
   
   div.classList.add("modal");

   div.innerHTML = '<div class="task-section"><div class="task-inner-container" contenteditable="true"></div></div><div class="modal-priority-section"><div class="priority-inner-container"><div class="modal-priority pink"></div><div class="modal-priority blue"></div><div class="modal-priority green"></div><div class="modal-priority black"></div></div></div>';

   body.append(div); 

});

dltbtn = addEventListener("click", function(e){

    
})

