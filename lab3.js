function updateLocalStorage() {
  var firstElement = document.querySelector('.goodsSection');
  var firstData = {
    innerHTML: firstElement.innerHTML,
  };
  localStorage.setItem('goodsSection', JSON.stringify(firstData));

  var secondElement = document.querySelector('.second');
  var secondData = {
    innerHTML: secondElement.innerHTML,
  };
  localStorage.setItem('second', JSON.stringify(secondData));
}

function loadBoughtPizzasFromLocalStorage() {
  var buyList = JSON.parse(localStorage.getItem('goodsSection'));
  var firstPart = document.querySelector('.goodsSection');
  firstPart.innerHTML="";
  var newElement = document.createElement('section');
  newElement.innerHTML = buyList.innerHTML;
  firstPart.appendChild(newElement);

  var secondList = JSON.parse(localStorage.getItem('second'));
  var secondPart = document.querySelector('.second');
  secondPart.innerHTML="";
  var secondElement = document.createElement('section');
  secondElement.innerHTML = secondList.innerHTML;
  secondPart.appendChild(secondElement);

}

//adding event listeners
function addEventListeners() {
  var removeButton = document.querySelectorAll('.canRemove');
  var addButton = document.querySelectorAll('.addGoods');
  var nameField = document.querySelectorAll('.names');
 
  nameField.forEach(function(nameField) {
    nameField.addEventListener('keydown', rename);
  });

  removeButton.forEach(function(button) {
    button.removeEventListener('click', removeGoods);
    button.addEventListener('click', removeGoods);
  });

  addButton.forEach(function(button) {
    button.removeEventListener('click', addGoods);
    button.addEventListener('click', addGoods);
  });
}

  //add event listeners
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('canRemove') || event.target.classList.contains('addGoods')) {
      var line = event.target.closest('.line');
      var goodsElement = line.querySelector('.goods');
      check(goodsElement);
    }
  });
  


 //changes minus button
 function check(goodsElement) {
  var currentAmount = parseInt(goodsElement.innerText);
  var canRemoveButton = goodsElement.previousElementSibling;

  if (currentAmount <= 1) {
    canRemoveButton.style.backgroundColor = 'rgb(236, 179, 179)';
    canRemoveButton.style.borderBottom = '0.2rem solid rgb(236, 179, 179)';
    canRemoveButton.dataset.tooltip = 'Can`t remove';
    updateLocalStorage()
  } else {
    canRemoveButton.style.backgroundColor = 'red';
    canRemoveButton.style.borderBottom = '0.2rem solid rgb(197, 22, 22)';
    canRemoveButton.dataset.tooltip = 'Remove';
    updateLocalStorage()
  }
}

// reduces number
function removeGoods() {
  var amountElement = this.nextElementSibling;
  var currentAmount = parseInt(amountElement.innerText);
  if (currentAmount > 1) {
    currentAmount = currentAmount - 1;
    amountElement.innerText = currentAmount;

    var line = this.closest('.line');
    var nameField = line.querySelector('.names');
    var value = nameField.getAttribute('value');
    var resultValue = value.replace(/\s/g, "");
    var productItems = document.querySelectorAll('.left .product-item');
    var amounts = document.querySelectorAll('.left .product-item .amount');

    productItems.forEach(function(productItem, index) {
      var productItemText = productItem.textContent.trim();
      var resultproductItemText = productItemText.replace(/\s/g, "");
      if (resultproductItemText.includes(resultValue)) {
        amounts[index].innerText = currentAmount;
      }
    });

    updateLocalStorage()
    check(goodsElement);
  }
}

