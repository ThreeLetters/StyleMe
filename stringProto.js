
module.exports = function() {
  String.prototype.styleMe = function() {
    for (var i = 0; i < this.length; i ++) {
      var a = this.indexOf("{");
      if (a == -1) break;
      this.substring(a-3,a)
      
    }
  }
  
  
  
  
}
