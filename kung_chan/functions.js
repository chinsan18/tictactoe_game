var board = { 
	current_player: 1,
	cells: [],
	init: function(){
		board.current_player = 1;
		board.cells = [];
		for (var row = 0; row < 3; row++) {
			this.cells.push([]);
			for (var col = 0; col < 3; col++) {
				
				var $div = document.createElement('div');
				$div.classList.add('cell');
				$div.addEventListener('click', board.click_handler)
				this.cells[row].push($div);
				document.querySelector('.container').appendChild($div);
			}
		}
	},
	click_handler: function(){
		board.move(this, board.current_player)
		board.evaluate(board.current_player);
		board.switch_player();
	},
	freeze: function(){
		for (var row = 0; row < 3; row++) {
			for (var col = 0; col < 3; col++) {
				board.cells[row][col].removeEventListener('click', board.click_handler)
			}
		}
		alert('Player ' + board.current_player + ' wins!')
	},
	reset: function(){
		document.querySelector('.container').innerHTML = '';
		board.init();
	},
	move: function($div, current_player){
		$div.removeEventListener('click', board.click_handler)
		if (current_player === 1) {
			$div.classList.add('player1');
		} else {
			$div.classList.add('player2');
		}
	},
	switch_player: function(){
		if (board.current_player === 1) {
			board.current_player = 2;
		} else {
			board.current_player = 1;
		}
	},
	evaluate: function(current_player){
		var current_player_class = 'player' + current_player;
		
		// check cols
		for (var row = 0; row < 3; row++) {	
			var win = true;
			for (var col = 0; col < 3; col++) {
				win = win && board.cells[row][col].classList[1] == current_player_class
			}	
			if (win) board.freeze();
		}

		// check cols
		for (var col = 0; col < 3; col++) {	
			var win = true;
			for (var row = 0; row < 3; row++) {
				win = win && board.cells[row][col].classList[1] == current_player_class
			}	
			if (win) board.freeze();
		}

		// check NW - SE diagonal
		var win = true;
		for (var row = 0, col = 0; row < 3; row++, col++) {
			win = win && board.cells[row][col].classList[1] == current_player_class
		}
		if (win) board.freeze();

		// check NE - SW diagonal
		var win = true;
		for (var row = 0, col = 2; row < 3; row++, col--) {
			win = win && board.cells[row][col].classList[1] == current_player_class
		}
		if (win) board.freeze();

	}
};

