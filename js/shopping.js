window.onload=function(){
	var table = document.getElementsByTagName("table");
	var tr =table[0].children[1].rows;
	var selectAll = document.getElementsByClassName("select-all");
	var check = document.getElementsByClassName("checkbox");
	var sel = document.getElementsByClassName("select");
	var del = document.getElementsByClassName("delete");
	var deleteAll = document.getElementById("delete-all");
	var reduce = document.getElementsByClassName("reduce");
	var add = document.getElementsByClassName("add");
	var price = document.getElementsByClassName("price");
	var peace = document.getElementsByClassName("peace");
	var countInput = document.getElementsByClassName("count-input");
	var sumCount = document.getElementById("sum-count");
	var sumPrice = document.getElementById("sum-price");
	
	//选择按钮  背景
	for(var i=0;i<check.length;i++){
		check[i].onclick=function(){
			if(this.className=="checkbox select-all"){
				for (var j=0;j<check.length;j++) {
					check[j].checked=this.checked;
				}
				for (var n=0;n<sel.length;n++) {
					sel[n].parentNode.parentNode.style.backgroundColor="#f5ebeb";
				}
			}
			if(this.checked==false){
				for(var k=0;k<selectAll.length;k++){
					selectAll[k].checked=false;
				}
				for (var n=0;n<sel.length;n++) {
					sel[n].parentNode.parentNode.style.backgroundColor="";
				}
			}
			getCount();
		}
	}
	
	//背景
	for (var i=0;i<sel.length;i++) {
		sel[i].onclick=function(){
			if(this.checked){
				this.parentNode.parentNode.style.backgroundColor="#f5ebeb";
			}else{
				this.parentNode.parentNode.style.backgroundColor="";
				for(var k=0;k<selectAll.length;k++){
					selectAll[k].checked=false;
				}
			}
		peacesum(this.parentNode.parentNode);
		getCount();
		}
		
	}
	
	//小计
	function peacesum(tr){
		var tds = tr.cells;
		var price = parseFloat(tds[2].innerHTML);
		var inp =parseInt(tr.getElementsByTagName("input")[1].value);
		var sum = parseFloat(price*inp).toFixed(2);
		tds[4].innerHTML = sum;
	}
	
	//计算
	function getCount(){
		var priceSum =0;
		var countSum =0;
		for (var i=0;i<tr.length;i++) {
			if(tr[i].getElementsByTagName('input')[0].checked){
				countSum += parseInt(tr[i].getElementsByTagName('input')[1].value);
				priceSum += parseFloat(tr[i].cells[4].innerHTML);
			}
		}
		sumCount.innerHTML = parseInt(countSum);
		sumPrice.innerHTML = parseFloat(priceSum).toFixed(2);
	}
	
	//加减商品
	for (var i=0;i<tr.length;i++) {
		tr[i].onclick=function(e){
			var src = e.srcElement;
			var cla = src.className;
			var inp = this.getElementsByTagName("input")[1];
			var val = parseInt(inp.value);
			switch(cla){
				case "reduce":
				if(val>1){
					inp.value=val-1;
				}
				peacesum(this);
				getCount();
				break;
				
				case "add" :
				inp.value=val+1;
				peacesum(this);
				getCount();
				break;
				
				//删除
				case "delete" :
				this.parentNode.removeChild(this);
				peacesum(this);
				getCount();
				default :
				break;
			}
		}
		tr[i].getElementsByTagName('input')[1].onkeyup = function(){
			if(this.value<1 || isNaN(this.value)){
				this.value = 1;
			}
			peacesum(this.parentNode.parentNode);
			getCount();
		}
		
	}
	
	//删除商品
	deleteAll.onclick=function(){
		var a = sumCount.innerHTML;
		if(a>0){
			var con=confirm("你确定删除所选项？")
			if(con){
				for (var i=0;i<tr.length;i++) {
					var check = tr[i].getElementsByTagName('input');
					if(check[0].checked){
						tr[i].parentNode.removeChild(tr[i]);
						i--;
					}
				}	
			}
		}
		
		getCount();
	}
	
}
