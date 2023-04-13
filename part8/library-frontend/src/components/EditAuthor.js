import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { EDIT_BORN, ALL_AUTHORS } from "../queries";

const EditAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBorn] = useMutation(EDIT_BORN, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((author) =>
            author.name === response.data.editAuthor.name
              ? response.data.editAuthor
              : author
          ),
        };
      });
    },
  });

  const authorsRes = useQuery(ALL_AUTHORS);

  const submit = async (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, setBornTo: Number(born) } });

    setBorn("");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>change year </h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <select onChange={handleChange}>
            {authorsRes.data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          phone{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change born</button>
      </form>
    </div>
  );
};

export default EditAuthor;
