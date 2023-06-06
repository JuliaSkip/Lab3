//minus button
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
      
  //plus button
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
  
 //changes minus button
  function updateCanRemoveButton(goodsElement) {
    var currentAmount = parseInt(goodsElement.innerText);
    var canRemoveButton = goodsElement.previousElementSibling;
  
    if (currentAmount <= 1) {
      canRemoveButton.style.backgroundColor = 'rgb(236, 179, 179)';
      canRemoveButton.style.borderBottom = '0.2rem solid rgb(236, 179, 179)';
    } else {
      canRemoveButton.style.backgroundColor = 'red';
      canRemoveButton.style.borderBottom = '0.2rem solid rgb(197, 22, 22)';
    }
  }
  
  //add event listeners
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('canRemove') || event.target.classList.contains('addGoods')) {
      var line = event.target.closest('.line');
      var goodsElement = line.querySelector('.goods');
      updateCanRemoveButton(goodsElement);
    }
  });
  
  //remove line
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('cross')) {
      var line = event.target.closest('.line');
      line.remove();
      var leftPart = document.querySelector('.first');
      leftPart.style.height = (leftPart.offsetHeight - 75) + 'px';
  
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
  
  

  //bought button
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('boughtButton')) {
      var button = event.target;
      var currentStatus = button.textContent.trim();
      var newStatus = currentStatus === "Куплено" ? "Не куплено" : "Куплено";
      var line = button.closest('.line');
      var goodsName = line.querySelector('.names');
      var fieldBorder = line.querySelector('.block');
      var placeholderValue = fieldBorder.querySelector('.names').value;
      button.textContent = newStatus;
  

      if (newStatus === "Не куплено") {
        line.querySelector('.cross').style.display = "none";
        line.querySelector('.addGoods').style.visibility = "hidden"
        line.querySelector('.canRemove').style.visibility = "hidden"
        goodsName.style.textDecoration = "line-through";
        var productItems = document.querySelectorAll('.left .product-item');
        var amounts = document.querySelectorAll('.left .product-item .amount');
  
        productItems.forEach(function(productItem, index) {
          var productItemText = productItem.textContent.trim();
          if (productItemText.includes(placeholderValue)) {
            productItem.remove();
            var boughtPart = document.querySelector('.bought');
            boughtPart.appendChild(productItem);
            productItem.style.textDecoration = "line-through"; // Apply line-through text decoration
            amounts[index].style.textDecoration = "line-through"; // Apply line-through text decoration to amount element
          }
        });
  
      } else {
        line.querySelector('.cross').style.display = "inline-block";
        line.querySelector('.addGoods').style.visibility = "visible"
        line.querySelector('.canRemove').style.visibility = "visible"
        goodsName.style.textDecoration = "none";
        var productItems = document.querySelectorAll('.bought .product-item');
        var amounts = document.querySelectorAll('.bought .product-item .amount');

        productItems.forEach(function(productItem, index) {
          var productItemText = productItem.textContent.trim();
          if (productItemText.includes(placeholderValue)) {
            productItem.remove();
            var leftPart = document.querySelector('.left');
            leftPart.appendChild(productItem);
            productItem.style.textDecoration = "none"; // Remove line-through text decoration
            amounts[index].style.textDecoration = "none"; // Remove line-through text decoration from amount element
          }
        });
  
      }
  
    }
  });
  

  //add new line
  var addButton = document.querySelector('.addButton');
  addButton.addEventListener('click', function() {
    var textField = document.querySelector('.goodsName');
    var inputValue = textField.value;
  
    if (inputValue.trim() !== "") {
      var existingPlaceholders = Array.from(document.querySelectorAll('.names')).map(function(fieldBorder) {
        return fieldBorder.getAttribute('value').toLowerCase();
      });

      if (existingPlaceholders.includes(inputValue.toLowerCase())) {
        alert("Продукт з таким іменем уже існує!");
      } else {
      var newLine = document.createElement("section");
      newLine.classList.add("line");


      newLine.innerHTML = 
      `<section class="block" >
      <input type="text" class="names" value="${inputValue}">
    </section>
    <section class="block"> 
      <span class="tooltip canRemove" style = "background-color: rgb(236, 179, 179); border-bottom: 0.2rem solid rgb(236, 179, 179)" data-tooltip="remove product">-</span>
      <span class="goods">1</span>
      <span class="tooltip addGoods" data-tooltip="add product">+</span>
    </section>
    <section class="Bblock">
      <button class="boughtButton tooltip" data-tooltip="not bought">Куплено</button>
      <span class="tooltip cross" data-tooltip="delete">⨯</span>
    </section>
  `;
  var newItem= document.createElement("span");
      newItem.classList.add("left");

      newItem.innerHTML = 
      `<span class="product-item">
            <span>${inputValue}</span>
            <span class="amount">1</span>
        </span>`
      ;

  var leftPart = document.querySelector('.first');
  var rightPart = document.querySelector('.left');
  newItem.style.position = 'relative';
  newItem.style.top = '0.5px';
  leftPart.appendChild(newLine);
  rightPart.appendChild(newItem);
  textField.value = ""; 
  leftPart.style.height = (leftPart.offsetHeight + 35) + 'px';
  addEventListeners(); 
}
}
});


addEventListeners();
