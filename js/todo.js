const formTodo = document.querySelector('.todo__form')
const inputTodo = document.querySelector('.todo__input');
const listTodo = document.querySelector('.todo__list');
const titleTodo = document.querySelector('.todo-title');
titleTodo.addEventListener('click', () => {
   formTodo.classList.toggle('todo-hide');
   listTodo.classList.toggle('todo-hide');
})
const baseTodo = {
   // todoSet: [
   //    {
   //       id: 'td1',
   //       post: 'Get absolutely power',
   //       complete: false
   //    },
   //    {
   //       id: 'td2',
   //       post: 'Stop Siths',
   //       complete: true
   //    }
   // ]
   todoSet: getTodoLS(),
   checkId: function(id) {
      for (let i=0; i<baseTodo.todoSet.length; i++) {
         if (baseTodo.todoSet[i].id === id) {
            baseTodo.todoSet[i].complete = true;
         }
      }
   },
   addTodo: function( post) {
      const newTodo = {
            id: 'td' + (Date.now()),
            post: post,
            complete: false
         };
      this.todoSet.push(newTodo);
      return newTodo;
   },
   dellTodo: function(id) {
      for (let i=0; i<baseTodo.todoSet.length; i++) {
         if (baseTodo.todoSet[i].id === id) {
            baseTodo.todoSet.splice(baseTodo.todoSet[i], 1);
         }
      }
      setTodoLS();
   }
};
function addNewTodo(event) {
   event.preventDefault();
   const postText = inputTodo.value;
   formTodo.reset();
   const objTodo = baseTodo.addTodo(postText);
   const todoLi = createTodo(objTodo);
   listTodo.append(todoLi);
   setTodoLS();
}
function createTodo(objTodo) {
   const contentTodo = `<article class="post ${objTodo.complete ? 'post_complete' : ''}">
                           <p class="post__todo">${objTodo.post}</p>
                           ${objTodo.complete ? `<button
                           class="post__delete"
                            type="button"
                            data-id="${objTodo.id}"
                            >X</button>` : `<button
                            class="post__ready"
                             type="button"
                             data-id="${objTodo.id}"
                             >✔</button>`}
                        </article>`;
   const li = document.createElement('li');
   li.classList.add('todo__list-item');
   li.innerHTML = contentTodo;
   return li;
}
function renderTodo() {
   for (let i=0; i<baseTodo.todoSet.length; i++) {
      let liForTodo = createTodo(baseTodo.todoSet[i]);
      listTodo.append(liForTodo);
   }
}
function checkTodo(event) {
   const btn = event.target.closest('.post__ready');
   if (btn) {
      const post = btn.closest('.post');
      changeButton(btn);
      post.classList.add('post_complete');
      const id = btn.dataset.id;
      baseTodo.checkId(id);
      setTodoLS();
   }
}

function changeButton(btn) {
   btn.className = 'post__delete';
   btn.textContent = 'X';
}

function setTodoLS() {
   localStorage.setItem('todo', JSON.stringify(baseTodo.todoSet))
}
function getTodoLS() {
   if (localStorage.getItem('todo')) {
      return JSON.parse(localStorage.getItem('todo'));
   }
   return [];
}
renderTodo();


const allTodo = document.querySelector('.todo');

function deleteTodo(event) {
   const btnDel = event.target.closest('.post__delete');
if (btnDel) {
   btnDel.addEventListener('click', () => {
      btnDel.closest('.todo__list-item').remove();
      baseTodo.dellTodo(event.target.dataset.id);
   })
}
}

allTodo.addEventListener('click', deleteTodo);
formTodo.addEventListener('submit', addNewTodo);
listTodo.addEventListener('click', checkTodo);