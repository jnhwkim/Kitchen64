var Kitchen = new function() {
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
	this.canIgo = function(pos, dir) {
		// dir: from 0, north, north-east, east, and so on.
		var pos_ = [pos[0]+this.DIRVEC[dir][0], pos[1]+this.DIRVEC[dir][1]];
		if (pos_[0] < 0 || pos_[1] < 0) {  // out of index!
			return -1;
		}
		if (0 == this.MAP[pos_[0]][pos_[1]]) {  // blocked!
			return -1;
		}
		return pos_;
	};
	this.MAP = [[1,0,0,0,0,0,0,0,0],
							[1,1,1,1,1,1,1,1,1],
							[1,1,1,1,1,1,1,1,1],
							[1,1,1,1,1,1,1,1,1],
							[1,1,0,0,0,0,1,1,1],
							[1,1,0,0,0,0,1,1,1],
							[1,1,0,0,0,0,1,1,1],
							[1,1,0,0,0,0,1,1,1],
							[1,1,0,0,0,0,1,1,1],
							[1,1,1,1,1,1,1,1,1],
							[1,1,1,1,1,1,1,1,1],
							[0,0,1,1,1,1,1,1,1],
							[0,0,1,0,0,1,1,1,1]];
	this.DIRVEC = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
};