/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function onClick(event)
{
    const container = event.currentTarget;
    const section = container.parentElement;
    const containers = section.querySelectorAll("div");
    const img = container.querySelector(".checkbox");
    for(const container of containers)
    {
        const img= container.querySelector(".checkbox");
        img.src="images/unchecked.png";
        container.classList.add("unselected");
        container.classList.remove("selected");
    }
    container.classList.add("selected");
    container.classList.remove("unselected");
    img.src="images/checked.png";
    getResult();
    console.log("div");
}

function getResult()
{
    const choices = document.querySelectorAll(".selected");
    console.log(choices.length);
    if(choices.length==3)
    {
        const firstChoice = document.querySelector("[data-question-id='one'].selected").dataset.choiceId;

        for(const pick of picks)
        {
            pick.removeEventListener('click', onClick);
        }

        for(const choice of choices)
        {
            if(map[choice.dataset.choiceId]!=null)
            {
                map[choice.dataset.choiceId]+=1;
            } else
                map[choice.dataset.choiceId]=1;
        }
        
        console.log(map);

        let value=0;
        let key="";
        for(let node in map)
        {
            console.log(node);
            if (map[node]>value)
            {
                key=node;
                value=map[node];
            }
        }

        const result=document.querySelector(".Result");
        result.classList.remove("hidden");

        if(map[key]==1)
        {
            h1=result.querySelector("h1");
            h1.textContent=RESULTS_MAP[firstChoice].title;
            p=result.querySelector("p");
            p.textContent=RESULTS_MAP[firstChoice].contents;
        } else {
            h1=result.querySelector("h1");
            h1.textContent=RESULTS_MAP[key].title;
            p=result.querySelector("p");
            p.textContent=RESULTS_MAP[key].contents;
        }

    }
}

function Restart()
{
    const allSelected=document.querySelectorAll(".selected");
    const allNotSelected=document.querySelectorAll(".unselected");
    const result=document.querySelector(".Result").classList.add("hidden");
    map={};
    
    for(const selected of allSelected)
    {
        selected.classList.remove("selected");
        const img=selected.querySelector(".checkbox");
        img.src="images/unchecked.png";
        
    }
    
    for(const unselected of allNotSelected)
    {
        unselected.classList.remove("unselected");
    }

    for(const pick of picks)
    {
        pick.addEventListener('click', onClick);
    }
    scrollTo(0,0);
}

var map={};
const picks = document.querySelectorAll("section div");
for(const pick of picks)
{
    pick.addEventListener('click', onClick);
}

const buttonRestart=document.querySelector(".button");
buttonRestart.addEventListener('click', Restart);