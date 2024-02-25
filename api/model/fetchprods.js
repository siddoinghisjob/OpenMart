const pool = require("./pool");
const tFunc = require('../utils/tfunc');
const fetchprods = async (data) => {
  try {
    let ads = await pool.query(
      "select created_at, id, title, uid from ads ORDER by created_at DESC"
    );
    const adsPromise = ads.rows.map(async (row) => {
      const query = await pool.query("select * from images where aid = $1", [
        row.id,
      ]);
      const email = await pool.query("select * from users where id = $1", [
        row.uid,
      ]);
      row.time = tFunc(row.created_at);
      const images = query.rowCount > 0 ? query.rows[0].url : "";
      const obj = {
        ...row,
        email: email.rows[0].email,
        image:
          images?.length > 0
            ? images
            : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
      };
      return obj;
    });
    ads = await Promise.all(adsPromise);
    return ads;
  } catch (err) {
    return new Error(err);
  }
};
module.exports = fetchprods;
