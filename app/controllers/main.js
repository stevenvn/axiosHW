var customerService = new CustomerService();
var validation = new Validation();
console.log(`onClick="updateCustomer('fullName 3'),"`);
function getEle(id) {
  return document.getElementById(id);
}
function checkEmpty(customerName) {
  if (customerName === "") {
    return true;
  }
  return false;
}
function resetForm() {
  getEle("fullName").value = "";
  getEle("phoneNumber").value = "";
  getEle("email").value = "";
  getEle("avatar").value = "";
  getEle("fullNameError").innerHTML = "";
  getEle("fullNameError").style.backgroundColor = "";
  getEle("emailError").innerHTML = "";
  getEle("emailError").style.backgroundColor = "";
}

function getDataForm() {
  var _fullName = getEle("fullName").value;
  var _phoneNumber = getEle("phoneNumber").value;
  var _email = getEle("email").value;
  var _avatar = getEle("avatar").value;

  if (
    validation.checkEmpty(
      _fullName,
      "fullNameError",
      "full Name cant be empty"
    ) &&
    validation.validateEmail(_email, "emailError", "email must include @")
  ) {
    return [_fullName, _phoneNumber, _email, _avatar];
  } else {
    return null;
  }
}
function getData() {
  customerService
    .getProductListAPI()
    .then(function (response) {
      renderCustomers(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function renderCustomers(list) {
  var content = "";
  list.forEach(function (customer, index) {
    content += `<tr>
    <td>${index + 1}</td>
    <td>${customer.fullName}</td>
    <td>${customer.phoneNumber}</td>
    <td>${customer.email}</td>
    <td><img src="${customer.avatar}" style="width:150px"/></td>
    <td><button class="btn btn-info" data-toggle="modal"
    data-target="#myModal" onclick="updateCustomer(${
      customer.id
    })">Update</button>
    <button class="btn btn-danger" id=${customer.id}" onclick="deleteCustomer(${
      customer.id
    })">delete</button></td>
    </tr>
    `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}
getData();
getEle("btnThemSP").addEventListener("click", function () {
  resetForm();
  var footer = `<button class="btn btn-success" id="add" onclick=addCustomer()>Add New Customer</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});
getEle("search").addEventListener("click", function () {
  var key = getEle("inputSearch").value;
  var listCustomer = [];
  customerService
    .getProductListAPI()
    .then(function (response) {
      listCustomer = response.data;
      var value = listCustomer.find((customer) => customer.fullName === key);
      customerService
        .getIndividualCustomerAPI(value.id)
        .then(function (rs) {
          console.log(rs);
          renderCustomer(rs.data);
        })
        .catch(function (e) {
          console.log(e);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});
function renderCustomer(customer) {
  var content = "";

  content = `<tr>
    <td>1</td>
    <td>${customer.fullName}</td>
    <td>${customer.phoneNumber}</td>
    <td>${customer.email}</td>
    <td><img src="${customer.avatar}" style="width:150px"/></td>
    <td><button class="btn btn-info" data-toggle="modal"
    data-target="#myModal" onclick="updateCustomer(${customer.id})">Update</button>
    <button class="btn btn-danger" id=${customer.id}" onclick="deleteCustomer(${customer.id})">delete</button></td>
    </tr>
    `;
  getEle("tblDanhSachSP").innerHTML = content;
}
function addCustomer() {
  var validatedValue = getDataForm();
  console.log("validate", validatedValue);

  if (validatedValue) {
    var newCustomer = new Customer(
      "",
      validatedValue[0],
      validatedValue[1],
      validatedValue[2],
      validatedValue[3]
    );
    alert("adding customer successful");
    customerService
      .addProductAPI(newCustomer)
      .then(function (response) {
        console.log("response", response);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // var _fullName = getEle("fullName").value;
  // if (!checkEmpty(_fullName)) {
  //   var _phoneNumber = getEle("phoneNumber").value;
  //   var _email = getEle("email").value;
  //   var _avatar = getEle("avatar").value;
  //   var newCustomer = new Customer(
  //     "",
  //     _fullName,
  //     _phoneNumber,
  //     _email,
  //     _avatar
  //   );
  //   alert("adding customer successful");
  //   customerService
  //     .addProductAPI(newCustomer)
  //     .then(function (response) {
  //       console.log("response", response);
  //       getData();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // } else {
  //   alert("full name cant be empty");
  // }
}
// getEle("add").addEventListener("click", function () {
//   console.log("add");
//   addCustomer();
// });
function updateCustomer(id) {
  // find the specific customer in data through by id
  // var updatedCustomer = customerService.find((customer) => customer.id === id);

  var footer = `<button class="btn btn-success" id="updateButton" onclick=updateCustomerInfo(${id})>Cap Nhat</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  customerService
    .getIndividualCustomerAPI(id)
    .then(function (res) {
      getEle("fullName").value = res.data.fullName;
      getEle("phoneNumber").value = res.data.phoneNumber;
      getEle("email").value = res.data.email;
      getEle("avatar").value = res.data.avatar;
    })
    .catch(function (e) {
      console.log(e);
    });
}
// getEle("updateButton").addEventListener("click", function () {
//   var _fullName = getEle("fullName").value;
//   var _phoneNumber = getEle("phoneNumber").value;
//   var _email = getEle("email").value;
//   var _avatar = getEle("avatar").value;

//   var newCustomer = new Customer("", _fullName, _phoneNumber, _email, _avatar);
//   customerService
//     .updateCustomerAPI(newCustomer)
//     .then(function () {
//       alert("cap nhat thanh cong");
//       getData();
//     })
//     .catch(function () {
//       console.log(error);
//     });
// });
function updateCustomerInfo(id) {
  var _fullName = getEle("fullName").value;
  var _phoneNumber = getEle("phoneNumber").value;
  var _email = getEle("email").value;
  var _avatar = getEle("avatar").value;

  var newCustomer = new Customer(id, _fullName, _phoneNumber, _email, _avatar);
  console.log("new", newCustomer);
  customerService
    .updateCustomerAPI(newCustomer)
    .then(function () {
      alert("cap nhat thanh cong");
      getData();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function deleteCustomer(id) {
  customerService
    .deleteCustomerAPI(id)
    .then(function (response) {
      getData();
    })
    .catch(function (error) {
      console.log("error", error);
    });
}
function searchSpecificCustomer() {}
