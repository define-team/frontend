import { Routing } from '../pages'
import { withProviders } from "./providers";
import './index.scss';
import { Layout, Menu, Typography } from 'antd';
import { NavLink } from 'react-router-dom';

const itemsHeader = ['Администратор', 'Выйти'].map((_, index) => ({
  key: index + 1,
  label: _,
}))

const itemsMenu = [['Главная', '/'], ['Пользователи', '/users'], ['Ключи', '/keys'], ['NFC-метки', '/nfc'], ['Настройки', '/settings'], ['Журнал событий', '/events']].map((label, index) => ({
  key: index + 1,
  label: <NavLink to={label[1]}>{label[0]}</NavLink>,
  
}))

const App = () => {
  return (
    <Layout className="app">
      <Layout.Header>
        <Typography.Title level={1} style={{ color: 'white', margin: 0, alignContent: 'center' }}>Умная ключница - Админ панель</Typography.Title>
        <Menu
            mode="horizontal"
            items={itemsHeader}
            className='menu'
            style={{ minWidth: 0 }}
        />
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <Menu mode="vertical" theme='dark' items={itemsMenu} />
        </Layout.Sider>
        <Layout.Content style={{ padding: '15px 40px' }}>
          <Routing />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default withProviders(App)