var input
var newTask
var pendingTasks
var completedTasks
var allTasks = []

// AGREGAR TAREAS
var addTask = function () {
  input = document.getElementById('taskInput')
  newTask = input.value

  if (input.value !== "") {
    input.value = ''
    allTasks.unshift({
      text: newTask,
      isPending: true
    })
  }
  printTasks()
}

var handleKeyPress = function (event) {
  if (event.code === 'Enter') {
    addTask()
  }
}

// IMPRIMIR TAREAS
var printTasks = function () {
  pendingTasks = document.getElementById('pendingTasks')
  pendingTasks.innerHTML = ''
  completedTasks = document.getElementById('completedTasks')
  completedTasks.innerHTML = ''
  allTasks.map(function (task, index) {
    var taskItem = document.createElement('li')
    taskItem.classList.add('task')
    taskItem.innerText = task.text

    // AGREGAR BOTONES
    var completeBtn = document.createElement('a')
    completeBtn.id = index
    completeBtn.href = '#'
    completeBtn.classList.add('complete')
    completeBtn.onclick = function () {
      toggleTask(this)
    }
    taskItem.appendChild(completeBtn)

    var deleteBtn = document.createElement('a')
    deleteBtn.id = index
    deleteBtn.href = '#'
    deleteBtn.classList.add('delete')
    deleteBtn.onclick = function () {
      deleteTask(this)
    }
    taskItem.appendChild(deleteBtn)

    if (task.isPending) {
      pendingTasks.appendChild(taskItem)
    } else {
      completedTasks.appendChild(taskItem)
      completeBtn.classList.add('completedColor')
    }
  })

  if(pendingTasks.children.length > 0) {
    var zeroTasks = document.getElementById('zeroTasks')
    zeroTasks.classList.add('removeNotice')
  } else {
    var zeroTasks = document.getElementById('zeroTasks')
    zeroTasks.classList.remove('removeNotice')
  }

  if (completedTasks.children.length > 0) {
    var manyTasks = document.getElementById('manyTasks')
    manyTasks.classList.add('removeNotice')
  } else {
    var manyTasks = document.getElementById('manyTasks')
    manyTasks.classList.remove('removeNotice')
  }
}

// TOGGLE PENDIENTE A COMPLETADA
var toggleTask = function (button) {
  allTasks[button.id].isPending = !allTasks[button.id].isPending
  printTasks()
}

// ELIMINAR TAREA
var deleteTask = function (btn) {
  allTasks.splice(btn.id, 1)
  printTasks()
}