class Rectagle {
  constructor(height, width, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    console.log(this);
    return 2 * (this.width + this.height);
  }
}

let rect = new Rectagle(10, 20, "red");
console.log(rect.perimeter());
console.log(rect.size);

