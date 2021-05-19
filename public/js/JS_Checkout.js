window.onload= pageLoad;
function pageLoad(){
    document.getElementById("checkout").onclick=Checkout;

}
function Checkout(){
    swal("Complete", "Order Successful", "success");
}