var Kitchen = new function() {
	this.pos = [0,0];  // A1
	this.dir = 4;  // south
	this.getCol = function(ch) {
		var row = -1;
		if (ch >= 'A' || ch <= 'Z') {
			row = ch.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
		}
		return row;
	};
	this.getCol_ = function(i) {
		var row = '';
		if (i >= 0 || i <= 'Z'.charCodeAt(0) - 'A'.charCodeAt(0)) {
			ch = String.fromCharCode(i + 'A'.charCodeAt(0));
		}
		return ch;
	}
	this.getRow = function(str) {
		var row = parseInt(str);
		return row;
	};
	this.getPos = function(str) {
		var col = this.getCol(str[0]);
		var row = this.getRow(str.substring(1));
		var pos = [row, col];
		return pos;
	};
	this.getPosCh = function(pos) {
		return this.getCol_(pos[1]) + '' + (pos[0] + 1);
	}
	this.canIgo = function(pos, dir) {
		// dir: from 0, north, north-east, east, and so on.
		var pos_ = [pos[0]+this.DIRVEC[dir][0], pos[1]+this.DIRVEC[dir][1]];
		if (pos_[0] < 0 || pos_[1] < 0) {  // out of index!
			return -1;
		} else if (pos_[0] >= this.MAP.length || pos_[1] >= this.MAP[0].length) {
			return -1;
		}
		if (0 == this.MAP[pos_[0]][pos_[1]]) {  // blocked!
			return -1;
		}
		return pos_;
	};
	this.redisplay = function() {
		$('.position').html(this.getPosCh(this.pos) + ' / ' + this.dir);
		this.minimap();
		var posCh = this.getPosCh(this.pos);
		$('.screen img').attr('src', 'https://github.com/jnhwkim/Kitchen64/raw/master/kitchen64.half/' + posCh + '_' + this.dir + '.JPG');
		return 1;
	};
	this.action = function(act) {
		switch (act) {
			case 'forward':
				if (0 > this._move(this.dir)) {
					this.msg('Blocked!');
				}
				break;
			case 'backward':
				if (0 > this._move((this.dir + 4) % 8)) {
					this.msg('Blocked!');
				}
				break;
			case 'left':
				this.dir = ((this.dir - 1) + 8) % 8;
				this.msg('');
				break;
			case 'right':
				this.dir = (this.dir + 1) % 8;
				this.msg('');
				break;
		}
		this.redisplay();
	};
	this.msg = function(str) {
		$('.message').html(str);
	}
	this._move = function(dir) {
		pos_ = this.canIgo(this.pos, dir);
		if (2 == pos_.length) { // naive check for a pair
			this.pos = pos_;
		} else {
			return -1;
		}
	};
	this.minimap = function() {
		var code = '';
		for (var i = 0; i < this.MAP.length; i++) {
			for (var j = 0; j < this.MAP[0].length; j++) {
				tag = (1 == this.MAP[i][j]) ? 'open' : 'block';
				if (i == this.pos[0] && j == this.pos[1]) {
					tag = 'current';
					dir = '<div class="dir-indicator dir' + this.dir + '"></div>';
				} else {
					dir = '';
				}
				code += '<div class="state ' + tag + '">' + dir + this.getPosCh([i,j]) 
							+ '</div>';
			}
		}
		$('.minimap').html(code);
	};
	this.MAP = [[1,0,0,0,0,0,0,0],
							[1,0,0,0,0,0,0,0],
							[1,1,1,1,1,1,1,1],
							[1,1,1,1,1,1,1,1],
							[1,1,0,0,0,0,1,1],
							[1,1,0,0,0,0,1,1],
							[1,1,0,0,0,0,1,1],
							[1,1,0,0,0,0,1,1],
							[1,1,0,0,0,0,1,1],
							[1,1,1,1,1,1,1,1],
							[1,1,1,1,1,1,1,1],
							[0,0,1,1,1,1,1,1],
							[0,0,1,0,0,1,1,1]];
	this.DIRVEC = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
};