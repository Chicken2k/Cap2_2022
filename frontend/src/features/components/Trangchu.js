import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../container/trangchu/banner/Banner";
import Dichvu from "../container/trangchu/dichvu/Dichvu";
import Footer from "../container/trangchu/footer/Footer";
import Nhahang from "../container/trangchu/nhahang/Nhahang";
import Showchat from "./showchat";
export class Trangchu extends Component {
  render() {
    return (
      <div>
        <Banner />
        <Nhahang />
        <Dichvu />
        {/* <Tintuc /> */}
        <Nhahang />
        <Footer />
        <Showchat />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Trangchu);
