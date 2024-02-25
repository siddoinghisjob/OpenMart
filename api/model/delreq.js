const pool = require('./pool');

const DelReq = async (data) => {
    try{
        const query = await pool.query('delete from reqs where id = $1',[data.id]);
        return {code:0};
    }
    catch(e){
        return {code:1};
    }
}