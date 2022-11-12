import React, { useEffect, useState } from 'react'
import { Badge, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './nav.css'
import Headers from './../header/Header'
import Themloaitour from './../Loaitour/Themloaitour'
import Loaitour from './../Loaitour/Loaitour'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Taikhoan from '../taikhoan/Taikhoan';
import Chitiettaikhoan from '../taikhoan/Chitiettaikhoan'
import Chitietquocgia from "../Quocgia/Chitietquocgia"
import Themquocgia from '../Quocgia/Themquocgia'
import Quocgia from '../Quocgia/Quocgia';
import Themdiadiem from '../DiaDiem/Themdiadiem';
import Diadiem from '../DiaDiem/Diadiem';
import Tour from "../Tour/Tour"
import Themtour from "../Tour/Themtour"
import Chitiettour from "../Tour/Chitiettour";
import Anh from "../Anh/Anh";
import Dichvu from "../Dichvu/Dichvu";
import Themdichvu from "../Dichvu/Themdichvu"
import Role from "../Role/Role";
import Themrole from '../Role/Themrole';
import Ngaydi from "..//Ngaydi/Ngaydi";
import Binhluan from "../Binhluan/Binhluan"
import Chitietbinhluan from '../Binhluan/Chitietbinhluan';
import Hoadon from "../Hoadon/Hoadon";
import Themtintuc from './../tintuc/Themtintuc'
import Tintuc from './../tintuc/Tintuc'
import Chitiettintuc from './../tintuc/Chitiettintuc'
import Doanhthu from './../Doanhthu/Doanhthu'
import Hoadoncanhan from '../Hoadoncanhan/Hoadoncanhan';
import { hoadoncanhanData } from '../Hoadoncanhan/hoadoncanhanSlice';
import Kiemduyet from '../Kiemduyet/Kiemduyet';
import Phanhoi from '../Phanhoi/Phanhoi';
import Suaphanhoi from '../Phanhoi/Suaphanhoi';
import Bieudo from '../Bieudo/Bieudo';
import Chude from '../Chude/Chude';
import Themchude from './../Chude/Themchude'
import Binhluanchude from './../Binhluanchude/Binhluanchude'

export default function Nav() {
    const match = useRouteMatch();
    const { Header, Sider, Content } = Layout;
    const [state, setState] = useState({
        collapsed: true,
        visible: true
    })
    const dispatch = useDispatch();
    const actionResult = async () => { await dispatch(hoadoncanhanData()) }
    useEffect(() => {
        actionResult();
        window.scrollTo(0, 0);
    }, []);
    const hoadoncanhan = useSelector(state => state.hoadoncanhans.hoadoncanhan.data);
    let counthoadon = 0;
    if (hoadoncanhan) {
        for (let i = 0; i < hoadoncanhan.length; i++) {
            if (hoadoncanhan[i].kiemduyet === 0) {
                counthoadon++
            }
        }
    }
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    const user = useSelector(state => state.infor.infor.data);
    const quanlytour = (
        <div>
             <Route exact path={match.path}>
                <Doanhthu />
            </Route>
            <Route exact path={`${match.path}/tour`}  >
                <Tour url={match.url} />
            </Route>
            <Route path={`${match.path}/tour/chitiettour/:id`}  >
                <Chitiettour />
            </Route>
            <Route path={`${match.path}/tour/themtour`}  >
                <Themtour />
            </Route>
            <Route path={`${match.path}/tour/suatour/:id`}  >
                <Themtour />
            </Route>
            <Route path={`${match.path}/loaitour/sualoaitour/:id`}  >
                <Themloaitour />
            </Route>
            <Route exact path={`${match.path}/loaitour`}  >
                <Loaitour url={match.url} />
            </Route>
            <Route path={`${match.path}/loaitour/themloaitour`}  >
                <Themloaitour />
            </Route>
            <Route path={`${match.path}/quocgia/suaquocgia/:id`}  >
                <Themquocgia />
            </Route>
            <Route exact path={`${match.path}/quocgia`}  >
                <Quocgia url={match.url} />
            </Route>
            <Route path={`${match.path}/quocgia/themquocgia`}  >
                <Themquocgia />
            </Route>
            <Route exact path={`${match.path}/diadiem`}  >
                <Diadiem url={match.url} />
            </Route>
            <Route path={`${match.path}/diadiem/themdiadiem`}  >
                <Themdiadiem />
            </Route>
            <Route path={`${match.path}/diadiem/suadiadiem/:id`}  >
                <Themdiadiem />
            </Route>
           
        </div>
    )
    const admin = (
        <div>
            <Route exact path={match.path}>
                <Doanhthu />
            </Route>
            <Route exact path={`${match.path}/diadiem`}  >
                <Diadiem url={match.url} />
            </Route>
            <Route path={`${match.url}/diadiem/themdiadiem`}  >
                <Themdiadiem />
            </Route>
            <Route path={`${match.path}/diadiem/suadiadiem/:id`}  >
                <Themdiadiem />
            </Route>
            <Route exact path={`${match.path}/ngaydi`}  >
                <Ngaydi />
            </Route>
            <Route exact path={`${match.path}/hoadon`}  >
                <Hoadon url={match.url} />
            </Route>
            <Route exact path={`${match.path}/anh`}  >
                <Anh url={match.url} />
            </Route>
            <Route exact path={`${match.path}/dichvu`}  >
                <Dichvu url={match.url} />
            </Route>
            <Route exact path={`${match.path}/binhluan`}  >
                <Binhluan url={match.url} />
            </Route>
            <Route path={`${match.path}/binhluan/chitietbinhluan/:id`}  >
                <Chitietbinhluan />
            </Route>
            <Route exact path={`${match.path}/tour`}  >
                <Tour url={match.url} />
            </Route>
            <Route exact path={`${match.path}/role`}  >
                <Role url={match.url} />
            </Route>
            <Route path={`${match.path}/role/themrole`}  >
                <Themrole />
            </Route>
            <Route path={`${match.path}/dichvu/themdichvu`}  >
                <Themdichvu />
            </Route>
            <Route path={`${match.path}/tour/chitiettour/:id`}  >
                <Chitiettour />
            </Route>
            <Route path={`${match.path}/quocgia/chitietquocgia/:id`}  >
                <Chitietquocgia />
            </Route>
            <Route path={`${match.path}/role/suarole/:id`}  >
                <Themrole />
            </Route>
            <Route path={`${match.path}/dichvu/suadichvu/:id`}  >
                <Themdichvu />
            </Route>
            <Route path={`${match.path}/loaitour/sualoaitour/:id`}  >
                <Themloaitour />
            </Route>
            <Route path={`${match.path}/quocgia/suaquocgia/:id`}  >
                <Themquocgia />
            </Route>
            <Route exact path={`${match.path}/quocgia`}  >
                <Quocgia url={match.url} />
            </Route>
            <Route exact path={`${match.path}/loaitour`}  >
                <Loaitour url={match.url} />
            </Route>
            <Route exact path={`${match.path}/taikhoan`}  >
                <Taikhoan url={match.url} />
            </Route>
            <Route path={`${match.path}/loaitour/themloaitour`}  >
                <Themloaitour />
            </Route>
            <Route path={`${match.path}/taikhoan/chitiettaikhoan/:id`}  >
                <Chitiettaikhoan />
            </Route>
            <Route path={`${match.path}/quocgia/themquocgia`}  >
                <Themquocgia />
            </Route>
            <Route path={`${match.path}/tour/themtour`}  >
                <Themtour />
            </Route>
            <Route path={`${match.path}/tour/suatour/:id`}  >
                <Themtour />
            </Route>
            <Route exact path={`${match.path}/tintuc`}  >
                <Tintuc url={match.url} />
            </Route>
            <Route path={`${match.path}/tintuc/themtintuc`}  >
                <Themtintuc />
            </Route>
            <Route path={`${match.path}/tintuc/suatintuc/:id`}  >
                <Themtintuc />
            </Route>
            <Route path={`${match.path}/tintuc/chitiettintuc/:id`}  >
                <Chitiettintuc />
            </Route>
            <Route exact path={`${match.path}/hoadoncanhan`}  >
                <Hoadoncanhan url={match.url} />
            </Route>
            <Route exact path={`${match.path}/kiemduyet`}>
                <Kiemduyet url={match.url} />
            </Route>
            <Route exact path={`${match.path}/phanhoi`}>
                <Phanhoi url={match.url} />
            </Route>
            <Route path ={`${match.path}/phanhoi/suaphanhoi/:id`}>
                <Suaphanhoi url={match.url} />
            </Route>
            <Route exact path ={`${match.path}/bieudo`}>
                <Bieudo url={match.url} />
            </Route>
            <Route exact path ={`${match.path}/chude`}>
                <Chude url={match.url} />
            </Route>
            <Route path={`${match.path}/chude/themchude`}  >
                <Themchude />
            </Route>
            <Route path={`${match.path}/chude/suachude/:id`}  >
                <Themchude />
            </Route>
            <Route exact path={`${match.path}/binhluanchude`}  >
                <Binhluanchude url={match.url} />
            </Route>
        </div>
    )
    const menu_quanlytour = (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={state.collapsed === true ? <span className="fas fa-tachometer-alt" ></span> : <span className="fas fa-tachometer-alt mr-2"></span>}>
                <Link to="/admin">Doanh thu</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={state.collapsed === true ? <span className="fas fa-luggage-cart" ></span> : <span className="fas fa-luggage-cart mr-2"></span>}>
                <Link to={`${match.url}/tour`}>Quản lý tour</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={state.collapsed === true ? <span className="fas fa-flag-usa" ></span> : <span className="fas fa-flag-usa mr-2"></span>}>
                <Link to={`${match.url}/quocgia`}>Quản lý quốc gia</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={state.collapsed === true ? <span className="fas fa-atlas" ></span> : <span className="fas fa-atlas mr-2"></span>}>
                <Link to={`${match.url}/loaitour`}>Quản lý loại tour</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={state.collapsed === true ? <span className="fas fa-place-of-worship" ></span> : <span className="fas fa-place-of-worship mr-2"></span>}>
                <Link to={`${match.url}/diadiem`}>Quản lý địa điểm</Link>
            </Menu.Item>
         
        </Menu>
    )
    const menu_quanlyadmin = (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={state.collapsed === true ? <span className="fas fa-tachometer-alt" ></span> : <span className="fas fa-tachometer-alt mr-2"></span>}>
                <Link to="/admin">Doanh thu</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={state.collapsed === true ? <span className="fas fa-luggage-cart" ></span> : <span className="fas fa-luggage-cart mr-2"></span>}>
                <Link to={`${match.url}/tour`}>Quản lý tour</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={state.collapsed === true ? <span className="fas fa-users" ></span> : <span className="fas fa-users mr-2"></span>}>
                <Link to={`${match.url}/taikhoan`}>Quản lý tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={state.collapsed === true ? <span className="far fa-newspaper" ></span> : <span className="far fa-newspaper mr-2"></span>}>
                <Link to={`${match.url}/tintuc`}>Quản lý tin tức</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={state.collapsed === true ? <span className="fas fa-flag-usa" ></span> : <span className="fas fa-flag-usa mr-2"></span>}>
                <Link to={`${match.url}/quocgia`}>Quản lý quốc gia</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={state.collapsed === true ? <span className="fas fa-atlas" ></span> : <span className="fas fa-atlas mr-2"></span>}>
                <Link to={`${match.url}/loaitour`}>Quản lý loại tour</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={state.collapsed === true ? <span className="fas fa-place-of-worship" ></span> : <span className="fas fa-place-of-worship mr-2"></span>}>
                <Link to={`${match.url}/diadiem`}>Quản lý địa điểm</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={state.collapsed === true ? <span className="fas fa-comments" ></span> : <span className="fas fa-comments mr-2"></span>}>
                <Link to={`${match.url}/binhluan`}>Quản lý bình luận</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={state.collapsed === true ? <span className="fas fa-images" ></span> : <span className="fas fa-images mr-2"></span>}>
                <Link to={`${match.url}/anh`}>Quản lý ảnh</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={state.collapsed === true ? <span className="fab fa-phoenix-framework" ></span> : <span className="fab fa-phoenix-framework mr-2"></span>}>
                <Link to={`${match.url}/dichvu`}>Quản lý dịch vụ</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={state.collapsed === true ? <span className="fas fa-file-alt" ></span> : <span className="fas fa-file-alt mr-2"></span>}>
                <Link to={`${match.url}/hoadon`}>Quản lý hoá đơn</Link>
            </Menu.Item>
            <Menu.Item key="12" icon={state.collapsed === true ? <span className="fas fa-user-tag" ></span> : <span className="fas fa-user-tag mr-2"></span>}>
                <Link to={`${match.url}/role`}>Quản lý phân quyền</Link>
            </Menu.Item>
            <Menu.Item key="13" icon={state.collapsed === true ? <span className="fas fa-clock" ></span> : <span className="fas fa-clock mr-2"></span>}>
                <Link to={`${match.url}/ngaydi`}>Quản lý Ngày đi</Link>
            </Menu.Item>
            <Menu.Item key="14" icon={state.collapsed === true ? <span className="fas fa-check-double"></span> : <span className="fas fa-check-double"></span>}>
                <Link to={`${match.url}/kiemduyet`}>Kiểm duyệt tour {counthoadon === 0 ? "" : <Badge status="error" />}</Link>
            </Menu.Item>
            <Menu.Item key="15" icon={state.collapsed === true ? <span className="fas fa-file-invoice-dollar"></span> : <span className="fas fa-file-invoice-dollar"></span>}>
                <Link to={`${match.url}/hoadoncanhan`}>Hoá đơn tạo tour</Link>
            </Menu.Item>
            <Menu.Item key="16" icon={state.collapsed === true ? <span className="fas fa-comments"></span> : <span className="fas fa-comments"></span>}>
                <Link to={`${match.url}/phanhoi`}>Quản lý phản hồi tour</Link>
            </Menu.Item>
            <Menu.Item key="17" icon={state.collapsed === true ? <span className="fas fa-chart-bar"></span> : <span className="fas fa-chart-bar"></span>}>
                <Link to={`${match.url}/bieudo`}>Biểu đồ</Link>
            </Menu.Item>
            <Menu.Item key="18" icon={state.collapsed === true ? <span className="fa fa-list-alt"></span> : <span className="fa fa-list-alt"></span>}>
                <Link to={`${match.url}/chude`}>Chủ đề</Link>
            </Menu.Item>
            <Menu.Item key="19" icon={state.collapsed === true ? <span className="fa fa-list-alt"></span> : <span className="fa fa-list-alt"></span>}>
                <Link to={`${match.url}/binhluanchude`}>Bình luận chủ đề</Link>
            </Menu.Item>
        </Menu>
    )
    const Menu_Authentication = (role) => {
        switch (role) {
            case "admin":
                return menu_quanlyadmin
                break;
            case "quản lý tour":
                return menu_quanlytour
                break;
            default:
                break;
        }
    }
    const Authentication = (role) => {
        switch (role) {
            case "admin":
                return admin
            case "quản lý tour":
                return quanlytour
            default:
                break;
        }
    }
    return (
        <div id="nav">
            <Layout>
                <Sider trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo" >
                        <Link to="/">
                            <p className="text-center w-100">
                                {state.collapsed === true ? <i className="fas fa-user-shield"></i> : <strong>Administration</strong>}
                            </p>
                        </Link>
                    </div>
                    {user ? Menu_Authentication(user.role) : ''}
                </Sider>

                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0,  }}>
                        <Headers />
                        {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            {user ? Authentication(user.role) : ""}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </div >
    )
}