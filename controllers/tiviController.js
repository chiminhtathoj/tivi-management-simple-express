const Tivi = require('../models/tivi');

exports.getAllTivi = (req, res) => {
  const allTivis = Tivi.getAll();
  res.json(allTivis);
};

exports.filterTivi = (req, res) => {
  const allTivis = Tivi.getAll();
  const { name, minPrice, maxPrice, nhomTivi, status } = req.query;
  const filteredTivis = Tivi.filter(allTivis, {
    name,
    minPrice: minPrice ? parseInt(minPrice) : null,
    maxPrice: maxPrice ? parseInt(maxPrice) : null,
    nhomTivi,
    status
  });
  res.json(filteredTivis);
};

exports.getNhomTivi = (req, res) => {
  const nhomTivis = Tivi.getNhomTivi();
  res.json(nhomTivis);
};
