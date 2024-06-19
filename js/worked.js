// Modified connection function with double click event handling
Raphael.fn.connection = function (obj1, obj2, line, bg, pvar) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
        pvar = line.pvar;
    }

    var paper = this;

    var A = getElementAbsolutePos(document.getElementById(obj1.attr('id')));
    var B = getElementAbsolutePos(document.getElementById(obj2.attr('id')));

    // Calculate center points of the objects
    var p1 = { x: A.x + parseInt(obj1.width()) / 3, y: A.y + parseInt(obj1.height()) / 2 };
    var p2 = { x: B.x + parseInt(obj2.width()) / 2, y: B.y + parseInt(obj2.height()) / 2 };

    // Path for the connection line
    var path = ["M", p1.x.toFixed(3), p1.y.toFixed(3), "L", p2.x.toFixed(3), p2.y.toFixed(3)].join(" ");

    if (line && line.line) {
        // Update existing line
        line.bg && line.bg.attr({ path: path });
        line.line.attr({ path: path });

        // Double click event for the line
        line.line.unclick().dblclick(function () {
            // Example: Open a modal for adding relationship information
            var relationship = prompt("Enter relationship information:");
            if (relationship) {
                // Store or display relationship information as needed
                console.log("Relationship information:", relationship);
                // You can store this information in a data structure or display it in UI
            }
        });

    } else {
        // Draw new line
        var color = typeof line == "string" ? line : "#000";
        var tmp2 = this.path(path).attr({ stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3 });
        var tmp1 = this.path(path).attr({ stroke: color, fill: "none", "stroke-width": 1 });

        // Store connections in ConMan array
        if (!ConMan[obj1.attr('id').toString()]) {
            ConMan[obj1.attr('id').toString()] = [];
        }
        if (!ConMan[obj2.attr('id').toString()]) {
            ConMan[obj2.attr('id').toString()] = [];
        }

        ConMan[obj1.attr('id').toString()].push(tmp1);
        ConMan[obj2.attr('id').toString()].push(tmp1);
        ConMan[obj1.attr('id').toString()].push(tmp2);
        ConMan[obj2.attr('id').toString()].push(tmp2);

        // Double click event for the line
	tmp1.dblclick(function () {
		var relationship = prompt("Enter relationship information:");
		if (relationship) {
			// Update line attributes or store relationship information as needed
			console.log("Relationship information:", relationship);

			// Example: Update the line appearance based on the entered relationship
			var color = "#FF0000"; // Example: Set a different color based on the relationship
			var strokeWidth = 2; // Example: Set a different stroke width based on the relationship

			// Update line attributes
			tmp1.attr({ stroke: color, "stroke-width": strokeWidth });

			// Store additional information if needed
			tmp1.data("relationship", relationship);
			tmp1.data("color", color);
			tmp1.data("strokeWidth", strokeWidth);

        alert("Relationship information stored: " + relationship);
    }
	// Click event for the line
tmp1.click(function () {
    var relationship = prompt("Enter relationship information:");
    if (relationship) {
        // Update line attributes or store relationship information as needed
        console.log("Relationship information:", relationship);

        // Example: Update the line appearance based on the entered relationship
        var color = "#FF0000"; // Example: Set a different color based on the relationship
        var strokeWidth = 2; // Example: Set a different stroke width based on the relationship

        // Update line attributes
        tmp1.attr({ stroke: color, "stroke-width": strokeWidth });

        // Store additional information if needed
        tmp1.data("relationship", relationship);
        tmp1.data("color", color);
        tmp1.data("strokeWidth", strokeWidth);

        // You can also update UI or data structure based on the relationship information
        // Example: Update UI with relationship information
        alert("Relationship information stored: " + relationship);
    }
});

});


        return {
            bg: tmp2,
            line: tmp1,
            from: obj1,
            to: obj2,
            pvar: pvar
        };
    }
};

// Existing code for node addition and other functionalities...

