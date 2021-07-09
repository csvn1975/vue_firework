export const firework = function ( startPosition = 'left' ) {  
  
  var canvas = document.querySelector("canvas");
  
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const config = {
    size: 3,
    number: 20,
    fill: 0.1,
  };

  /* color */
  const ColorArray = [
    "#ffffff",
    "#FF0000",
    "#33FF33",
    "#CCFF00",
    "#FF9900",
    "#3399FF",
    "#FF3399",
    "#CC0066",
    "#00FF00",
  ];

  const colorCount = ColorArray.length;

  function randomColor() {
    return ColorArray[Math.floor( randRange(colorCount) )];
  }

  function randRange(maxValue = 1) {
      return (Math.random() * maxValue)
  }

  document.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   
  });

  /**FireWork**/

  function FireWork() { 
    this.radius = config.size;
    switch (startPosition) {
        case 'center':
            this.x = canvas.width / 2;
            break;
        case 'left' :
            this.x = 0;
            break;
        default:
            this.x = canvas.width;
    }

    this.y = canvas.height;

    this.color = randomColor();
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * 3 + 3,
    };

    this.maxY = randRange(canvas.height) / 4 + canvas.height / 10;
    this.life = true;

  }

  FireWork.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  FireWork.prototype.maximumY = function () {

    if (this.y <= this.maxY) {
      this.life = false;

      let randdomSpark = Math.floor(randRange(20)) + 10;
      for (let i = 0; i < randdomSpark; i++) {

        if (randdomSpark > 15)
          this.color =randomColor() 
        var radius = this.radius;

        if (randdomSpark > 25){
          radius =  this.radius / 3;

        }  
        else if (randdomSpark > 15)  {
          radius =  this.radius / 2;
        }

        SparkArray.push(new Spark(this.x, this.y, radius, this.color));
      }
    }

    else if (this.x <= 0 || this.x >= canvas.width) {
      this.life = false;
      for (let i = 0; i < 10; i++) {
        SparkArray.push(new Spark(this.x, this.y, this.radius, this.color));
      }
    }

  };

  FireWork.prototype.update = function () {
    this.y -= this.velocity.y;
    this.x += this.velocity.x;
    this.maximumY();
    this.draw();
  };
  /**end firework**/


  /**Spark**/
  function Spark(x, y, radius, color) {

    this.x = x;
    this.y = y;
    this.radius = radius / 2;
    this.color = color;
    this.velocity = {
      x: randRange(3) - 1,
      y: randRange(3) - 1,
    };
    this.friction = 0.015;
    this.life = 150;

  }

  Spark.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  Spark.prototype.update = function () {
    this.life -= 1;
    this.velocity.y -= this.friction;
    this.y -= this.velocity.y ;
    this.x += this.velocity.x;
    this.draw();
  };
  /**end Spark**/

  var FireWorkArray = [];
  var SparkArray = [];

  function init() {
    if (FireWorkArray.length < config.number)
       FireWorkArray.push(new FireWork());
  }


  function startFireWork() {
    
    window.requestAnimationFrame(startFireWork);

    ctx.fillStyle = `rgba(0,0,0,${config.fill})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    FireWorkArray = FireWorkArray.filter(function (fw) {
      fw.update();
      return fw.life;
    });

    SparkArray = SparkArray.filter((spark) => {
      if (spark.life > 0) {
         spark.update();
        return true;
      }
      
    });
    init();
  }
  startFireWork();

};
