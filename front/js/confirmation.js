let params = new URL(document.location).searchParams; 
let id = params.toString();  
let orderId = document.getElementById('orderId');
orderId.textContent = id.slice(4);
