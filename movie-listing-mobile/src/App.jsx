import React, { useState, useEffect } from "react";
import { SearchBar, NavBar, List } from "./components";
import { fetchListProperty, searchByName } from "./services/apiServices";

import './App.scss';

export default () => {

  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [popularListContext, setPopularListContext] = useState(buildListContext());
  const [upcomingListContext, setUpcomingListContext] = useState(buildListContext());
  const [nowPlayingListContext, setNowPlayingListContext] = useState(buildListContext());
  const [searchListContext, setSearchListContext] = useState(buildListContext());

  const typeContextMap = {
    'popular': {
      context: popularListContext,
      setContext: setPopularListContext,
      fetchContext: fetchListProperty
    },
    'upcoming': {
      context: upcomingListContext,
      setContext: setUpcomingListContext,
      fetchContext: fetchListProperty
    },
    'now_playing': {
      context: nowPlayingListContext,
      setContext: setNowPlayingListContext,
      fetchContext: fetchListProperty
    },
    'search': {
      query: searchQuery,
      context: searchListContext,
      setContext: setSearchListContext,
      fetchContext: searchByName
    }
  }

  useEffect(() => {
    if (typeContextMap[activeTab].context.list.length === 0) {
      updateAndSetContext(activeTab, typeContextMap[activeTab]);
    }

    return () => {
      if (activeTab === 'search') {
        setSearchQuery('');
        setSearchListContext(buildListContext());
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (searchQuery !== '') {
      setActiveTab('search');
    }
  }, [searchQuery])

  return (
    <>
      <nav className='top-nav'>
        <SearchBar search={setSearchQuery} />
        <NavBar active={activeTab} setActive={setActiveTab} />
      </nav>
      <main className="list-container">
        <List
          listContextProperty={typeContextMap[activeTab]}
          updateList={updateAndSetContext.bind(this, activeTab)}
        />
      </main>
    </>
  );

}

const updateAndSetContext = (activeContextType, activeContext) => {

  const { query, context, setContext, fetchContext } = activeContext;

  if(context.isEnd) {
    return;
  }

  fetchContext(query || activeContextType)(context.lastPage + 1)
    .then(response => response.json())
    .then(data => {
      const { results, page, total_pages } = data;
      const updatedList = [...context.list, ...results]
      const updatedContext = buildListContext(updatedList, page, page === total_pages);

      setContext(updatedContext);
    })
}

const buildListContext = (list = [], lastPage = 0, isEnd = false) => ({
  list,
  lastPage,
  isEnd
});
