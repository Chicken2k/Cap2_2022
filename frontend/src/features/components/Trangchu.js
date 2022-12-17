import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../container/trangchu/banner/Banner";
import Dichvu from "../container/trangchu/dichvu/Dichvu";
import Footer from "../container/trangchu/footer/Footer";
import Nhahang from "../container/trangchu/nhahang/Nhahang";
import Tintuc from "../container/trangchu/tintuc/Tintuc";
import Chat2 from "./Chat2";
export class Trangchu extends Component {
  render() {
    return (
      <div>
        <Banner />
        <Nhahang />
        <Tintuc />
        <Dichvu />
        <Footer />
        {/* <Showchat /> */}
        <Chat2/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Trangchu);
