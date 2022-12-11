require("dotenv").config();
var express = require("express");
// var bodyParser = require('body-parser');
var app = express();
var cors = require("cors");
const morgan = require("morgan");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51JvilZB36PKJt46mB4ANXnXBOA2jsJ5zCef0EwHRjE07stlFLFP3qAybd28UziINm2mPADme1eZVh6qeav54BNs2009bnwcV67"
);
const talkToChatbot = require("./chatbot");
const fulfillmentRoutes = require("./fulfillment");
// const mailjet = require("node-mailjet").connect(
//   process.env.MJ_APIKEY_PUBLIC,
//   process.env.MJ_APIKEY_PRIVATE
// );
let jsonParser = express.json();
let urlEncoded = express.urlencoded({ extended: true });
app.use(cors());
app.use(morgan("dev"));
// Send email
app.post("/sendemail", jsonParser, urlEncoded, async (req, res) => {
  console.log(req.body);
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "phucv172@gmail.com",
          Name: "Quy Tran - Seller BUAG",
        },
        To: [
          {
            Email: req.body.email,
            Name: req.body.name,
          },
        ],
        TemplateID: 3909947,
        TemplateLanguage: true,
        Subject: "Invoice Tour",
        Variables: {
          firstname: req.body.name,
          total_price: req.body.thanhtien,
          order_date: req.body.orderDate,
          order_id: req.body.orderId,
        },
      },
    ],
  });
  request
    .then((result) => {
      res.send(result);
      console.log(result.body);
    })
    .catch((err) => {
      res.send(err);
      console.log(err.statusCode);
    });
});
// app.post("/chatbot", jsonParser, urlEncoded, async (req, res) => {
//   const message = req.body.message;
//   const userId = req.body.userId;
//   console.log("message" + message);

//   try {
//     const response = await talkToChatbot(message, userId);
//     res.send({ message: response });
//   } catch (err) {
//     console.log("Something went wrong: " + err);
//     res.send({
//       error: "Error occured here",
//     });
//   }
//   // talkToChatbot(message)
//   //   .then((response) => {
//   //     res.send({ message: response })
//   //   })
//   //   .catch((error) => {
//   //     console.log('Something went wrong: ' + error)
//   //     res.send({
//   //       error: 'Error occured here',
//   //     })
//   //   })
// });
// app.use(fulfillmentRoutes);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hi</h1>");
});

app.post("/payment", async (req, res) => {
  const { email, price } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });
  res.json({ client_secret: paymentIntent["client_secret"] });
});

require("./routes/dangnhap")(app);
require("./routes/user")(app);
require("./routes/Quocgia")(app);
require("./routes/Tour")(app);
require("./routes/Ngaydi")(app);
require("./routes/Loaitour")(app);
require("./routes/Diadiem")(app);
require("./routes/Anh")(app);
require("./routes/Dichvu")(app);
require("./routes/Role")(app);
require("./routes/UserRole")(app);
require("./routes/checkemail")(app);
require("./routes/Checkuser")(app);
require("./routes/DichvuTour")(app);
require("./routes/TourLoaitour")(app);
require("./routes/TourNgaydi")(app);
require("./routes/TourDiadiem")(app);
require("./routes/Binhluan")(app);
require("./routes/Hoadon")(app);
require("./routes/Tintuc")(app);
require("./routes/Tag")(app);
require("./routes/TintucTag")(app);
require("./routes/Thongbao")(app);
require("./routes/Hoadoncanhan")(app);
require("./routes/Phanhoi")(app);
require("./routes/Chude")(app);
require("./routes/Binhluanchude")(app);
require("./routes/Restaurant")(app);
require("./routes/admin")(app);
require("./routes/City")(app);
require("./routes/Food")(app);
require("./routes/Order")(app);
require("./routes/Comment")(app);
require("./routes/Reply")(app);
require("./routes/news")(app);

app.use(function (err, req, res, next) {
  res.status(500).send(err);
});
app.listen(process.env.PORT || 666, () => {
  console.log(`Server is listening on port 666`);
});
