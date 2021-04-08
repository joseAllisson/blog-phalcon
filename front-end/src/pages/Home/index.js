import { useState, useEffect } from "react";
import Header from "../../components/Header";

import "./style.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [sucess, setSucess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    async function getAll() {
      const data = await fetch("http://localhost:8080/api/posts/");
      const json = await data.json();

      setPosts(json);
    }

    getAll();
  }, [sucess]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function deletePost({ target }) {
    if (window.confirm("Deseja realmente deletar esse registro ?")) {
      const data = await fetch(`http://localhost:8080/api/posts/${target.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status) {
        setSucess(!sucess);
      }
    }
  }

  async function updatePost(event, id) {
    event.preventDefault();

    // const { name, title, description } = event.target.name;
    const { name, title, description } = formData;

    if (name.length <= 0 || title.length <= 0 || description.length <= 0) {
      setSucess(false);
      alert("É necessário preencher todos os campo!");
    } else {
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({ name, title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const teste = await fetch(
        `http://localhost:8080/api/posts/${id}`,
        requestOptions
      );

      setSucess(true);
      console.log(teste);
    }
  }

  return (
    <>
      <Header />

      <main className="main">
        <div className="container p-4">
          <h1>Lista de postagens</h1>
          {posts.map((post) => (
            <div key={post.id}>
              <div className="card my-4">
                <div className="card-header">{post.name}</div>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                </div>
                <div className="card-footer">
                  <i
                    className="fas fa-edit btn btn-primary"
                    id={post.id}
                    data-bs-toggle="modal"
                    data-bs-target={`#modal_${post.id}`}
                  ></i>
                  <i
                    className="far fa-trash-alt btn btn-danger"
                    onClick={deletePost}
                    id={post.id}
                  ></i>
                </div>
              </div>

              <div
                className="modal fade"
                id={`modal_${post.id}`}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Alteração da postagem {post.title}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="name">Nome</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              placeholder={post.name}
                              onChange={handleInputChange}
                              value={formData.name}
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="title">Título</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              id="title"
                              placeholder={post.title}
                              onChange={handleInputChange}
                              value={formData.title}
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="description">Postagem</label>
                            <textarea
                              className="form-control"
                              name="description"
                              id="description"
                              placeholder={post.title}
                              onChange={handleInputChange}
                              value={formData.description}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={(event) => updatePost(event, post.id)}
                        >
                          Cadastrar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
