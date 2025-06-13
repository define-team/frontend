import './index.scss';
import { Layout, Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar } from '@/widgets/Navbar';
import { memo, Suspense, useEffect } from "react";
import { AppRouter } from "./providers/router";
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from "react-redux";
import { getUserAuthData, initAuthData } from '@/entities/User';
import Forbidden from "@/pages/Forbidden";

const itemsMenu = [
  /* ['Главная', '/'], */
  ['Пользователи', '/users'],
  ['Ключи', '/keys'],
  ['Устройства', '/devices'],
  ['Слоты ключей', '/keyslots'],
  ['Роли', '/roles'],
  ['Журнал событий', '/events']
].map(([label, path]) => ({
  key: path,
  label: <NavLink to={path}>{label}</NavLink>,
}));

const App = memo(() => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserAuthData);

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  return (
    <Layout className="app">
      <Suspense fallback="">
        <Navbar />
          <div className="content-page">
            {/* <Sidebar /> */}
          </div>
      </Suspense>
      <Suspense fallback="">
        <Layout>
          <Layout.Sider>
            <Menu 
              mode="vertical" 
              theme='dark' 
              items={itemsMenu} 
              selectedKeys={[location.pathname]}
            />
          </Layout.Sider>
          <Layout.Content style={{ padding: '15px 40px' }}>
            {inited ? <AppRouter /> : <Forbidden />}
          </Layout.Content>
        </Layout>
      </Suspense>
    </Layout>
  );
})

export default App