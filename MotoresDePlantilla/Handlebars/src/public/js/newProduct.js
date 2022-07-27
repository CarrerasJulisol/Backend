console.log('soy el new Producto punto js')
const Form = document.getElementById('productForm');

Form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const formData = new FormData(Form);
    console.log(formData)
    fetch('/api/productos',{
        method:"POST",
        body:formData,
    }).then(result=>result.json()).then(json=>console.log(json));
})
