import React,{useState, useEffect} from 'react';
import { ListItem } from "../ListItem/ListItem";
import './List.scss';

export const List = (props) => {
    const {listContextProperty, updateList} = props;
    const {list} = listContextProperty.context;
    const [doLoadMore, setDoLoadMore] = useState(false);

    useEffect(()=>{
        if(doLoadMore){
            updateList(listContextProperty);
        }
    }, [doLoadMore]);
    useEffect(()=>{setDoLoadMore(false)}, [list]);

    return (
        <div
            className={`list`}
            onScroll={getScrollListener(setDoLoadMore)}
        >
        {
            list.length > 0?
                list.map(listItem => <ListItem key={listItem.id} context={listItem}/>):
                <span className={`empty`}></span>
        }

        {
            doLoadMore?<span className={`loading`}></span>:''
        }

        <input
            type="button"
            value="Top"
            className={`btn-top`}
            onClick={scrollToTop}
        />

        </div>
    );
}

const getScrollListener = setLoader => event => {
    const {scrollTop, offsetHeight, scrollHeight} = event.target;
    setLoader(scrollTop+offsetHeight===scrollHeight);
}

const scrollToTop = (event) => {
    event.target.parentElement.scrollTo(0, 0)
    
}