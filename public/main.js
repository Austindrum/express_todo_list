// const todoToggle = document.querySelectorAll(".todo-toggle");
// todoToggle.forEach(todo=>{
//     todo.addEventListener("click", (e)=>{
//         let toogleTodo = e.target.dataset.id;
//         fetch(`http://localhost:5000/todos/${toogleTodo}/todo_update`)
//         .then(res=>{
//             console.log(res);
//         })
//     })
// })
window.onload = () => {
    //todo status toggle
    $('.todo-toggle').on('click', (e)=>{
        let id = e.target.dataset.id;
        $.ajax({
            url: `http://localhost:5000/todos/${id}/todo_update`,
            method: 'GET',
            error: (err) => console.log(err),
            success: (res) => console.log(res)
        });
    })
}