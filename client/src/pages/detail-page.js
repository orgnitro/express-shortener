import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import AuthContext from "../context/auth-context";
import Loader from "../components/loader";
import LinkCard from "../components/link-card";

export const DetailPage = () => {
  const [link, setLink] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();

  const getLink = useCallback(async () => {
    let fetchedLink;
    try {
      fetchedLink = await request(`/api/link/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
    } catch (e) {}
    setLink(fetchedLink);
  }, [token, id, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {!loading && link && <LinkCard link={link}/>}
    </>
  );
};

export default DetailPage;
