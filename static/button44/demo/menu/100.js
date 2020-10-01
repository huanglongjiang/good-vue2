$(function(){

		var json=[
					{"name":"aaa1","list":[
											{"name":"aaa2","list":[
												{"name":"aaa3","list":66},
												{"name":"aaa","list":[
													{"name":"aaa2","list":3},
													{"name":"aaa3","list":4},
										 		]},

										 	]},
					
										 ]},
					{"name":"aaa1","list":[
											{"name":"aaa2","list":[
												{"name":"aaa3","list":66},
												{"name":"aaa","list":[
													{"name":"aaa2","list":3},
													{"name":"aaa3","list":4},
										 		]},

										 	]},
					
										 ]},
					{"name":"aaa1","list":"aaa2"},
					{"name":"aaa1","list":"aaa2"},
					{"name":"aaa1","list":"aaa2"},


				 ]
		var str = "";
		var Tree = function(o){
		    for(var i=0;i<o.length;i++){
		        var urlstr = "";
		        try{
		          	if(typeof o[i]["list"].length == "undefined"){
		                urlstr+="<li><a href='#'>"+ o[i]["name"] +"</a></li><ul>	";



		            }else{
		            	urlstr+="<li>";
		            	urlstr+="<a href='#'>"+ o[i]["name"] +"</a><span class='dropBottom'></span>";
						//urlstr+="<input type='checkbox' id='"+ o[i]["name"] +"'/>";
						// urlstr+="<span>";
						// urlstr+="<label for='"+ o[i]["name"] +"'>"+ o[i]["name"];
						// urlstr+="</label>";
						// urlstr+="</span>";
						urlstr+="<ul>";



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
		document.getElementById('tree').innerHTML=Tree(json);
})