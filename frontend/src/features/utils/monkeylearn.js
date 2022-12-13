const axios = require("axios");
const MonkeyLearn = require("monkeylearn");
// Use the API key from your account
const ml = new MonkeyLearn("9b11fda4c726261af5301dc2399ea1b1012ec25d");

module.exports = {
  monkeyLearnAnalysis: async (comment) => {
    // Sentiment analysis ID
    let model_id = "cl_NDBChtr7";
    let data = [];
    var commentAnalyzed, analyzeComment;
    data.push(comment);
    analyzeComment = await ml.classifiers
      .classify(model_id, data)
      .then(async (response) => {
        const res = await response.body;
        res.forEach((data) => {
          data.classifications.forEach((data) => {
            commentAnalyzed = data.tag_name;
          });
        });
        return commentAnalyzed;
      })
      .catch((error) => {
        console.log(error.response);
      });
    return analyzeComment;
  },
};
