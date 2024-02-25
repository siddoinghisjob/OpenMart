const pool = require("./pool");
const uploader = require("../utils/uploader");
const postad = async (data,files) => {
  try {
    if (!files || files.length === 0 || files.length > 6) {
      throw new Error("Incorrect number of images.");
    }
    const uid = await pool.query("select id from users where email = $1", [
      data.email,
    ]);
    const ads = await pool.query(
      "insert into ads (title, description, uid, cost, number, condition, category) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [data.name, data.desc, uid.rows[0].id, data.cost, data.number, data.condition, data.category]
    );
    const upload = await uploader(files, ads.rows[0].id);
    if(upload.code) return upload;
    return { message: "Done", code: 0 };
  } catch (e) {
    return new Error(e);
  }
};
module.exports = postad;
