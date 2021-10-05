const express = require("express");

var Artist = require("../models/artist");
const router = express.Router();

const { Op } = require("sequelize");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const products = await Artist.findAll({
      where: {
        Name: {
          [Op.like]: "%" + req.query.q + "%",
        },
      },
    });
    res.status(200).send({
      items: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: true,
      message: "cannot process your request ",
    });
  }
});
router.get("/trgm", async (req, res) => {
  sequelize
    .query("CREATE EXTENSION IF NOT EXISTS pq_trgm;")
    .then(() => {
      sequelize
        .query("select * from pq_extension where extname = 'pg_trgms';")
        .then(() => {
          Artist.findAll({
            attributes: {
              include: [
                [
                  sequelize.fn(
                    "similarity",
                    sequelize.col("Name"),
                    req.query.q
                  ),
                  "score",
                ],
              ],
            },
            where: [
              sequelize.where(
                sequelize.fn("similarity", sequelize.col("Name"), req.query.q),
                { [Op.gt]: 0.2 }
              ),
              {},
            ],
          })
            .then((art) => {
              res.status(200).send(art);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
router.get("/sound", async (req, res) => {
  try {
    const extension = await sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;"
    );
    const artist = await sequelize.query(
      `SELECT * FROM "Artists" WHERE "Nationality" IN('American', 'British')
            AND SOUNDEX("Name") = SOUNDEX('${req.query.q}');
            `
    );
    res.status(200).send(artist);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/metaphone", async (req, res) => {
  try {
    const extension = await sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;"
    );
    const artist = await sequelize.query(
      `SELECT * FROM "Artists" WHERE  "Nationality" = "American"
            ORDER BY SIMILARITY (
                METAPHONE("Name",10),
                METAPHONE('${req.query.q}',10)
            )DESC LIMIT 5;
            `
    );
    res.send(artist);
  } catch (err) {
    res.status(500).send(err);
  }
});
