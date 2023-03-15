const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Input
        text="name"
        value={props.value[0]}
        onChange={props.handleChange[0]}
      />
      <Input
        text="phone"
        value={props.value[1]}
        onChange={props.handleChange[1]}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Input = (props) => {
  return (
    <div>
      {props.text} <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default Form;
