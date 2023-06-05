
function addEventListeners() {
    var canRemoveButtons = document.querySelectorAll('.canRemove');
    var addGoodsButtons = document.querySelectorAll('.addGoods');
  
    canRemoveButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          var goodsElement = button.nextElementSibling;
          var currentAmount = parseInt(goodsElement.innerText);
      
          if (currentAmount > 1) {
            currentAmount--;
            goodsElement.innerText = currentAmount;
      
            var line = button.closest('.line');
            var fieldBorder = line.querySelector('.block');
            var placeholderValue = fieldBorder.querySelector('.names').value;
            var productItems = document.querySelectorAll('.left .product-item');
            var amounts = document.querySelectorAll('.left .product-item .amount');
      
            productItems.forEach(function(productItem, index) {
              var productItemText = productItem.textContent.trim();
              if (productItemText.includes(placeholderValue)) {
                amounts[index].innerText = currentAmount;
              }
            });
      
            updateCanRemoveButton(goodsElement);
          }
        });
      });
      
  
    addGoodsButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var goodsElement = button.previousElementSibling;
        var currentAmount = parseInt(goodsElement.innerText);
        currentAmount++
        goodsElement.innerText = currentAmount;

        var line = button.closest('.line');
        var fieldBorder = line.querySelector('.block');
        var placeholderValue = fieldBorder.querySelector('.names').value;
        var productItems = document.querySelectorAll('.left .product-item');
        var amounts = document.querySelectorAll('.left .product-item .amount');
  
        productItems.forEach(function(productItem, index) {
          var productItemText = productItem.textContent.trim();
          if (productItemText.includes(placeholderValue)) {
            amounts[index].innerText = currentAmount;
          }
        }); 

        updateCanRemoveButton(goodsElement);
      });
    });
  }
  
 
  function updateCanRemoveButton(goodsElement) {
    var currentAmount = parseInt(goodsElement.innerText);
    var canRemoveButton = goodsElement.previousElementSibling;
  
    if (currentAmount <= 1) {
      canRemoveButton.classList.remove('canRemove');
      canRemoveButton.classList.add('cantRemove');
    } else {
      canRemoveButton.classList.remove('cantRemove');
      canRemoveButton.classList.add('canRemove');
    }
  }
  

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('canRemove') || event.target.classList.contains('addGoods')) {
      var line = event.target.closest('.line');
      var goodsElement = line.querySelector('.goods');
      updateCanRemoveButton(goodsElement);
    }
  });
  

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('cross')) {
      var line = event.target.closest('.line');
      line.remove();
  
      var fieldBorder = line.querySelector('.block');
      var placeholderValue = fieldBorder.querySelector('.names').value;
      var productItems = document.querySelectorAll('.left .product-item');
  
      productItems.forEach(function(productItem) {
        var productItemText = productItem.textContent.trim();
        if (productItemText.includes(placeholderValue)) {
          productItem.remove();
        }
      }); 
    }
  });
  
  

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('boughtButton')) {
      var button = event.target;
      var currentStatus = button.textContent.trim();
      var newStatus = currentStatus === "Куплено" ? "Не куплено" : "Куплено";
      button.textContent = newStatus;
  
      var line = button.closest('.line');
      var goodsName = line.querySelector('.names');
      var productItem = line.querySelector('.product-item');
      var boughtProducts = document.querySelector('.bought');
  
      if (newStatus === "Не куплено") {
        line.querySelector('.cross').style.display = "none";
        goodsName.style.textDecoration = "line-through";
        boughtProducts.appendChild(productItem);
      } else {
        line.querySelector('.cross').style.display = "inline-block";
        goodsName.style.textDecoration = "none";
        var leftPart = document.querySelector('.left');
        leftPart.appendChild(productItem);
      }
    }
  });
  

  var addButton = document.querySelector('.addButton');
  addButton.addEventListener('click', function() {
    var textField = document.querySelector('.goodsName');
    var inputValue = textField.value;
  
    if (inputValue.trim() !== "") {
      var newLine = document.createElement("section");
      newLine.classList.add("line");

      newLine.innerHTML = 
      `<section class="block" >
      <input type="text" class="names" value="${inputValue}">
    </section>
    <section class="block"> 
      <span class="tooltip canRemove" data-tooltip="remove product">-</span>
      <span class="goods">2</span>
      <span class="tooltip addGoods" data-tooltip="add product">+</span>
    </section>
    <section class="Bblock">
      <button class="boughtButton tooltip" data-tooltip="not bought">Куплено</button>
      <span class="tooltip cross" data-tooltip="delete">⨯</span>
    </section>
  `;

  var leftPart = document.querySelector('.first');
  leftPart.appendChild(newLine);
  textField.value = ""; 
  leftPart.style.height = (leftPart.offsetHeight + 56) + 'px';
  addEventListeners(); 
}
});


addEventListeners();
