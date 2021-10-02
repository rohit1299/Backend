//npm i express-session redis connect-redis
const redis = require("redis")
const connectRedis = require("connect-redis")
const session = require("express-session")
//create redisstore
const RedisStore = connectRedis(session)
//create redisClient
const redisClient =redis.createClient({
    host:'localhost',
    port:6379
})

redisClient.on('error', (err)=>{
    console.error("Could not connect to redis",err);
})

redisClient.on('connect', ()=>{
    console.log("Connected to redis");
})

module.exports ={
    redisClient,session,RedisStore
}