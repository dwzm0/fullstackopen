import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";

describe("unicafe reducer", () => {
  const initialState = [
    { content: "If it hurts, do it more often", id: 10, votes: 0 },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: 11,
      votes: 0,
    },
  ];

  test("should return +1", () => {
    const state = initialState;
    const action = {
      type: "VOTE",
      payload: {
        id: 10,
      },
    };

    deepFreeze(state);

    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(2);

    expect(newState).toContainEqual(state[1]);

    expect(newState).toContainEqual({
      content: "If it hurts, do it more often",
      id: 10,
      votes: 1,
    });
  });
});
