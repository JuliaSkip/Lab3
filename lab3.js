// Function to add event listeners to red-minus and green-plus buttons
function addEventListeners() {
  var redMinusButtons = document.querySelectorAll('.canRemove');
  var greenPlusButtons = document.querySelectorAll('.addGoods');
  var nameField = document.querySelectorAll('.names');
 
  nameField.forEach(function(fieldBorder) {
    fieldBorder.removeEventListener('input', handleNameFieldClick);
    fieldBorder.addEventListener('input', handleNameFieldClick);
  });

  redMinusButtons.forEach(function(button) {
    button.removeEventListener('click', handleRedMinusClick);
    button.addEventListener('click', handleRedMinusClick);
  });

  greenPlusButtons.forEach(function(button) {
    button.removeEventListener('click', handleGreenPlusClick);
    button.addEventListener('click', handleGreenPlusClick);
  });
}

// Function to handle red-minus button click
function handleRedMinusClick() {
  var amountElement = this.nextElementSibling;
  var currentAmount = parseInt(amountElement.innerText);
  if (currentAmount > 1) {
    currentAmount = currentAmount - 1;
    amountElement.innerText = currentAmount;

    var line = this.closest('.line');
    var fieldBorder = line.querySelector('.names');
    var placeholderValue = fieldBorder.getAttribute('value');
    var productItems = document.querySelectorAll('.left .product-item');
    var amounts = document.querySelectorAll('.left .product-item .amount');

    productItems.forEach(function(productItem, index) {
      var productItemText = productItem.textContent.trim();
      if (productItemText.includes(placeholderValue)) {
        amounts[index].innerText = currentAmount;
      }
    });

    updateRedMinusButton(amountElement);
    updateCanRemoveButton(goodsElement);
  }
}

// Function to handle green-plus button click
function handleGreenPlusClick() {
  var amountElement = this.previousElementSibling;
  var currentAmount = parseInt(amountElement.innerText);
  currentAmount = currentAmount + 1;
  amountElement.innerText = currentAmount;

  var line = this.closest('.line');
  var fieldBorder = line.querySelector('.names');
  var placeholderValue = fieldBorder.getAttribute('value');
  var productItems = document.querySelectorAll('.left .product-item');
  var amounts = document.querySelectorAll('.left .product-item .amount');

  productItems.forEach(function(productItem, index) {
    var productItemText = productItem.textContent.trim();
    if (productItemText.includes(placeholderValue)) {
      amounts[index].innerText = currentAmount;
    }
  });

  updateRedMinusButton(amountElement);
  updateCanRemoveButton(goodsElement);
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


  var addButton = document.querySelector('.addButton');
  var textField = document.querySelector('.goodsName');
  
  addButton.addEventListener('click', addProduct);
  textField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addProduct();
    }
  });
  
  function addProduct() {
    var inputValue = textField.value;
  
    if (inputValue.trim() !== "") {
      var existingPlaceholders = Array.from(document.querySelectorAll('.names')).map(function(fieldBorder) {
        return fieldBorder.getAttribute('value').toLowerCase();
      });
  
      if (existingPlaceholders.includes(inputValue.toLowerCase())) {
        alert("Продукт з таким іменем уже існує!");
        textField.value = "";
      } else {
        var newLine = document.createElement("section");
        newLine.classList.add("line");
  
        newLine.innerHTML = 
      `<section class="block" >
        <input type="text" class="names" value="${inputValue}">
      </section>
      <section class="block"> 
        <span class="tooltip canRemove" style="background-color: rgb(236, 179, 179); 
        border-bottom: 0.2rem solid rgb(236, 179, 179)" data-tooltip="Remove">-</span>
        <span class="goods">1</span>
        <span class="tooltip addGoods" data-tooltip="Add">+</span>
      </section>
      <section class="Bblock">
        <button class="boughtButton tooltip" data-tooltip="Buy">Куплено</button>
        <span class="tooltip cross" data-tooltip="Delete">⨯</span>
      </section>
    `;
  
        var newItem = document.createElement("span");
        newItem.classList.add("left");
  
        newItem.innerHTML = 
        `<span class="product-item">
          <span class=nameLeft>${inputValue}</span>
          <span class="amount">1</span>
        </span>`;
  
        var leftPart = document.querySelector('.first');
        var rightPart = document.querySelector('.left');
        newItem.style.position = 'relative';
        newItem.style.top = '0.5px';
        leftPart.appendChild(newLine);
        rightPart.appendChild(newItem);
        textField.value = "";
        leftPart.style.height = (leftPart.offsetHeight + 35) + 'px';
        addEventListeners();
        textField.focus();
      }
    }
}


function handleNameFieldClick() {
  var line = this.closest('.line');
  var fieldBorder = line.querySelector('.names');
  var value = fieldBorder.value;
  var placeholderValue = fieldBorder.getAttribute('value');
  var productItems = document.querySelectorAll('.left .product-item');
  var nameLeft = document.querySelectorAll('.left .product-item .nameLeft');

  productItems.forEach(function(productItem, index) {
    var productItemText = productItem.textContent.trim();
    if (productItemText.includes(placeholderValue)) {
      nameLeft[index].innerText = value;
      nameField[index].value = value;
    }
  });
}


addEventListeners();
