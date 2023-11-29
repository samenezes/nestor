import Header from "../components/Header";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export default function Home() {
  const inputRef = useRef(null);
  const firstRender = useRef(true);

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const [editTask, setEditTask] = useState({
    enabled: false,
    tasks: "",
  });

  useEffect(() => {
    const tarefaSalvas = localStorage.getItem("@provaframe");

    if (tarefaSalvas) {
      setTasks(JSON.parse(tarefaSalvas));
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    localStorage.setItem("@provaframe", JSON.stringify(tasks));
  }, [tasks]);

  const handleRegister = useCallback(() => {
    if (!input) {
      alert("Preencha o nome da sua tarefa!");
      return;
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks((tarefas) => [...tarefas, input]);
    setInput("");
  }, [tasks, input]);

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex((task) => task === editTask.tasks);
    const AllTasks = [...tasks];

    AllTasks[findIndexTask] = input;
    setTasks(AllTasks);

    setEditTask({
      enabled: false,
      tasks: "",
    });
    setInput("");
  }

  function handleDelete(item) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
  }

  const tarefasSalvas = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <>
      <Header route="Home" />
      <main>
        <h1>Gerenciamento de Notas</h1>

        <input
          placeholder="Insira uma nota"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />

        <button className="btn" onClick={handleRegister}>
           Adicionar nota
        </button>

        <hr />

        <strong>Você tem {tarefasSalvas} notas de recado!</strong>

        {tasks.map((item) => {
          return (
            <section key={item}>
              <h1> {item} </h1>
              <button onClick={() => handleDelete(item)}>Excluir</button>
            </section>
          );
        })}
      </main>
    </>
  );
}
