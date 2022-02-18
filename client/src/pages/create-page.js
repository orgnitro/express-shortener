import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import AuthContext from "../context/auth-context";

export const CreatePage = () => {
  const [link, setLink] = useState("");
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const { request } = useHttp();

  async function handlePress(event) {
    if (event.key === "Enter") {
      let data;
      try {
        data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Enter the link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={handlePress}
          />
          <label htmlFor="link">Enter the link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
