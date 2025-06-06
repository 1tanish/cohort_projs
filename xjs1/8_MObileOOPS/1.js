class MobileShop {
  constructor() {
    this.mobiles = [];
  }
  addmobile(mobile) {
    this.mobiles.push(mobile);
  }
  info() {
    this.mobiles.forEach((mobile, idx) => {
      console.log(`${idx + 1}) ${mobile.company} ${mobile.model}'${mobile.color}' [${mobile.id}] : ${mobile.price} ${mobile.sims[0]?.brand} ${mobile.sims[1]?.brand}`);
      }
    );
  }
}
class mobile {
  constructor(company, model, price, color) {
    this.id = Math.floor(Math.random() * 1000000000);
    this.model = model;
    this.company = company;
    this.price = price;
    this.color = color;
    this.sims = [];
  }
  insertsim(sim){
    this.sims.push(sim)
  }
}
class sim {
  constructor(brand, bal) {
    this.brand = brand;
    this.bal = bal;
  }
  addbalance(balance) {
    this.bal += balance;
  }
}
mobshop = new MobileShop();
samsung = new mobile("Samsung", "S23 Ultra", "120000rs", "Black");
tado=new sim('tata docomo',256)
mobshop.addmobile(samsung);
samsung.insertsim(tado)
mobshop.info();

