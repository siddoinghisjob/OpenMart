const pool = require("./pool");

const tFunc = require('../utils/tfunc');

const fetchAds = async (id) => {
  try {
    let ads = await pool.query("select * from ads where id = $1", [id]);
    if (ads.rowCount <= 0) return new Error();
    const query = await pool.query("select * from images where aid = $1", [
      ads.rows[0].id,
    ]);
    const email = await pool.query("select * from users where id = $1", [
      ads.rows[0].uid,
    ]);
    let images = [];

    for (let i = 0; i < query.rowCount; i++)
      images.push({
        original: query.rows[i].url,
        thumbnail: query.rows[i].url,
      });
    if (images.length == 0)
      images = [
        {
          original:
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
          thumbnail:
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
        },
      ];

    function emailExt(email) {
      const match = email.match(/^([^@]+)/);
      return match ? match[1] : null;
    }
    const obj = {
      ...ads.rows[0],
      time : tFunc(ads.rows[0].created_at),
      name: emailExt(email.rows[0].email),
      images: images,
    };
    const message = obj;
    return message;
  } catch (err) {
    return new Error(err);
  }
};

const fetchReqs = async (id) => {
  try {
    let reqs = await pool.query(
      "select * from requests ORDER by created_at DESC"
    );
    const reqsPromise = reqs.rows.map(async (row) => {
      const email = await pool.query("select * from users where id = $1", [
        row.uid,
      ]);
      const images = [];
      const obj = { ...row, email: email.rows[0].email, images: images };
      return obj;
    });
    reqs = await Promise.all(reqsPromise);
    const message = [...reqs];
    return message;
  } catch (err) {
    return new Error(err);
  }
};
module.exports = { fetchAds, fetchReqs };
