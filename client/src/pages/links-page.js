import React, { useCallback, useContext, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../context/auth-context";
import Loader from "../components/loader";
import LinksList from "../components/links-list";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const links = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("links",links)
      setLinks(links);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <LinksList links={links} />
      </div>
    );
  }
};

export default LinksPage;
