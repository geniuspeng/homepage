/*!
 * 使用D3js绘制技能的力导向图
 */


    var nodes = [//节点对象 
      {name: "Skill",image: "./img/skill-icon.png", content: "技能の力导向图"},
      {name: "webFront-end",image: "./img/frontend.jpg", content: "前端：熟练使用JS,CSS/CSS3,HTML/HTML5，但对框架了解较少，努力学习ing"},
      {name: "J2EE",image: "./img/J2EE.png", content: "1年J2EE开发经验，可以熟练使用Java，SSH，JSP进行java web开发"},
      {name: "DB",image: "./img/DB.png", content: "了解Oracle，PL/SQL,能够编写基本SQL脚本，对Mongodb有一定了解"},
      {name: "Python",image: "./img/python.png", content: "半年使用经历，熟悉基本语法，能够编写简单的python脚本"},
      {name: "Matlab",image: "./img/matlab.png", content: "半年使用经历，能够进行基本的绘图和数据分析操作"},
      {name: "Javascript",image: "./img/javascript-icon.jpg", content: "目前主攻技术，了解基本语法以及内部原理（对象，原型链，闭包/作用域链，继承，事件，Ajax等），但实战经验较少。"},
      {name: "CSS(3)",image: "./img/css3-icon.jpg", content: "目前主攻技术，熟悉各类选择器，能够使用div进行基本布局设计，对CSS3的新特性有所了解，还在学习中。。。"},
      {name: "HTML(5)",image: "./img/html5-icon.png", content: "目前主攻技术，掌握HTML标签以及DOM树的结构，了解web标准，能够掌握HTML5新增内容以及废弃内容，还在学习中。。。"},
      {name: "Jquery",image: "./img/jquery-icon.png", content: "熟悉JQ基本功能，可参照JQ手册进行熟练操作，但对其内部源码还需深入研究"},
      {name: "D3",image: "./img/d3-icon.png", content: "刚刚接触的技术，还不是很熟悉，可以参考API进行基本的数据绘图"},
      {name: "Nodejs",image: "./img/nodejs-icon.png", content: "也算是刚刚接触的技术，基本了解内部原理，参照网上教程通过Express和Mongodb搭建了多人博客，但还需进一步熟练"},
      {name: "Express",image: "./img/express.png", content: "Nodejs的最流行的框架之一，只是会使用，但对其原理还不是很了解= ="},
      {name: "Bootstrap",image: "./img/bootstrap-icon.png", content: "了解其基本原理，但缺少实战使用经验"},
      {name: "Java",image: "./img/java-icon.png", content: "不能算是精通，不过好歹有1年的开发经验- -，掌握基本语法以及比较常用的库"},
      {name: "SSH",image: "./img/SSH.png", content: "能够了解Structs2，Spring，Hibernate的基本原理和标签的使用，了解MVC设计模式，能够过SSH框架进行熟练操作"},
      {name: "JSP",image: "./img/servlet-icon.jpg", content: "了解Serverlet原理，能够熟练进行JSP页面的设计和编写"},
      {name: "Oracle",image: "./img/oracle-icon.png", content: "了解Oracle，PL/SQL,能够编写基本SQL脚本"},
      {name: "MongoDB",image: "./img/mongodb.png", content: "对Mongodb有一定了解"}
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
            .attr("height", height)
            .style("background-color","rgba(0, 0, 0, 0.7)")
            .style("border","10px solid rgba(0, 0, 0, 0.7)")
            .style("border-radius","50px");
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
          .on("click", click)  //设置点击效果
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
    // node.append("div")
    //   .attr("width", 150)
    //   .attr("height", 100)
    //   .html(function(d){
    //     return d.content;
    //   });
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
    function click(d) {  //设置点击显示文字
        //console.log(d.content);
        d3.select(".skill_des").style("font-size","50px")
                               .style("font-family", "about")
              .html(d.content);
    }
      
    function mouseover() {  
      d3.select(this).select("image").style("cursor","pointer") ;                                  
    }  
      
    function mouseout() {  
      d3.select(this).select("image").style("cursor","default") ;   
    }  
