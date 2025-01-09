document.addEventListener('DOMContentLoaded', () => {
    const colors = {
        GREEN: 'green',
        BLUE: 'blue',
        RED: 'red',
        YELLOW: 'yellow',
        PURPLE: 'purple',
      }

    //   const MOCK_NOTES = [
    //     {
    //     id: 1,
    //     title: 'Работа с формами',
    //     description: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    //     color: colors.YELLOW,
    //     isFavorite: false,
    //   },
    //   // ...
    // ]


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



}

const view = {

    init() {
        this.renderNotes(model.notes) 

        const form = document.querySelector('.note-form')
        const inputName = document.getElementById('name-note')
        const inputDescription = document.getElementById('description-note')

        form.addEventListener('submit', (event) => {
    
            event.preventDefault() // Предотвращаем стандартное поведение формы

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
    },

    renderNotes(notes) {

        const notesList = document.querySelector('.notes-list') //куда будем рендерить заметки

        const spanQuantity = document.querySelector('.quantity-notes') //находим span с отображением количества заметок в хэдере
        const sectionAddNotes = document.querySelector('.add-notes')//находим параграф


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
                            <button class="fave">
                                <img src="./assets/heart-${note.isFave ?  'active' : 'inactive'}.png" alt=""
                                width="16px"
                                height="16px">
                            </button>
                            <button class="delete">
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
    }
}

function init() {
    view.init() // код инициализации модуля view
}

init() 

})