/*!
 * 使用D3js绘制技能的力导向图
 */


    var nodes = [//节点对象 
      {name: "Skill",image: "./img/skill-icon.png"},
      {name: "webFront-end",image: "./img/frontend.jpg"},
      {name: "J2EE",image: "./img/J2EE.png"},
      {name: "DB",image: "./img/DB.png"},
      {name: "Python",image: "./img/python.png"},
      {name: "Matlab",image: "./img/matlab.png"},
      {name: "Javascript",image: "./img/javascript-icon.jpg"},
      {name: "CSS(3)",image: "./img/css3-icon.jpg"},
      {name: "HTML(5)",image: "./img/html5-icon.png"},
      {name: "Jquery",image: "./img/jquery-icon.png"},
      {name: "D3",image: "./img/d3-icon.png"},
      {name: "Nodejs",image: "./img/nodejs-icon.png"},
      {name: "Express",image: "./img/express.png"},
      {name: "Bootstrap",image: "./img/bootstrap-icon.png"},
      {name: "Java",image: "./img/java-icon.png"},
      {name: "SSH",image: "./img/SSH.png"},
      {name: "JSP",image: "./img/servlet-icon.jpg"},
      {name: "Oracle",image: "./img/oracle-icon.png"},
      {name: "MongoDB",image: "./img/mongodb.png"}
    ];
    var links = [ //定义边对象，weight代表此技能掌握程度：1-9从了解到精通的9个级别（1-3了解，4-6熟悉，7-9精通），同种颜色的边代表同一层级
      {source: 0, target: 1, weight: 8, color:1},
      {source: 0, target: 2, weight: 5, color:1},
      {source: 0, target: 3, weight: 4, color:1},
      {source: 0, target: 4, weight: 2, color:1},
      {source: 0, target: 5, weight: 3, color:1},
      {source: 1, target: 6, weight: 8, color:4},
      {source: 1, target: 8, weight: 6, color:4},
      {source: 1, target: 7, weight: 5, color:4},
      {source: 7, target: 13, weight: 4, color:17},
      {source: 6, target: 9, weight: 6, color:7},
      {source: 6, target: 11, weight: 4, color:7},
      {source: 6, target: 10, weight: 2, color:7},
      {source: 11, target: 12, weight: 5, color:10},
      {source: 2, target: 14, weight: 7, color:14},
      {source: 2, target: 15, weight: 4, color:14},
      {source: 2, target: 16, weight: 7, color:14},
      {source: 3, target: 17, weight: 6, color:17},
      {source: 3, target: 18, weight: 4, color:17}
    ];

    var width = 1000,  
        height = 800;  
      var img_w = 50;
    var img_h = 50;
      //转换为适合生成力导向图的数组
      var force = d3.layout.force()
            .nodes(nodes)  //加载节点
            .links(links)  //加载边
            .size([width, height])   //设定大小
            .linkDistance(150)  //设置有效空间的大小
            .charge(-1000)  //负电荷量，代表力的相互作用
            .on("tick", tick)  //打点更新事件
            .start(); //生效

    //生成svg，设置宽高
    var svg = d3.select("#Skill").append("svg")
          .attr("width", width)  
            .attr("height", height); 
    //为链接添加线
    var link = svg.selectAll(".links")    
          .data(force.links())  
          .enter()
          .append("line")
          .attr("class","link");
    var colors=d3.scale.category20();  //创建序数比例尺和包括20z种颜色的输出范围
     
    link.style("stroke",function(d){//  设置线的颜色    
        return colors(d.color);    
    })    
    .style("stroke-width",function(d,i){//设置线的宽度    
        return d.weight;    
    });  

    //添加节点
    var node = svg.selectAll(".node")
          .data(force.nodes())
          .enter()
          .append("g")
          .attr("class", "node")
          .on("mouseover", mouseover)  //设置鼠标悬停效果
          .on("mouseout", mouseout)  //设置鼠标移出效果
          .call(force.drag);  //设置可以拖动

    //   node.append("circle")
    //    .attr("r",20)
      // .style("fill",function(d){ //设置圆点的颜色            
      //     return colors(d.weight*d.weight*d.weight);  
      // }) ;  
    node.append("image")
      .attr("width", img_w)
      .attr("height", img_h)
      .attr("xlink:href", function(d){
        return d.image;
      });
    node.append("text")  
        .attr("x", 12)  
        .attr("dy", ".35em")  
        .text(function(d) { return d.name; });  
      
    function tick() {//打点更新坐标  
      link  
          .attr("x1", function(d) { return d.source.x; })  
          .attr("y1", function(d) { return d.source.y; })  
          .attr("x2", function(d) { return d.target.x; })  
          .attr("y2", function(d) { return d.target.y; });  
      
      node  
          .attr("transform", function(d) {   
                return "translate(" + d.x + "," + d.y + ")";   
          });  
    }  
      
    function mouseover() {  
      d3.select(this).select("circle").transition()  
          .duration(750)  
          .attr("r", function(d){  //设置圆点半径                        
        return radius (d)+10;                            
     }) ;  
    }  
      
    function mouseout() {  
      d3.select(this).select("circle").transition()  
          .duration(750)  
          .attr("r", function(d){  //恢复圆点半径                        
        return radius (d);                            
     }) ;  
    }  
