const checkboxList = document.querySelectorAll('.check-box');
const inputFeilds= document.querySelectorAll('.input1');
const errorLabel=document.querySelector('.error');
const progressBar=document.querySelector('.progress-bar');
const progressValue =document.querySelector('.progress-value');
const bars=document.querySelector('#bar');

const allQoutes=[
  'Raise the bars by completing your goals!',
  'well begun is half done!',
  'Just a step away,keep going!',
  'Whoa! You just completed all goals , time for chill :D'
]

// hfdtttd,śt
//jdfultd

 const allGoals= JSON.parse(localStorage.getItem('allGoals'))||
{
  first:
  {name:'',
    completed:false},
  second:
  {name:' ',
    completed:false},
  third:
  {name:' ',
    completed:false},
}

let completedgoals=Object.values(allGoals).filter((goal)=>goal.completed).length;
progressValue.style.width  =`${(completedgoals/inputFeilds.length)*100}%`;
progressValue.firstElementChild.innerText=`${completedgoals}/${inputFeilds.length} completed`;
 bars.innerText=allQoutes[completedgoals];



checkboxList.forEach((check)=>{
    check.addEventListener('click',(e)=>{
        const addedGoals=[...inputFeilds].every(function(input){
            return input.value
        })

        if(addedGoals){
        check.parentElement.classList.toggle('completed');
        
        const inputId=check.nextElementSibling.id;
        allGoals[inputId].completed= !allGoals[inputId].completed;
        completedgoals=Object.values(allGoals).filter((goal)=>goal.completed).length;

        progressValue.style.width  =`${(completedgoals/inputFeilds.length)*100}%`;
        progressValue.firstElementChild.innerText=`${completedgoals}/${inputFeilds.length} completed`;
        bars.innerText=allQoutes[completedgoals];

        localStorage.setItem('allGoals',JSON.stringify(allGoals));
      }
        else{
            progressBar.classList.add('show-error');
        }  
    })

})


inputFeilds.forEach((input)=>{
  if(allGoals[input.id]){
  input.value=allGoals[input.id].name;
  
  if(allGoals[input.id].completed){
    input.parentElement.classList.add('completed');
      }
  }
  
  
  
 
  input.addEventListener('focus',()=>{ 
    progressBar.classList.remove('show-error');
  })


  input.addEventListener('input',(e) =>{
    if(allGoals[input.id]&&allGoals[input.id].completed){
      input.value=allGoals[input.id].name
      return
    }
    
    
   if( allGoals[input.id])
    {
    allGoals[input.id].name=input.value
    }

   else
   {
    allGoals[input.id]={
      name:input.value,
      completed:false
    }
   }
    
   
    
    localStorage.setItem('allGoals',JSON.stringify(allGoals));
  })
})