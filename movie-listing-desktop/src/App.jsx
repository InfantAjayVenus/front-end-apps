import React, { useState, useEffect } from "react";
import {
  Icon,
  Input,
  Table,
  Layout,
  Menu
} from 'antd';

import { fetchListProperty, searchByName } from "./services/apiServices";
import "./App.scss";

const { Header, Content, Sider } = Layout;

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'original_title'
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    key: 'overview',
    ellipsis: true
  },
  {
    title: 'Release Date',
    dataIndex: 'release',
    key: 'release_date'
  },
  {
    title: 'Language',
    dataIndex: 'lang',
    key: 'original_language'
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'vote_average'
  }
];

export default () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [activeListName, setActiveListName] = useState('now_playing');
  const [searchQuery, setSearchQuery] = useState('');
  const [contextData, setContextData] = useState({
    page: 1,
    dataList: [],
    totalDataItems: 0
  });

  const fetchPropertyCallback = (activeListName === 'search' ? searchByName(searchQuery) : fetchListProperty(activeListName));

  useEffect(populateData(fetchPropertyCallback, setContextData).bind(this,1), [activeListName, searchQuery]);
  useEffect(() => searchQuery.length > 0 ? setActiveListName('search') : undefined, [searchQuery]);

  return (
    <>
      <Layout id="container">
        <Sider
          id='side-bar'
          trigger={null}
          collapsible={true}
          collapsed={isMenuCollapsed}
          collapsedWidth={0}
        >
          <Menu
            id='menu-bar'
            mode="vertical"
            selectedKeys={[activeListName]}
            onClick={(event) => setActiveListName(event.key)}
          >
            <Menu.Item key="now_playing">Now Playing</Menu.Item>
            <Menu.Item key="popular">Popular</Menu.Item>
            <Menu.Item key="upcoming">Upcoming</Menu.Item>
          </Menu>
        </Sider>
        <Layout id='page-body'>
          <Header id='top-bar'>
            <Icon
              id='menu-btn'
              type={isMenuCollapsed ? "menu-unfold" : "menu-fold"}
              onClick={setIsMenuCollapsed.bind(this, !isMenuCollapsed)}
            />
            <Input.Search
              placeholder="Search for Movies"
              onSearch={setSearchQuery}
              style={{
                margin: '0 2rem',
                width: '50%'
              }}
            />
          </Header>
          <Content id='main-content'>
            <Table
              id='content-table'
              size='small'
              columns={columns}
              dataSource={contextData.dataList}
              pagination={{
                position: 'both',
                current: contextData.page,
                pageSize: 20,
                total: contextData.totalDataItems,
                onChange: populateData(fetchPropertyCallback, setContextData)
              }}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );

}

const populateData = (fetchPropertyCallback, setDataCallBack) =>
  pageNumber => {
    fetchPropertyCallback(pageNumber)
      .then(response => response.json())
      .then(data => {
        const { page, total_results, results } = data;
        const dataList = results.map(dataItem => buildDataSourceItem(dataItem));
        setDataCallBack({
          page,
          dataList,
          totalDataItems: total_results
        });
      }).catch(error => console.error(error));
  }

const buildDataSourceItem = (dataItem) => {
  const dataSourceItem = columns.reduce(
    (sourceObject, columnItem) => {
      sourceObject[columnItem.dataIndex] = dataItem[columnItem.key];
      return sourceObject;
    }, {});
  dataSourceItem['key'] = dataItem.id;
  return dataSourceItem;
}