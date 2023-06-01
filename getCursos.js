const form = document.getElementById("frmCursos");
const input = document.querySelector('.input');

const StorageName = "UnicSulClassExtension";


const replaceBackGround = async() => {   


    const element = document.getElementsByClassName("base-courses-container");
    element.scrollTop = element.scrollHeight;

    const divs = await document.getElementsByClassName("js-course-title-element"); 

    var today = new Date();
    //Efeito de teste.. data alterada para month-1 (05/2023)"
    //today.setMonth(today.getMonth() -1);

    var currentMonth = today.getMonth() +1;

    for(var i =0; i < divs.length; i++){

        var parentDiv = divs[i].parentNode;
        var parentDiv2 = parentDiv.parentNode;
        parentDiv2.style.background = 'red';

        var classTitle = divs[i].innerHTML;
        classTitle = classTitle.trim();

        var classDate =  classTitle.substring(classTitle.length - 6);
        var classAno = classDate.substring(classDate.length - 4);  
        var classMonth = classDate.substring(0,2);  
        
        if (isNaN(classDate)){
            parentDiv2.style.background = 'lightcoral';
            continue;
        }

        if (classAno == today.getFullYear() && classMonth ==  currentMonth)
        {
            parentDiv2.style.background = 'yellow';
            continue;
        }
        else if (classAno == today.getFullYear() && classMonth >  currentMonth)
        {
            parentDiv2.style.background = 'lightblue';
            continue;
        }
        else if (classAno <= today.getFullYear() || 
                (classAno == today.getFullYear() && classMonth <  currentMonth))
        {
            parentDiv2.style.background = 'lightgreen';
            continue;
        }

    }

}



form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: replaceBackGround

    });
});