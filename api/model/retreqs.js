const pool = require("./pool");

const retads = async (data) => {
  try {
    const uid = await pool.query("select id from users where email = $1", [
      data.email,
    ]);
    const adQuery = await pool.query(
      "select * from reqs where uid = $1",
      [uid.rows[0].uid]
    );
    return {code : 0, data : adQuery.rows};
  } catch (e) {
    return new Error();
  }
};
