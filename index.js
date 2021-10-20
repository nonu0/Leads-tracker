let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEL = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage){
     myLeads = leadsFromLocalStorage 
    render(myLeads)
    
}

let tabs = [{
    url:"https://twitter.com/home"}
]

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
     })   
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    inputEl.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    let storedValues = JSON.parse(localStorage.getItem("myLeads"))
    console.log(storedValues)
    render(myLeads)
    
})

function render(Leads){
let listItems = ""

for(i=0; i < Leads.length;i++){
    // listItems += "<li><a href='"+myLeads[i]+"' target='_blank'>" + myLeads[i] + "</a></li>"
    listItems += `
        <li>
            <a target = '_blank' href = '${Leads[i]}'>
                ${Leads[i]}
            </a> 
        </li>
        `
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEL.append(li)
}
ulEL.innerHTML = listItems
}



