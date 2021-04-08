import { useState } from "react";
import Header from "../../components/Header";

import "./style.css";

function Posts() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sucess, setSucess] = useState(false);

  async function cadPost(event) {
    event.preventDefault();

    if (name.length <= 0 || title.length <= 0 || description.length <= 0) {
      setSucess(false);
      alert("É necessário preencher todos os campo!");
    } else {
      const requestOptions = {
        // mode: "no-cors",
        method: "POST",
        body: JSON.stringify({ name, title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      await fetch("http://localhost:8080/api/posts/", requestOptions);

      setSucess(true);
    }
  }

  return (
    <>
      <Header />

      <main className="main">
        <div className="container p-4">
          <h1>Cadastro de postagens</h1>
          <div className="border border-radius p-5 my-4 bg-white">
            <form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    name="name"
                    id="name"
                    placeholder="Nome"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="title">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    name="title"
                    id="title"
                    placeholder="Título da postagem"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="description">Postagem</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                    name="description"
                    id="description"
                    placeholder="Postagem..."
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={cadPost}
              >
                Cadastrar
              </button>
            </form>

            {sucess && (
              <div className="alert alert-success mt-4" role="alert">
                Postagem realizada com sucesso!
              </div>
            )}
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New message
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Recipient:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">
                      Message:
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      defaultValue={""}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Posts;