// Example for deleting a node
function DeleteN() {
    var T = $('.selected');
    if (T.attr('id') != 'root') {
        if (confirm("Are you sure, you want to Delete?")) {
            var C = $('.' + $('.selected').attr('id').toString() + 'CH');
            var i = C.length;
            while (i > 0) {
                var j = ConMan[C[i - 1].id].length;
                while (j > 0) {
                    ConMan[C[i - 1].id][j - 1].remove();
                    j--;
                }
                i--;
            }
            var i = C.length;
            while (i) {
                $(C[i - 1]).remove();
                i--;
            }

            var j = ConMan[T.attr('id')].length;
            while (j > 0) {
                ConMan[T.attr('id')][j - 1].remove();
                j--;
            }
            T.remove();
        }
    }
}

	var r;
	var connections = [];
	var relations = [];
	var TR0,TR1;
	var ConMan = [];

	function move() {
				for (var i = connections.length; i--;) {
					r.connection(connections[i]);
				}
				r.safari();
			}

	r = Raphael("holder", screen.width, screen.height);

	var index = 0;
	ConMan['root'] = new Array();

	var DIR = 0;
	function Add() {
		var valu = $('.selected').val().toString();
		var papa = $('.selected');
		$('.selected').clone(false, false)
			.attr('id', 'node' + index.toString())
			.attr('value', "ENTER INFO".toString())
			.addClass(papa.attr('id').toString() + 'CH')
			.removeClass('in')
			.appendTo('#A');
		$('.selected').removeClass('selected');
		$('#node' + index.toString()).addClass('selected');
		var bacha = $('.selected');
		if (papa.attr('id') == 'root')
			bacha.addClass('node');
		else {
			bacha.removeClass('node');
			bacha.addClass('node_c');
		}
		var top_parent = parseInt(papa.css("top"));
		var height_parent = parseInt(papa.css("height"));
		var left_parent = parseInt(papa.css("left"));
		var width_parent = parseInt(papa.css("width"));

		$('.node,.node_c').css({ "height": 40 + "px" });


		var tt = $('.' + papa.attr('id').toString() + 'CH');
		var H = bacha.css('height');
		var A = bacha.val().toString();
		var W = ((A.length + 7) * 8);
		bacha.css({ 'width': W.toString() + "px", 'top': "30px" });

		if (DIR % 4 == 0)
			bacha.css({ 'top': top_parent + height_parent + 40 + 'px' });
		else if (DIR % 4 == 1)
			bacha.css({ 'left': left_parent - width_parent - 40 + 'px' });
		else if (DIR % 4 == 2)
			bacha.css({ 'top': top_parent - height_parent - 40 + 'px' });
		else if (DIR % 4 == 3)
			bacha.css({ 'left': left_parent + width_parent + 40 + 'px' });
		DIR++;
		index++;
		ConMan[bacha.attr('id')] = new Array();
		
		// Connect the new node with its parent
		var parent = papa.attr('id') == 'root' ? papa : $('#' + papa.attr('id') + '_node'); // Assuming parent nodes have IDs like 'root' or 'parent_node'
		connections.push(r.connection(parent, bacha, "#7D7E80", '#7D7E80|5', 'C'));

		move(); // Adjust all connections
	}

	$('.in').livequery(function(){
		$(this).draggable({  cancel:null});
	});

	$('.in,.node,.node_c').livequery('keydown',function(e){
		var A = $(this).val().toString();
		A = A.split('\n');
		var i = A.length;
		while(i>0)
		{
			A[i-1] = A[i-1].length;
			i--;
		}
		A.sort();
		var tty = Math.max.apply(Math, A);
		var W = (tty+7)*9;
		var H = (A.length*30).toString() + "px";
		W = W.toString()+"px";
		$(this).css({'width':W});
		$(this).css({'height':H});
	});

	$('.node,.node_c').livequery(function(){
		$(this).draggable({  cancel:null});
	});

	$('.in,.node,.node_c').livequery('dblclick',function(){
		$(this).removeAttr('readonly').focus().select();$(this).css({"cursor":"text"});
		});
		
	$('.in,.node,.node_c').livequery('click',function(){
			$('.selected').removeClass('selected');
		$(this).addClass('selected');
		if(!check)
			E = $(this);
		unselect = false;});

	$('.node,.in,.node_c').livequery('drag',function(){
			move();});

	$('.in,.node,.node_c').livequery('mousedown',function(){
		if(relate && $('.selected').attr('id')!=$(this).attr('id'))
		{
			connections.push(r.connection($('.selected'),$(this),'#F5D938','#F5D938|3','Q'));
			relate = false;
			relations.pop();
			TR0.remove();
			TR1.remove();
			TR0 = null;
			TR1 = null;
		}
			$('.selected').removeClass('selected');
		$(this).addClass('selected');
		unselect = false;});

		$('.in, .node, .node_c').livequery('dblclick', function () {
			$(this).removeAttr('readonly').focus().select();
			$(this).css({ "cursor": "text" });
		});
		
	$('body').mousemove(function(event){
			if(relate){
				moveR(event);
				}
			});	 
	var relate=false;		
	var R0;
	function moveR(e) {
		mouseOVer = e;
		if(temp){
			temp = false;
			relations.push(r.relation($('.selected'),'#F5D938','#F5D938|2'));}
		else{
				r.relation(relations[relations.length - 1],'A','A');
				r.safari();
			}
	}
	var temp = false;
	var mouseOVer;

	function StartR()
	{
				relate = !relate;
				if(!relate)
				{
					TR0.remove();
					TR1.remove();
					TR0 = null;
					TR1 = null;
				}
				temp = true;

	}

	function DeleteN()
	{		
		var T = $('.selected');
		if(T.attr('id') != 'root'){
	if(confirm("Are you sure, you want to Delete?")){
			var C = $('.'+$('.selected').attr('id').toString() + 'CH');
			var i = C.length;
			while(i>0)
			{
				var j = ConMan[C[i-1].id].length;			
				while(j>0)
				{
					ConMan[C[i-1].id][j-1].remove();
					j--;
				}
				i--;
			}
			var i = C.length;
			while(i){		
				$(C[i-1]).remove();
				i--;
			}
			
			var j = ConMan[T.attr('id')].length;
			while(j>0)
			{
				ConMan[T.attr('id')][j-1].remove();
				j--;
			}
				T.remove();
		}}
	}
