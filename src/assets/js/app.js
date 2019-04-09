let ctx;
let fps = 200;
let interval;
let piece;

const canvas = {
  width: 400,
  height: 640,
  node: null,
  clear() {
    this.node.width = this.width;
    this.node.height = this.height;
  }
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
  ],

  draw() {
    for (var py = this.marginTop; py < this.height; py++) {
      for (var px = 1; px < this.width + 1; px++) {
        let panelPiece = this.matrix[py][px];
        if (panelPiece !== 0) {
          ctx.fillStyle = colors[panelPiece - 1];
          ctx.fillRect(((px - 1) * tile.width), ((py - this.marginTop) * tile.height), tile.width, tile.height);

          ctx.strokeStyle = chroma.hex(colors[panelPiece - 1]).darker(1);
          ctx.lineWidth = 2.5;
          ctx.strokeRect(((px - 1) * tile.width), ((py - this.marginTop) * tile.height), tile.width, tile.height);
        } else {
          ctx.fillStyle = '#24383c';
          ctx.fillRect(((px - 1) * tile.width), ((py - this.marginTop) * tile.height), tile.width, tile.height);

          ctx.strokeStyle = chroma.hex('#24383c').darker(1);
          ctx.lineWidth = 2.5;
          ctx.strokeRect(((px - 1) * tile.width), ((py - this.marginTop) * tile.height), tile.width, tile.height);
        }
      }
    }
  },

  reset() {
    this.matrix = emptyPanel
  }
}

const emptyPanel = JSON.parse(JSON.stringify(panel.matrix));

let colors = ['#02c8ff', '#ff46ec', '#d3f5ff', '#8801db', '#f990ab', '#a19bfb', '#4b3dba'];

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

let objPiece = {
  x: 0,
  y: 0,
  angle: 2,
  type: 2,
  delay: 50,
  frame: 0,

  new() {
    this.type = Math.floor(Math.random() * 7);
    this.y = 0;
    this.x = 4;
    this.frame = 0;
  },

  render() {
    for (var py = 0; py < 4; py++) {
      for (var px = 0; px < 4; px++) {
        let tetrisPiece = pieceGraphic[this.type][this.angle][py][px];
        if (tetrisPiece !== 0) {
          ctx.fillStyle = colors[tetrisPiece - 1];
          ctx.fillRect(((this.x + px - 1) * tile.width), ((this.y + py - panel.marginTop) * tile.height), tile.width, tile.height);

          ctx.strokeStyle = chroma.hex(colors[tetrisPiece - 1]).darker(1);
          ctx.lineWidth = 2.5;
          ctx.strokeRect(((this.x + px - 1) * tile.width), ((this.y + py - panel.marginTop) * tile.height), tile.width, tile.height);
        }
      }
    }
  },

  rotate() {
    let newAngle = this.angle;
    (newAngle < pieceGraphic[0].length - 1) ? (newAngle++) : (newAngle = 0)
    if (!this.collision(newAngle, this.y, this.x)) this.angle = newAngle
  },

  fall() {
    if (this.frame < this.delay) {
      this.frame++;
    } else {
      if (!this.collision(this.angle, this.y + 1, this.x)) {
        this.y++;
      } else {
        this.fix();
        this.new();
        this.clear();
        if (this.validateLost()) panel.reset()
      }
      this.frame = 0;
    }
  },

  down() {
    if (!this.collision(this.angle, this.y + 1, this.x)) this.y++;
  },

  left() {
    if (!this.collision(this.angle, this.y, this.x - 1)) this.x--;
  },

  right() {
    if (!this.collision(this.angle, this.y, this.x + 1)) this.x++;
  },

  collision(newAngle, newY, newX) {
    let result = false;
    for (var py = 0; py < 4; py++) {
      for (var px = 0; px <= 4; px++) {
        if (pieceGraphic[this.type][newAngle][py][px] > 0) {
          if (panel.matrix[newY + py][newX + px] > 0) result = true;
        }
      }
    }
    return result;
  },

  fix() {
    for (var py = 0; py < 4; py++) {
      for (var px = 0; px <= 4; px++) {
        if (pieceGraphic[this.type][this.angle][py][px] > 0) {
          panel.matrix[this.y + py][this.x + px] = pieceGraphic[this.type][this.angle][py][px]
        }
      }
    }
  },

  validateLost() {
    let lost = false;
    for (var px = 1; px < panel.width + 1; px++) {
      if (panel.matrix[2][px] > 0) lost = true
    }

    return lost
  },

  clear() {
    let completeRow;
    for (var py = panel.marginTop; py < panel.height; py++) {

      completeRow = true;

      for (var px = 1; px < panel.width + 1; px++) {
        if (panel.matrix[py][px] === 0) completeRow = false
      }

      if (completeRow) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2.5;
        ctx.filter = 'blur(3px)';
        ctx.strokeRect(1, ((py - panel.marginTop) * tile.height), tile.width * 10, tile.height);
        ctx.save();
        clearInterval(interval)

        setTimeout(() => {
          panel.matrix.splice(py, 1);
          panel.matrix.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
          interval = setInterval(intervalFn, 1000 / fps);
        }, 1000)

      }

    }
  }

}

function factoryPiece() {
  return Object.create(objPiece);
}

const init = (function init() {
  canvas.node = document.getElementById('canvas');
  canvas.node.width = canvas.width;
  canvas.node.height = canvas.height;

  ctx = canvas.node.getContext('2d');

  piece = factoryPiece();
  piece.new();
  initKeyboard(piece);

  interval = setInterval(intervalFn, 1000 / fps);
})();

function intervalFn() {
  canvas.clear();
  panel.draw();
  piece.render();
  piece.fall();
}

function initKeyboard(proto) {
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38:
        proto.rotate();
        break;
      case 40:
        proto.down();
        break;
      case 37:
        proto.left();
        break;
      case 39:
        proto.right();
        break;
      default:
        proto.down();
    }
  })
}