// increases the number
function addGoods() {
  var amountElement = this.previousElementSibling;
  var currentAmount = parseInt(amountElement.innerText);
  currentAmount = currentAmount + 1;
  amountElement.innerText = currentAmount;

  var line = this.closest('.line');
  var nameField = line.querySelector('.names');
  var value = nameField.getAttribute('value');
  var productItems = document.querySelectorAll('.left .product-item');
  var amounts = document.querySelectorAll('.left .product-item .amount');

  productItems.forEach(function(productItem, index) {
    var productItemText = productItem.textContent.trim();
    var resultproductItemText = productItemText.replace(/\s/g, "");
    var resultValue = value.replace(/\s/g, "");
    if (resultproductItemText.includes(resultValue)) {
      amounts[index].innerText = currentAmount;
    }
  });

  updateLocalStorage()
  check(goodsElement);
}
  
  //remove line
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('cross')) {
      var line = event.target.closest('.line');
      line.remove();
  
      var nameField = line.querySelector('.block');
      var value = nameField.querySelector('.names').value;
      var productItems = document.querySelectorAll('.left .product-item');
  
      productItems.forEach(function(productItem) {
        var productItemText = productItem.textContent.trim();
        var resultproductItemText = productItemText.replace(/\s/g, "");
        var resultValue = value.replace(/\s/g, "");
        if (resultproductItemText.includes(resultValue)) {
          productItem.remove();
        }
      }); 
    }
    updateLocalStorage()
  });
  
  

  //bought button
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('boughtButton')) {
      var button = event.target;
      var currentStatus = button.textContent.trim();
      var newStatus = currentStatus === "Куплено" ? "Не куплено" : "Куплено";
      var line = button.closest('.line');
      var goodsName = line.querySelector('.names');
      var nameField = line.querySelector('.block');
      var value = nameField.querySelector('.names').value;
      button.textContent = newStatus;
  

      if (newStatus === "Не куплено") {
        line.querySelector('.cross').style.display = "none";
        line.querySelector('.addGoods').style.visibility = "hidden"
        line.querySelector('.canRemove').style.visibility = "hidden"
        line.querySelector('.boughtButton').dataset.tooltip = 'Cancel';
        goodsName.style.textDecoration = "line-through";
        goodsName.readOnly = true;
        var productItems = document.querySelectorAll('.left .product-item');
        var amounts = document.querySelectorAll('.left .product-item .amount');
  
        productItems.forEach(function(productItem, index) {
          var productItemText = productItem.textContent.trim();
          var resultproductItemText = productItemText.replace(/\s/g, "");
          var resultValue = value.replace(/\s/g, "");
          if (resultproductItemText.includes(resultValue)) {
            productItem.remove();
            var boughtPart = document.querySelector('.bought');
            boughtPart.appendChild(productItem);
            productItem.style.textDecoration = "line-through"; 
            amounts[index].style.textDecoration = "line-through"; 
          }
        });
        updateLocalStorage()
      } else {
        line.querySelector('.cross').style.display = "inline-block";
        line.querySelector('.addGoods').style.visibility = "visible"
        line.querySelector('.canRemove').style.visibility = "visible"
        line.querySelector('.boughtButton').dataset.tooltip = 'Buy';
        goodsName.style.textDecoration = "none";
        goodsName.readOnly = false;
        var productItems = document.querySelectorAll('.bought .product-item');
        var amounts = document.querySelectorAll('.bought .product-item .amount');

        productItems.forEach(function(productItem, index) {
          var productItemText = productItem.textContent.trim();
          var resultproductItemText = productItemText.replace(/\s/g, "");
          var resultValue = value.replace(/\s/g, "");
          if (resultproductItemText.includes(resultValue)) {
            productItem.remove();
            var leftPart = document.querySelector('.left');
            leftPart.appendChild(productItem);
            productItem.style.textDecoration = "none"; 
            amounts[index].style.textDecoration = "none"; 
          }
        });
        updateLocalStorage()
      }
    }
    updateLocalStorage()
  });

// adding new product
var addButton = document.querySelector('.addButton');
var textField = document.querySelector('.goodsName');
  
  addButton.addEventListener('click', addNewGoods);
  textField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addNewGoods();
    }
  });
  
  function addNewGoods() {
    var inputValue = textField.value;
  
    if (inputValue.trim() !== "") {
      var existingValues = Array.from(document.querySelectorAll('.names')).map(function(nameField) {
        return nameField.getAttribute('value').toLowerCase();
      });
  
      if (existingValues.includes(inputValue.toLowerCase())) {
        alert("Продукт з таким іменем уже існує!");
        textField.value = "";
      } else {
        var newLine = document.createElement("section");
        newLine.classList.add("line");
  
        newLine.innerHTML = 
      `<section class="block" >
        <input type="text" class="names" value="${inputValue}" data-value="${inputValue}">
      </section>
      <section class="block"> 
        <span class="tooltip canRemove" style="background-color: rgb(236, 179, 179); 
        border-bottom: 0.2rem solid rgb(236, 179, 179)" data-tooltip="Can\`t remove">-</span>
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
          <span class=nameLeft data-value="${inputValue}">${inputValue}</span>
          <span class="amount">1</span>
        </span>`;
  
        var firstPart = document.querySelector('.goodsSection');
        var secondPart = document.querySelector('.left');
        newItem.style.position = 'relative';
        newItem.style.top = '0.5px';
        firstPart.appendChild(newLine);
        secondPart.appendChild(newItem);
        textField.value = "";
        addEventListeners();
        textField.focus();
        updateLocalStorage()
      }
    }
}

// changes names
function rename(event) {
  if (event.keyCode === 13) { 
    var line = this.closest('.line');
    var nameField = line.querySelector('.names');
    var value = nameField.value;
    var dataFirst = nameField.getAttribute('data-value');
    var nameLeft = document.querySelectorAll('.left .product-item .nameLeft');

    if (value.length === 0) {
      nameField.value = 'Назва';
      value = 'Назва';
    }

    nameLeft.forEach(function (name) {
      var dataSecond = name.getAttribute('data-value');
      if (dataFirst === dataSecond) {
        name.innerText = value;
      }
    });

    nameField.setAttribute('value', value);
    updateLocalStorage();
  }
}


loadBoughtPizzasFromLocalStorage()
addEventListeners();
