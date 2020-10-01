$(function(){

		var json=[
					{"name":"aaa1","list":[
											{"name":"aaaa2aaa2aaa2aaa2aaa2aaa2aaa2aaa2aa2","list":[
												{"name":"aaa1","list":66},
												{"name":"aaa","list":[
																		{"name":"aaa2","list":3},
																		{"name":"aaa3","list":4},
																	 ]},

			 						  		]},
											{"name":"aaa3","list":[
												{"name":"aaa1","list":[
																		{"name":"aaa2","list":3},
																		{"name":"aaa3","list":4},
																	 ]},
					
				

				 							]},
										 ]},
					{"name":"aaa1","list":[
											{"name":"aaaa2aaa2aaa2aaa2aaa2aaa2aaa2aaa2aa2","list":[
												{"name":"aaa1","list":66},
												{"name":"aaa","list":[
																		{"name":"aaa2","list":3},
																		{"name":"aaa3","list":4},
																	 ]},

			 						  		]},
											{"name":"aaa3","list":[
												{"name":"aaa1","list":[
																		{"name":"aaa2","list":3},
																		{"name":"aaa3","list":4},
																	 ]},
					
				

				 							]},
										 ]},

				 ]
		var str = "";
		var Tree = function(o){
		    for(var i=0;i<o.length;i++){
		        var urlstr = "";
		        try{
		          	if(typeof o[i]["list"].length == "undefined"){
		                urlstr = "<li><span>"+ o[i]["name"] +"</span><ul>";
		            }else{
		            	urlstr = "<li><span><em class='close'></em>"+ o[i]["name"] +"</span><ul>";
		            }
		            str += urlstr;
		            if(o[i]["list"] != null){
		                Tree(o[i]["list"]);
		            }
		            str += "</ul></li>";
		        }catch(e){}
		    }
		    return str;
		}
		/*添加无级树*/
		document.getElementById('tree-demo').innerHTML=Tree(json);
})