const pool = require("../model/pool");

const whoSaw = async (data) => {
  try {
    const query = await pool.query(
      "insert into whosaw (uid,aid) values ($1,$2)",
      [data.uid, data.aid]
    );
    const num = await pool.query(
      `{select number from ${data.type} where id = $1}`,
      [data.aid]
    ).rows[0].number;

    return {code : 0, number : num};
  } catch (e) {
    return  {code : 1};
  }
};

module.exports = whoSaw;
