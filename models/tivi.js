const fs = require('fs');
const path = require('path');

class Tivi {
  constructor(data) {
    Object.assign(this, data);
    this.Trang_thai_Con_hang = this.tinhTrangThaiConHang();
  }

  tinhTrangThaiConHang() {
    const soLuongNhap = this.Danh_sach_Nhap_hang.reduce((total, item) => total + item.So_luong, 0);
    const soLuongBan = this.Danh_sach_Ban_hang.reduce((total, item) => total + item.So_luong, 0);
    return soLuongNhap > soLuongBan;
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
      const matchesStatus = !criteria.status ||
                            (criteria.status === 'inStock' && tivi.Trang_thai_Con_hang) ||
                            (criteria.status === 'outOfStock' && !tivi.Trang_thai_Con_hang);
      return priceInRange && matchesGroup && matchesName && matchesStatus;
    });
  }

  static getNhomTivi() {
    const allTivis = this.getAll();
    const nhomTivis = new Set(allTivis.map(tivi => JSON.stringify(tivi.Nhom_Tivi)));
    return Array.from(nhomTivis).map(nhom => JSON.parse(nhom));
  }
}

module.exports = Tivi;
