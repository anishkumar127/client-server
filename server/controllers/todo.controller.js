import { Todo } from "../models/todo.model.js";
import { getUser } from "../services/auth.js";

// Create Todo
export const createTodo = async (req, res) => {
  const { todo } = req.body;

  // check session
  const auth = req?.headers["authorization"];
  const token = auth?.split("Bearer ")[1];
  console.log(token);
  // if (!req.session.user || !token) {
  //   return res.status(401).json({ error: "not authorized." });
  // }

  // console.log(token);

  //  req.session.user._id
  const user = getUser(token);
  req.user = user;
  try {
    const newTodo = await Todo.create({
      userId: req.user._id,
      todo,
    });

    return res.status(201).json({ data: newTodo });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!req.session.user) {
    return res.status(401).json({ error: "not authorized." });
  }

  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.session.user._id,
    });
    if (deletedTodo) {
      return res.status(201).json({ data: `deleted ${deletedTodo}` });
    } else {
      return res.status(500).json({ error: "not able to delete." });
    }
    //   return res.status(200).json({data:deletedTodo});
  } catch (error) {
    return res.status(500).json({ error });
  }
};
// Update Todo

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  console.log(id, todo);
  if (!req.session.user) {
    return res.status(401).json({ error: "not authorized." });
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: id,
        userId: req.session.user._id,
      },
      { todo },
      { new: true }
    );
    if (updatedTodo) {
      return res.status(201).json({ data: `updated ${updatedTodo}` });
    } else {
      return res.status(500).json({ error: "not able to update." });
    }
  } catch (error) {}
};

// Read Todo

export const GetAllTodo = async (req, res) => {
  // if (!req.session.user) {
  //   return res.status(401).json({ error: "not authorized." });
  // }
  const auth = req.headers["authorization"];
  const token = auth.split("Bearer ")[1];
  // console.log(token);

  const user = getUser(token);
  req.user = user;

  try {
    const AllTodos = await Todo.find({ userId: req.user._id });
    return res.status(200).json({ data: AllTodos });
  } catch (error) {
    return res.status(500).json({ error: `server error. ${error}` });
  }
};
