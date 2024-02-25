const pool = require("./pool");

const search = async (data) => {
  try {
    const q = data.id;

    let ads = await pool.query(
      "select id, title, created_at from ads where title % $1 or description % $1 ORDER by created_at DESC",
      [q]
    );
    const adsPromise = ads.rows.map(async (row) => {
      const query = await pool.query("select * from images where aid = $1", [
        row.id,
      ]);
      const email = await pool.query("select * from users where id = $1", [
        row.uid,
      ]);
      const images =
        query.rowCount > 0
          ? query.rows[0].url
          : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
      const obj = { ...row, email: email.rows[0].email, image: images };
      return obj;
    });
    ads = await Promise.all(adsPromise);
    return ads;
  } catch (err) {
    return new Error(err);
  }
};
module.exports = search;
