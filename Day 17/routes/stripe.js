
const router = express.Router();
const stripe = require("stripe")()
const path = require("path")

router.get("/",function(req,res){
    res.sendFile(path.join(__dirname),"../public/html/index.js")
})

router.post("/payment",async(reg,res)=>{
    try {
        const session = await stripe.checkout.session.create({
            line_items:[{
                amount :req.body.price *100,
                name:'shopping',
                currency:"usd",
                quantity:1,
            }],
            payment_method_types:["card"],
            success_url:`${req.header.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${req.header.origin}?cancelled=true`

        })
        res.redirect(303,session.url)
    } catch (error) {
        res.status(500).send({
            error
        })
    }
})

module.exports = router;