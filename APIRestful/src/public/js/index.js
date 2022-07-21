let prodForm = document.getElementById('prodForm')
let result
const handleSubmit = (evt,form,route) =>{
    evt.preventDefault();
    let formData = new FormData(form)
    let obj = {}
    formData.forEach((value,key)=>obj[key]=value)
    fetch(route,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(json=>result=json);
}

prodForm.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/api/productos'))