const $ = document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)
const deleteImgURL = './assets/icons/delete.png'
const editImgURL = './assets/icons/edit.png'
const confirmImgURL = './assets/icons/confirm.png'
const app = {

    data:{
        toDos:[
            {title:'coding', 
                isComplete: false, 
                id:'coding0',
                time:'8:00 PM',

            },
            {title:'Go football',
                isComplete: true, 
                id:'Gofootball1',
                time:'9:15 AM',

            },
            {title:'Running', 
                isComplete: false, 
                id:'Running2',
                time:'4:00 AM',

            },
        ],
        inputValue:'',
   
    },

    setCurDateTime: function() {
        let date = new Date();
 
        // Lấy số thứ tự của ngày hiện tại
        let curDay = date.getDay();
        // Biến lưu tên của thứ
        let day_name = '';
        
        // Lấy tên thứ của ngày hiện tại
        switch (curDay) {
        case 0:
            day_name = "Sunday";
            break;
        case 1:
            day_name = "Monday";
            break;
        case 2:
            day_name = "Tuesday";
            break;
        case 3:
            day_name = "Wednesday ";
            break;
        case 4:
            day_name = "Thursday ";
            break;
        case 5:
            day_name = "Friday ";
            break;
        case 6:
            day_name = "Saturday ";
        }


        //get date
        let curDate = date.getDate()
        let supTag = ['st', 'nd', 'rd', 'th']
        switch (curDate) {
            case 1:
                supTag = 'st'
                break;
            case 31:
                supTag = 'st'
                break;
            case 2:
                supTag = 'nd'
                break;
            case 3:
                supTag = 'rd'
                break;
        
            default:
                supTag = 'th'
                break;
        }

        //get month
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        let curMonth = months[ date.getMonth() ]
        //set date
        $('.date').innerHTML = `
            <div>${day_name}, ${curDate}<sup>${supTag}</sup></div>
            <span>${curMonth}</span>
        `

        // Get Time
        const curTime = date.toLocaleString(
            'en-US', 
            { hour: 'numeric', minute: 'numeric', hour12: true }
        )
    },

    setTotalTask: function() {
        let totalTask = this.data.toDos.length

        $('.total-tasks').innerHTML = `<span><strong>${totalTask}</strong> Tasks</span>`
    },

    handleEvents: function() {
        //CheckBox Clicked
        $('.todo_list').onclick = (e) => {
            //CheckBox Clicked
            if(e.target.nodeName === "INPUT"&&e.target.id) {
                const updatedList = [...this.data.toDos]
                //get index
                const index = updatedList.findIndex(
                    (el) => (el.id == e.target.id)
                )
                //
                const isComplete = !updatedList[index].isComplete
                updatedList[index].isComplete = isComplete
                this.data.toDos = updatedList
                this.render()
            }
        //Delete button clicked
           if(e.target.className === "delete_btn") {
                const updatedList = [...this.data.toDos]
                  //get index
                  const index = updatedList.findIndex(
                    (el) => (el.id == e.target.id)
                )
                //
                updatedList.splice(index, 1)
                this.data.toDos = updatedList
                this.render()

           }
        //Edit button clicked
           if(e.target.className === "edit_btn") {
                //Clone Task
                const updatedList = [...this.data.toDos]
                //get index
                const index = updatedList.findIndex(
                  (el) => (el.id == e.target.id)
                )
                //Create New El
                const newEl = document.createElement('div')
                newEl.setAttribute("class", "editInput-wrapper")

                newEl.innerHTML = `
                    <input class="editInput"
                        type="text"
                        value="${updatedList[index].title}" 
                        placeholder="Edit Task" />
                    <img class="confirmEditBtn" src="${confirmImgURL}"  />
                `
                const el =  e.target.parentNode.parentNode
                el.parentNode.replaceChild(newEl, el)
                this.handleInputEdit()

           }
        }

        //Set inputValue
            const inputEl = $('.input')
            inputEl.onchange = (e) => {
                this.data.inputValue = e.target.value
                inputEl.value = ''
            }
        //Add task
            $('.submit-btn').onclick = () => {
                const date = new Date()
                const curTime = date.toLocaleString(
                    'en-US', 
                    { hour: 'numeric', minute: 'numeric', hour12: true }
                )
                const newTask = this.data.inputValue
                const oldTask = this.data.toDos
                if(newTask) {
                const updatedList = [
                    ...oldTask,
                    {title:newTask, 
                        isComplete: false, 
                        id:`${newTask}${oldTask.length}`.replace(/\s+/g, ''),
                        time:`${curTime}`
                    }
                    ]
                    this.data.toDos = updatedList
                }
    
                this.render()
                this.data.inputValue = ''
            }
        


    },
 
    handleInputEdit:function() {
        //Edit Input Onchange
        $('.editInput').onchange = (e) => {
            const liNode = e.target.parentNode.parentNode
            console.log(liNode.id)
            let updatedList = [...this.data.toDos]
            //get index
            const index = updatedList.findIndex(
              (el) => (el.id == liNode.id)
            )
            updatedList = [
                ...updatedList.slice(0, index),
                {...updatedList[index], title:e.target.value},
                ...updatedList.slice(index + 1)
            ]
            console.log(updatedList)
            this.data.toDos = updatedList

        }

        $('.confirmEditBtn').onclick = () => {
            console.log("Click")
            this.render()
        }
    },

    //show time
     showTime: function() {
         console.log($('.clock'))
        let time = new Date();
        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        am_pm = "AM";
      
        if (hour > 12) {
            hour -= 12;
            am_pm = " PM";
        }
        if (hour == 0) {
            hr = 12;
            am_pm = " AM";
        }
      
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
      
        let currentTime = hour + ":" 
                + min + ":" + sec + am_pm;
      
       $('.clock').innerHTML = currentTime;
                
    },
    render: function() {
        this.setCurDateTime()
        this.setTotalTask()
        const html = this.data.toDos.map(item => {
            const isChecked = item.isComplete ? 'checked' : ''
            let className = ''
            className = isChecked? 'main-content checked' : 'main-content'
            return `
            <li class="list_item" id="${item.id}">
                <div class="list_item--wrapper">
                    <div class="${className}">
                        <input id="${item.id}" 
                            class="check-box" 
                            type="checkbox"
                            ${isChecked}>
                            <div class="title">
                                ${item.title}
                            </div>
            
                    </div>

                    <div class="control_btn">
                        <img id="${item.id}" class ="delete_btn" src="${deleteImgURL}"  />
                        <img id="${item.id}" class ="edit_btn" src="${editImgURL}"  />
                    </div>
                </div>
                <div class="curTime">
                ${item.time}
                </div>
            </li>
            `
        })
        $('.todo_list').innerHTML = html.join(' ')
    },
    start: function() {
        this.render()
        setInterval(this.showTime, 1000);
        this.handleEvents()
    }
}
app.start()