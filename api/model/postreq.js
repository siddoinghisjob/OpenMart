const pool = require("./pool");

const postreq = async (data) => {
  try {
    const uid = await pool.query("select id from users where email = $1", [
      data.email,
    ]);
    await pool.query(
      "insert into ads (title, description, uid, cost, number, condition, category) values ($1,$2,$3,$4,$5,$6,$7)",
      [
        data.name,
        data.desc,
        uid.rows[0].id,
        data.cost,
        data.number,
        data.condition,
        data.category,
      ]
    );
  } catch (e) {
    return new Error();
  }
};


module.exports = postreq