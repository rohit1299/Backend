const pool = new Pool({
  user: "postgres",

  host: "localhost",

  database: "postgres",

  password: "123456789",

  port: 5432,
});

/* GET users listing. */

router.get("/", function (req, res, next) {
  pool.query(
    `SELECT * FROM "Users" where id=$1`,
    [req.query.id],
    (err, result) => {
      if (err) {
        throw err;
      }

      res.status(200).json(result);
    }
  );
});

module.exports = router;
