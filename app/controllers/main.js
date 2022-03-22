var customerService = new CustomerService();
function getEle(id) {
  return document.getElementById(id);
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
    <td><button class="btn btn-info">Update</button>
    <button class="btn btn-danger" id=${customer.id}" onclick="deleteCustomer(${
      customer.id
    })">delete</button></td>
    </tr>
    `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}
getData();

function addCustomer() {
  var _fullName = getEle("fullName").value;
  var _phoneNumber = getEle("phoneNumber").value;
  var _email = getEle("email").value;
  var _avatar = getEle("avatar").value;

  var newCustomer = new Customer("", _fullName, _phoneNumber, _email, _avatar);
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
getEle("add").addEventListener("click", function () {
  addCustomer();
});

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
