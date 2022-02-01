var newBtnElId = "liveToastBtn";
var taskInputElId = "task";
var todoListElId = "list";

var toastAddedToListId = "#toastAddedToList";
var toastErrorAddedToListId = "#toastErrorAddedToList";

var uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const INITIAL_TODO_LIST = [
  { id: uid(), body: "3 Litre Su İç" },
  { id: uid(), body: "Ödevleri Yap" },
  { id: uid(), body: "En Az 3 Saat Kodlama Yap" },
  { id: uid(), body: "Yemek Yap" },
  { id: uid(), body: "50 Sayfa Kitap Oku" },
];

var todoListArr = [];

var removeTodoFromTodoListArray = (id) => {
  var removeTodoItem = todoListArr.filter((todo) => {
    return todo.id !== id;
  });

  todoListArr = [...removeTodoItem];
  setTodoListToLocalStorage(todoListArr);
};

var removeTodoClicked = (todoEl) => {
  removeTodoFromTodoListArray(todoEl.id);
  todoEl.remove();
};

var listenTodoInput = () => {
  document.getElementById(taskInputElId).addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      newElement();
    }
  });
};

var todoClicked = (listItem) => {
  listItem.classList.toggle("checked");
};

var clearTaskInput = () => {
  var taskInputEl = document.getElementById(taskInputElId);
  taskInputEl.value = "";
};

var createTodoItem = ({ body, id }) => {
  var todoListEl = document.getElementById(todoListElId);

  var newTodoItemEl = document.createElement("li");
  var todoText = document.createTextNode(body);
  newTodoItemEl.id = id;
  newTodoItemEl.appendChild(todoText);

  var removeTodoBtnEl = document.createElement("span");
  removeTodoBtnEl.innerText = "x";
  removeTodoBtnEl.className = "close";
  removeTodoBtnEl.addEventListener("click", (e) =>
    removeTodoClicked(e.target.parentElement)
  );

  newTodoItemEl.appendChild(removeTodoBtnEl);

  newTodoItemEl.addEventListener("click", (e) => todoClicked(e.target));

  todoListEl.append(newTodoItemEl);
};

var newElement = () => {
  var todoListEl = document.getElementById(todoListElId);
  var taskInputEl = document.getElementById(taskInputElId);

  var todoVal = taskInputEl.value.trim();

  if (todoVal === "") {
    $(toastErrorAddedToListId).toast("show");

    clearTaskInput();
    taskInputEl.focus();

    return;
  }

  var newTodoItem = { id: uid(), body: todoVal };
  createTodoItem(newTodoItem);

  todoListArr.push(newTodoItem);

  setTodoListToLocalStorage(todoListArr);

  clearTaskInput();
  taskInputEl.focus();

  $(toastAddedToListId).toast("show");
};

var setTodoListToLocalStorage = (list) => {
  localStorage.setItem("TODOJS_STORAGE", JSON.stringify(list));
};

var getTodoListFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("TODOJS_STORAGE"));
};

var todoListFromStorage = getTodoListFromLocalStorage();

if (todoListFromStorage === null || todoListFromStorage.length < 1) {
  todoListArr = INITIAL_TODO_LIST;
  setTodoListToLocalStorage(todoListArr);
} else {
  todoListArr = todoListFromStorage;
}

todoListArr.forEach((todoItem) => {
  createTodoItem(todoItem);
});

listenTodoInput();
