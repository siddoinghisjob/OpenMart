const pool = require("./pool");

const retads = async (data) => {
  try {
    const uid = await pool.query("select id from users where email = $1", [
      data.email,
    ]);
    const adQuery = await pool.query(
      "select * from ads where uid = $1",
      [uid.rows[0].uid]
    );
    const ads = [];
    const imageQuery = adQuery.rows.forEach(async ad => {
        const q = await pool.query('select url from images where aid = $1', [ad.id]);
        const urls = []
        q.rows.forEach(row => url.push(row.url));
        const obj = {id : ad.id ,title : ad.title, desc : ad.desc, cost : ad.cost, images : urls};
        return obj;
    })
    ads = await Promise.all(imageQuery);
    return {code : 0, data : ads};
  } catch (e) {
    return new Error();
  }
};
