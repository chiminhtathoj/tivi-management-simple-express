const fs = require('fs');
const path = require('path');

class Tivi {
  constructor(data) {
    Object.assign(this, data);
  }

  static getAll() {
    const tiviDir = path.join(__dirname, '..', 'public', 'data', 'tivi');
    const files = fs.readdirSync(tiviDir);
    return files.map(file => {
      const filePath = path.join(tiviDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return new Tivi(data);
    });
  }

  static filter(tivis, criteria) {
    return tivis.filter(tivi => {
      const priceInRange = (!criteria.minPrice || tivi.Don_gia_Ban >= criteria.minPrice) &&
                           (!criteria.maxPrice || tivi.Don_gia_Ban <= criteria.maxPrice);
      const matchesGroup = !criteria.nhomTivi || tivi.Nhom_Tivi.Ma_so === criteria.nhomTivi;
      const matchesName = !criteria.name || tivi.Ten.toLowerCase().includes(criteria.name.toLowerCase());
      return priceInRange && matchesGroup && matchesName;
    });
  }

  static getNhomTivi() {
    const allTivis = this.getAll();
    const nhomTivis = new Set(allTivis.map(tivi => JSON.stringify(tivi.Nhom_Tivi)));
    return Array.from(nhomTivis).map(nhom => JSON.parse(nhom));
  }
}

module.exports = Tivi;
