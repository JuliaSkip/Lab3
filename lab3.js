var add = ['addTomatoes','addCookies','addCheese']
var remove = ['removeTomatoes','removeCookies','removeCheese']
var goodsAmount = [document.getElementById("tomatoesAmount"), document.getElementById("cookiesAmount"),
document.getElementById("cheeseAmount")]
var goodsAmount2 = [document.getElementById("tomatoesAmount2"), document.getElementById("cookiesAmount2"),
document.getElementById("cheeseAmount2")]
var cross = document.querySelectorAll('.cross');
var bButton = ['boughtTomatoes','boughtCookies','boughtCheese'];
var amount = [2,2,1]
var newElement

for(var i=0; i<add.length; i++){

    check();

    document.getElementById(add[i]).addEventListener("click", addGoods)
    document.getElementById(remove[i]).addEventListener("click", addGoods)
    cross[i].addEventListener("click", removeLine);
    document.getElementById(bButton[i]).addEventListener("click", boughtButton)

}


function check(){

    for(var i=0; i<add.length; i++){
        if(amount[i]===1){
            var paragraph = document.getElementById(remove[i]);
            paragraph.classList.add("cantRemove");
            paragraph.classList.remove("canRemove");
        }else if(amount[i]>1){
            var paragraph = document.getElementById(remove[i]);
            paragraph.classList.add("canRemove");
            paragraph.classList.remove("cantRemove");
        }
    }
}

function addGoods(event) {

 var buttonId = event.target.id;

  for(var i=0; i<add.length; i++){
    if (buttonId == add[i]) {
        ++amount[i]
        goodsAmount[i].innerHTML = amount[i];
        goodsAmount2[i].innerHTML = amount[i];
    }else if (buttonId == remove[i] && amount[i]!==1) {
        --amount[i];
        goodsAmount[i].innerHTML = amount[i];
        goodsAmount2[i].innerHTML = amount[i];
    }
    check();
}
}

function removeLine(event) {
    var line = event.target.closest('.line');
    var fieldBorder = line.querySelector('.names');
    var value = fieldBorder.getAttribute('value');
    var productItems = document.querySelectorAll('.left .product-item');
  
    line.remove();
  
    productItems.forEach(function(productItem) {
      var productItemText = productItem.textContent.trim();
      if (productItemText.includes(value)) {
        productItem.remove();
      }
    });
}

function boughtButton(event){
    var buttonId = event.target.id;

    for (var i = 0; i < bButton.length; i++) {
        if (buttonId == bButton[i] && document.getElementById(bButton[i]).textContent == "Куплено") {
            document.getElementById(bButton[i]).textContent = "Не куплено";
            cross[i].style.display = "none";
            var line = event.target.closest('.line');
            var fieldBorder = line.querySelector('.names');
            var value = fieldBorder.getAttribute('value');
            
          
            productItems.forEach(function(productItem) {
              var productItemText = productItem.textContent.trim();
              if (productItemText.includes(value)) {
                productItem.remove();
              }
            });

        } else if (buttonId == bButton[i] && document.getElementById(bButton[i]).textContent == "Не куплено") {
            document.getElementById(bButton[i]).textContent = "Куплено";
            cross[i].style.display = "inline-block";
        }
    }
}