import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../container/trangchu/banner/Banner";
import Tourtrongnuoc from "../container/trangchu/tourtrongnuoc/Tourtrongnuoc";
import Tournuocngoai from "../container/trangchu/tournuocngoai/Tournuocngoai";
import Dichvu from "../container/trangchu/dichvu/Dichvu";
import Footer from "../container/trangchu/footer/Footer";
import Tintuc from "../container/trangchu/tintuc/Tintuc";
import Showchat from "./showchat"
export class Trangchu extends Component {

  render() {
    return (
      <div>
        <Banner/>
        <Tourtrongnuoc />
        <Tournuocngoai />
        <Dichvu />
        <Tintuc />
        <Footer />
        <Showchat/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Trangchu);