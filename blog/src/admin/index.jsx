import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import store from './store';
import { HomeManagement, BasicSetting } from './container';
import { useSchemaData } from './hook/useSchemaData';
import { parseJsonByString } from '../common/utils';
import styles from './style.module.scss';
import 'normalize.css';
import 'antd/dist/antd.css';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
      setCollapsed(!collapsed);
  };
  return { collapsed, toggleCollapsed };
};

const Wrapper = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();
  const { changeSchema } = useSchemaData();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/schema/getLastestOne').then((response) => {
        const data = response?.data?.data;
        data && changeSchema(parseJsonByString(data.schema, {}));
    });
  }, []);

  const handleHomePageRedirect = () => {
      window.location.href = "/";
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['admin-home']}
          items={[
            {
              key: 'admin-home',
              icon: <span>&#xe7d4;</span>,
              label: '首页内容管理',
              className: 'iconfont',
              onClick: () => { navigate('/') }
            },
            {
              key: 'admin-setting',
              icon: <span>&#xe602;</span>,
              label: '基础内容配置',
              className: 'iconfont',
              onClick: () => { navigate('/setting') }
            },
            {
              key: 'admin-back',
              icon: <span>&#xe679;</span>,
              label: '返回用户页面',
              className: 'iconfont',
              onClick: handleHomePageRedirect
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {
              collapsed
              ? <span className='trigger iconfont pointer' onClick={toggleCollapsed}>&#xe62c;</span>
              : <span className='trigger iconfont pointer' onClick={toggleCollapsed}>&#xe629;</span>
          }
        </Header>
        <Content className={styles.content}>
          <Routes>
            <Route path='/' element={<HomeManagement />} />
            <Route path='/setting' element={<BasicSetting />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

root.render(
  <Router>
    <Provider store={store}>
      <Wrapper />
    </Provider>
  </Router>
);
