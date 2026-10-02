let todoCounter = 1;

function addTodo() {
  let input = document.getElementById("input");
  let todo = input.value;
  let parent = document.getElementById("todos");

  let newDiv = document.createElement("div");
  newDiv.id = "todo" + todoCounter;

  let newSpan = document.createElement("span");
  newSpan.innerText = todo;
  newDiv.appendChild(newSpan);

  let newBtn = document.createElement("button");
  newBtn.innerText = "Delete";
  newBtn.setAttribute("onclick", "deleteTodo(" + todoCounter + ")");
  newDiv.appendChild(newBtn);

  parent.appendChild(newDiv);

  todoCounter++;
}

function deleteTodo(index) {
  let div = document.getElementById("todo" + index);
  console.log(div);
  div.parentElement.removeChild(div);
}
