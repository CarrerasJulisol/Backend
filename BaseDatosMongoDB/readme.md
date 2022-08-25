<h1 align="center">Base de datos en <em> MongoDB </em></h1>

<p>Crear base de datos ecommerce que tenga las colecciones mensajes y productos:</p>

![creacion de base](images/1.jpg)

<p>Agregar 10 documentos a las colecciones mensajes y productos:</p>

![agregar 10 documentos en mensajes](images/2.jpg)

<p></p>

![agregar 10 documentos en productos](images/3.jpg)

<p>Listar los documentos de cada colección:</p>

![documentos de mensajes](images/4.jpg)
<p></p>

![documentos en productos](images/5.jpg)

<p>Cantidad de documentos almacenados en cada colección.</p>

![cantidad de docuemntos](images/6.jpg)

<em>CRUD:</em>
<p>Agregar producto a productos</p>

![agregar producto](images/7.jpg)

<em>Consultas:</em>
<p>1. productos precio menor a 1000</p>

![productos con precio menor a 1000](images/8.jpg)

<p>2. productos precio entre 1000 y 3000</p>

![productos entre 1000 y 3000](images/9.jpg)

<p>3. productos precio mayor a 3000</p>

![productos con precio mayor a 3000](images/10.jpg)

<p>4. producto más barato</p>
<p>en la consigna pedia tercer producto más barato, pero lei mal y ya borré los más baratos. El comando en el caso de la consigna seria:</p>
<em>db.products.find().sort({price:1}).skip(2).limit(1)</em>

![producto mas barato](images/11.jpg)

<p>Agregar stock a todos los productos</p>

![agregar stock](images/12.jpg)

<p>Cambiar stock de productos con precio mayor a 4000</p>

![cambiar stock de productos](images/13.jpg)

<p>Borrar productos con precio menor a 1000</p>

![borrar productos con precio menor a 1000](images/14.jpg)
