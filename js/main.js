document.addEventListener('DOMContentLoaded', () => {
    const colors = {
        GREEN: 'green',
        BLUE: 'blue',
        RED: 'red',
        YELLOW: 'yellow',
        PURPLE: 'purple',
      }


const model = {
    notes: [], 
    
    addNote(title, description, color) {

        // 1. создадим новую заметку
        const note = {
            isFave: false,
            id : Date.now(),
            color,
            title,
            description,
        }
        // 2. добавим заметку в начало списка
        this.notes.unshift(note)       

          // 3. обновим view
        view.renderNotes(model.notes)
    },

    deleteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId)
        
        view.renderNotes(model.notes)
    },

    toggleFave(noteId) {
        this.notes = this.notes.map((note) => {
            if (note.id === noteId) {
            note.isFave = !note.isFave
            }
            return note
        })
    
        view.renderNotes(model.notes) // Обновляем представление
    },

    isShowOnlyFavorite: false, 

    // переключать значение isShowOnlyFavorite и обновлять интерфейс
    toggleShowOnlyFavorite(isShowOnlyFavorite) {

        this.isShowOnlyFavorite = !this.isShowOnlyFavorite; // Переключаем состояние
        this.updateNotesView(); // Обновляем интерфейс
    },

    updateNotesView() { // Фильтруем заметки
        const notesToRender = this.isShowOnlyFavorite
        ? this.notes.filter((note) => note.isFave) // Только избранные
        : this.notes; // Все заметки

        // Рендерим список заметок
        view.renderNotes(notesToRender);
        // Рендерим количество заметок
        // view.renderNotesCount(notesToRender.length);
    }

}



const view = {

    init() {
        this.renderNotes(model.notes) 

        const form = document.querySelector('.note-form')
        const inputName = document.getElementById('name-note')
        const inputDescription = document.getElementById('description-note')

//добавление
        form.addEventListener('submit', (event) => {
            // Предотвращаем стандартное поведение формы
            event.preventDefault() 

            // Получаем значения из полей ввода
            const title = document.getElementById('name-note').value
            const description = document.getElementById('description-note').value

            // Находим выбранную радиокнопку
            const selectedRadio = document.querySelector('input[name="color"]:checked');

            // Получаем значение цвета из объекта colors
            const colorKey = selectedRadio ? selectedRadio.value.toUpperCase() : 'YELLOW'; // Если ничего не выбрано, используем значение по умолчанию
            const color = colors[colorKey] || colors.YELLOW; // Если цвет не найден, используем жёлтый по умолчанию

            // Вызываем метод addNote контроллера, передавая title, description и color
            controller.addNote(title, description, color) 
       
            inputName.value = '' // Очищаем поле ввода
            inputDescription.value = ''
        })


// удаление и избранное
        const noteList = document.querySelector('.notes-list')

        noteList.addEventListener('click', function (event) {
// удаление
        const deleteButton = event.target.closest('.delete')
            // 1. проверяем, что клик был по кнопке удаления
            if (deleteButton) {
            //забираем айдишник родительского элемента
            const noteId = +deleteButton.closest('li').id;
            // 2. вызываем метод контроллера для удаления задачи
            controller.deleteNote(noteId)
            }

// избранное
        const faveButton = event.target.closest('.fave')
          // проверяем, что кликнули на кнопку избранного        
            if (faveButton) {
            // id задачи хранится в id родительского элемента
            // +, используем унарный плюс для преобразования типа в number
            const noteId = +faveButton.closest('li').id;
            controller.toggleFave(noteId)
            }
        })

// // возможность отображать только избранные заметки
        const filterBox = document.querySelector('.only-favs')
        filterBox.addEventListener('change', function (event) {
            controller.toggleShowOnlyFavorite(); // Переключаем состояние
            });
        
    },


//рендер заметок
    renderNotes(notes) {

        const notesList = document.querySelector('.notes-list') //куда будем рендерить заметки

        const spanQuantity = document.querySelector('.quantity-notes') //находим span с отображением количества заметок в хэдере
        const sectionAddNotes = document.querySelector('.add-notes')//находим параграф

        const onlyFavs = document.querySelector('.only-favs')//находим лейбл с чекбоксом


        //✅ блок кода для изменения количества заметок в хэдере
        if(notes.length === 0) {   
            spanQuantity.textContent = 0
            sectionAddNotes.innerHTML = '<p class="empty-notes">У вас ещё нет ни одной заметки<br>Заполните поля выше и создайте свою первую заметку!</p>'
        } else {
            sectionAddNotes.innerHTML = ''
            spanQuantity.textContent = notes.length
        }
        


        //✅ дальше код для отрисовки каждой заметки
        let notesHTML = '' // будет хранить HTML-код для всех заметок

        // Пройтись по массиву задач и создать HTML-код для каждой задачи

        for (let i = 0; i < notes.length; i++) {
            const note = notes[i]

            notesHTML += `
            <li id="${note.id}">
                <div class="new-card">
                    <div class="card-top ${note.color}">
                        <p>${note.title}</p>
                        <div>
                            <button class="fave" type="button">
                                <img src="./assets/heart-${note.isFave ?  'active' : 'inactive'}.png" alt=""
                                width="16px"
                                height="16px">
                            </button>
                            <button class="delete" type="button">
                                <img src="./assets/trash.png" alt=""
                                width="16px"
                                height="16px">
                            </button>
                        </div>
                    </div>
                    <div class="card-content">
                        <p>${note.description}<p>                                    
                    </div>
                </div>
            </li>
          `
        }
        notesList.innerHTML = notesHTML

    },


}

const controller = {
    addNote(title, description, color) {
        // Проверяем, что строка не пустая
        if (title.trim() !== '' && description.trim() !== '') {
          model.addNote(title, description, color)
        }
    }, 
    deleteNote(noteId) {
        model.deleteNote(noteId)
    },
    toggleFave(noteId) {
        model.toggleFave(noteId)
    },
    toggleShowOnlyFavorite() {
        model.toggleShowOnlyFavorite()
    },
}

function init() {
    view.init() // код инициализации модуля view
}

init() 

})