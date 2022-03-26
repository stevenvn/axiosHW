function Validation() {
  this.checkEmpty = function (input, divID, mess) {
    if (input.trim() === "") {
      //thong bao loi
      getEle(divID).innerHTML = mess;
      getEle(divID).style.backgroundColor = "red";
      return false;
    } else {
      getEle(divID).innerHTML = "";
      getEle(divID).style.backgroundColor = "";
      return true;
    }
  };
  this.validateEmail = function (input, divID, mess) {
    if (input.includes("@")) {
      getEle(divID).innerHTML = "";
      getEle(divID).style.backgroundColor = "";
      return true;
    } else {
      getEle(divID).innerHTML = mess;
      getEle(divID).style.backgroundColor = "red";
      return false;
    }
  };
}
