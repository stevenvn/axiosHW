function CustomerService() {
  var baseURL = "https://623549a3163bf7c47459bb52.mockapi.io/CustomerDataBase";
  this.getProductListAPI = function () {
    return axios({
      url: baseURL,
      method: "GET",
    });
  };
  this.getIndividualCustomerAPI = function (id) {
    return axios({
      url: baseURL + "/" + id,
      method: "GET",
    });
  };
  this.addProductAPI = function (customer) {
    return axios({
      url: baseURL,
      method: "POST",
      data: customer,
    });
  };
  this.updateCustomerAPI = function (customer) {
    return axios({
      url: baseURL + `/${customer.id}`,
      method: "PUT",
      data: customer,
    });
  };
  this.deleteCustomerAPI = function (id) {
    return axios({ url: baseURL + "/" + id, method: "DELETE" });
  };
}
