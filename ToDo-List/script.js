$(document).ready(function () {
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
    // Add a new task
    $('#addTask').click(function () {
        let taskText = $('#task').val();  

        if (taskText !== '') {
            let newTask = `
               <li>
                    <div class="task-content">
                        <input type="checkbox" class="task-checkbox">
                        <span class="task-text">${taskText}</span>
                    </div>
                    <div class="task-icons">
                        <!-- Font Awesome icons for edit and delete -->
                        <i class="fas fa-edit edit-icon"></i>
                        <i class="fas fa-trash delete-icon"></i>
                    </div>
                </li>
            `;
            $('#taskList').append(newTask);  
            $('#task').val('');  
        }
        else alert("You must write something!");
        
    });

    // Mark task as completed
    $(document).on('change', '.task-checkbox', function () {
        $(this).closest('li').toggleClass('completed');  

        checkAllTasksCompleted();
    });

    // Delete a task
    $(document).on('click', '.delete-icon', function () {
        $(this).closest('li').remove();  
    });

    // Edit a task
    $(document).on('click', '.edit-icon', function () {
        const taskText = $(this).closest('li').find('.task-text');
        const isEditing = $(this).hasClass('editing');

        if (isEditing) {
            // Save edited text
            const inputField = $(this).closest('li').find('.edit-input');
            taskText.text(inputField.val()).show();
            inputField.remove();
            $(this).removeClass('editing').addClass('fa-edit').removeClass('fa-check');
        } else {
            // Switch to editing mode
            taskText.hide();
            $(this).closest('li').find('.task-content').append(`<input type="text" class="edit-input" value="${taskText.text()}">`);
            $(this).addClass('editing').removeClass('fa-edit').addClass('fa-check');
        }
    });
    function showSuccessAlert() {
        var alertMessage = document.getElementById('alertMessage'); 
         
        alertMessage.classList.add('show'); 
        
        setTimeout(function () {
            alertMessage.classList.remove('show');
        }, 3000);
    }
    function checkAllTasksCompleted() {

        let totalTasks = $('#taskList li').length;
        let completedTasks = $('#taskList li.completed').length;

        if (totalTasks > 0 && totalTasks === completedTasks) {
            showSuccessAlert();

        }
    }

});
