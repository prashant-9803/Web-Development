async function add() {
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;

  let res = await fetch("http://localhost:3000/add?" + "a=" + a + "&b=" + b);
  res = await res.json();

  let parent = document.getElementById("parent");
  let newDiv = document.createElement("div");
  newDiv.innerHTML("<b>" + res.ans + "</b>");
  parent.appendChild();
}
