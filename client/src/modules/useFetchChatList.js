import React, { useState, useEffect, useCallback } from 'react';

export const useFetchChatList = (url) => {
    const [loading, setLoading] = useState(true);
    const [chatList, setChatList] = useState([]);

    const getChatList = useCallback(async () => {
        const response = await fetch(url);
        const data = await response.json();
        setChatList(data);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        getChatList();
    }, [url, getChatList]);

    return { loading, chatList };
};