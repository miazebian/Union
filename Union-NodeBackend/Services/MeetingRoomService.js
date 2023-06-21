const express = require("express");
const config = require("../config");

Validate_Meeting_ID = async (meetingId) => {
    /**
     * Using the Metered Get Room API to check if the
     * Specified Meeting ID is valid.
     * https://www.metered.ca/docs/rest-api/get-room-api
     */
    var options = {
      method: "GET",
      url:
        "https://" +
        config.METERED_DOMAIN +
        "/api/v1/room/" +
        req.query.meetingId,
      params: {
        secretKey: config.METERED_SECRET_KEY,
      },
      headers: {
        Accept: "application/json",
      },
    };
  
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        res.send({
          success: true,
        });
      })
      .catch(function (error) {
        console.error(error);
        res.send({
          success: false,
        });
      });
  };

Create_Meeting = async (meetingId) => {
  var options = {
    method: "POST",
    url: "https://" + config.METERED_DOMAIN + "/api/v1/room/",
    params: {
      secretKey: config.METERED_SECRET_KEY,
    },
    headers: {
      Accept: "application/json",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send({
        success: true,
        ...response.data,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.send({
        success: false,
      });
    });
};

Metered_Domain = async (req, res) => {
  res.send({
    domain: config.METERED_DOMAIN,
  });
};

module.exports = { Validate_Meeting_ID, Create_Meeting, Metered_Domain };