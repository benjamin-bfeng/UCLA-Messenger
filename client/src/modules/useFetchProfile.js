import React, { useState, useEffect, useCallback } from 'react';
import defProfPic from "./assets/defProf.jpg";

export const useFetchProfile = (url) => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState();

    const getProfile = useCallback(async () => {
        const response = await fetch(url);
        const data = await response.json();
        setProfile(data);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        getProfile();
    }, [url, getProfile]);

    return { loading, profile };
};