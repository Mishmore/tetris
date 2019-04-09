let ctx;
let fps = 50;
let piece;

const canvas = {
  width: 400,
  height: 640,
  node: null
}

const panel = {
  width: 10,
  height: 20,
  marginTop: 4,
  matrix: [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
}

const emptyPanel = JSON.parse(JSON.stringify(panel.matrix))

let colors = ['#ed2828', '#a428ed', '#ef8a07', '#efcc07', '#75bf0f', '#0dc1b2', '#0d48c6'];

const tile = {
  width: 40,
  height: 40
}

const pieceGraphic = [
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  ],

  [
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0]
    ],

    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0]
    ]

  ],

  [
    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ]

  ],

  [
    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0]
    ]

  ],

  [
    [
      [0, 0, 0, 0],
      [0, 5, 5, 5],
      [0, 5, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 5],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 5],
      [0, 5, 5, 5],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 5, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 0, 0]
    ]

  ],

  [
    [
      [0, 0, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 6],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 6, 6],
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 6, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 6, 6, 0],
      [0, 0, 0, 0]
    ]
  ],


  [
    [
      [0, 0, 0, 0],
      [0, 7, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 7, 0],
      [0, 0, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 7],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ]
  ]
];

let objPiece = function() {
  this.x = 0;
  this.y = 0;
  this.angle = 2;
  this.type = 2;
  this.delay = 50;
  this.frame = 0;

  this.new = function() {
    this.type = Math.floor(Math.random() * 7);
    this.y = 0;
    this.x = 4;
    this.frame = 0;
  }

  this.render = function() {
    for (var py = 0; py < 4; py++) {
      for (var px = 0; px < 4; px++) {
        let tetrisPiece = pieceGraphic[this.type][this.angle][py][px];
        if (tetrisPiece !== 0) {
          ctx.fillStyle = colors[tetrisPiece - 1];
          ctx.fillRect(((this.x + px - 1) * tile.width), ((this.y + py - panel.marginTop) * tile.height), tile.width, tile.height);

          ctx.strokeStyle =  chroma.hex(colors[tetrisPiece - 1]).darker(1);
          ctx.lineWidth   = 5;
          ctx.strokeRect(((this.x + px - 1) * tile.width), ((this.y + py - panel.marginTop) * tile.height), tile.width, tile.height);
        }
      }
    }
  }

  this.rotate = function() {
    let newAngle = this.angle
    if (newAngle < 3) {
      newAngle++
    } else {
      newAngle = 0;
    }

    if (this.collision(newAngle, this.y, this.x) === false) this.angle = newAngle
  }

  this.fall = function() {
    if (this.frame < this.delay) {
      this.frame++;
    } else {
      if (this.collision(this.angle, this.y + 1, this.x) === false) {
        this.y++;
      } else {
        this.fix();
        this.new();
        this.clear();
        if (this.validateLost()) reset()
      }
      this.frame = 0;
    }
  }

  this.down = function() {
    if (this.collision(this.angle, this.y + 1, this.x) === false) this.y++;
  }

  this.left = function() {
    if (this.collision(this.angle, this.y, this.x - 1) === false) this.x--;
  }

  this.right = function() {
    if (this.collision(this.angle, this.y, this.x + 1) === false) this.x++;
  }

  this.collision = function(newAngle, newY, newX) {
    let result = false;
    for (var py = 0; py < 4; py++) {
      for (var px = 0; px <= 4; px++) {
        if (pieceGraphic[this.type][newAngle][py][px] > 0) {
          if (panel.matrix[newY + py][newX + px] > 0) result = true;
        }
      }
    }
    return result;
  }

  this.fix = function() {
    for (var py = 0; py < 4; py++) {
      for (var px = 0; px <= 4; px++) {
        if (pieceGraphic[this.type][this.angle][py][px] > 0) {
          panel.matrix[this.y + py][this.x + px] = pieceGraphic[this.type][this.angle][py][px]
        }
      }
    }
  }

  this.validateLost = function() {
    let lost = false;
    for (var px = 1; px < panel.width + 1; px++) {
      if (panel.matrix[2][px] > 0) lost = true
    }

    return lost
  }

  this.clear = function() {
    let completeRow;
    for (var py = panel.marginTop; py < panel.height; py++) {

      completeRow = true;

      for (var px = 1; px < panel.width + 1; px++) {
        if (panel.matrix[py][px] === 0) completeRow = false
      }

      if (completeRow) {
        panel.matrix.splice(py, 1);
        panel.matrix.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
      }

    }
  }

  this.new();

}

function drawPanel() {
  for (var py = panel.marginTop; py < panel.height; py++) {
    for (var px = 1; px < panel.width + 1; px++) {
      let panelPiece = panel.matrix[py][px];
      if (panelPiece !== 0) {
        ctx.fillStyle = colors[panelPiece - 1];
        ctx.fillRect(((px - 1) * tile.width), ((py - panel.marginTop) * tile.height), tile.width, tile.height);

        ctx.strokeStyle =  chroma.hex(colors[panelPiece - 1]).darker(1);
        ctx.lineWidth   = 5;
        ctx.strokeRect(((px - 1) * tile.width), ((py - panel.marginTop) * tile.height), tile.width, tile.height);
      }
    }
  }
}

const init = (function init() {
  canvas.node = document.getElementById('canvas');
  ctx = canvas.node.getContext('2d');

  canvas.node.width = canvas.width;
  canvas.node.height = canvas.height;

  initKeyboard();

  setInterval(() => {
    main();
  }, 1000 / fps);

  piece = new objPiece();
})();

function clearCanvas() {
  canvas.node.width = canvas.width;
  canvas.node.height = canvas.height;
}

function main() {
  clearCanvas();
  piece.render();
  piece.fall();
  drawPanel();
}

function reset() {
  panel.matrix = emptyPanel
}

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38:
        piece.rotate();
        break;
      case 40:
        piece.down();
        break;
      case 37:
        piece.left();
        break;
      case 39:
        piece.right();
        break;
      default:
        piece.down();
    }
  })
}
