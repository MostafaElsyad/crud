let title = document.getElementById('title');
let category = document.getElementById('category');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let submit = document.getElementById('submit');
let deleteAllBTN = document.getElementById('deleteAllBTN')

let mod = 'create';
let tmp;

let products;
if(localStorage.prostorage != null) {
    products = JSON.parse(localStorage.prostorage);
}else {
    products = [];
}

function getTotal() {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;

    if(price.value != '') {
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    }else {
        total.innerHTML = '';
        total.style.backgroundColor = '#ff0000';
    }
}

submit.onclick = function submitData() {
    if(total.value != '' & category.value != '' & total.innerHTML != '') {
        let product = {
            title:title.value,
            category:category.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
        }
    
        if(mod === 'create') {
            submit.style.innerHTML = 'create';

            if(count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    products.push(product);
                }
            }else {
                products.push(product);
            }
        
        }else {
            products[tmp] = product;
            count.style.display = 'block';
            submit.innerHTML = 'create';
            mod = 'create;'
        }

        localStorage.setItem('prostorage', JSON.stringify(products));
        readData();
        clearData();
        deleteAllData();
    }
}

function readData() {
    let table = '';

    for(let i = 0; i < products.length; i++) {
        table +=
        `<tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].category}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td><button onclick="updateData(${i})" class="btn" id="btn">update</button></td>
            <td><button onclick="deleteData(${i})" class="btn" id="btn">delete</button></td>
        </tr>`;
    }

    if(products.length > 0) {
        deleteAllBTN.style.display = 'block';
    }else {
        deleteAllBTN.style.display = 'none';
    }    

    document.getElementById('table').innerHTML = table;
    deleteAllBTN.innerHTML = 'delete all  (' + products.length + ')';
}
readData();

function clearData() {
    title.value = '';
    category.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
}

function deleteData(i) {
    products.splice(i,1);
    localStorage.prostorage = JSON.stringify(products);
    readData();
}

deleteAllBTN.onclick = function deleteAllData() {
    products.splice(0);
    localStorage.clear();
    readData();
}

function updateData(i) {
    title.value = products[i].title;
    category.value = products[i].category;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    tmp = i;
    mod = 'update'
}

function search(value) {
    let table = '';

    for(let i = 0; i < products.length; i++) {
        if(products[i].title.includes(value)) {
            table +=
            `<tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].category}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td><button onclick="updateData(${i})" class="btn" id="btn">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn" id="btn">delete</button></td>
            </tr>`;    
        }else if(products[i].category.includes(value)) {
            table +=
            `<tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].category}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td><button onclick="updateData(${i})" class="btn" id="btn">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn" id="btn">delete</button></td>
            </tr>`;    
        }
    }
    document.getElementById('table').innerHTML = table;
}